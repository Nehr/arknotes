<template>
  <q-page :class="`ws-page--notes flex justify-center${ editMode ? ' is-editing' : ''}`">
    <div>
      <div class="q-mt-md q-mb-sm q-mx-md ws-info-bar">
        <div v-if="lastHiddenNote" class="bg-white">
          Last pos:<br>
          {{ lastHiddenNoteLatLon.lat }}, {{ lastHiddenNoteLatLon.lon }}
        </div>
        <q-linear-progress stripe size="20px" :value="progress()" :color="progressColor()">
          <div class="absolute-full flex flex-center">
            <q-badge color="transparent" text-color="black" :label="`${progress() * 100}%`" />
          </div>
        </q-linear-progress>
        <q-btn
          rounded
          dense
          class="q-pa-sm q-mt-sm"
          size="lg"
          :color="editMode ? 'warning' : 'primary'"
          :text-color="editMode ? 'black' : 'white'"
          icon="settings"
          @click="editModeToggle()"
        ></q-btn>
      </div>
      <div class="q-px-md q-pt-md">
        <q-list
          v-for="section in sectionsObject"
          :key="section.id"
          class="ws-noteslist"
        >
          <q-item :class="`ws-inner-item--title${isSectionHidden(section) && !editMode ? ' isHidden' : ''}`">
            <q-item-section>
              <p class="text-h5 q-ma-none">
                {{ section.name }}
              </p>
            </q-item-section>
          </q-item>
          <q-item :class="`ws-inner-item--content${isSectionHidden(section) && !editMode ? ' isHidden' : ''}`">
            <q-item-section>
              <q-list>
                <q-item class="ws-inner-item">
                  <q-item-section class="q-pa-xs">
                    <p class="text-h6 q-ma-none">
                      Name / Note
                    </p>
                  </q-item-section>
                  <q-item-section side>
                    <p class="text-h6 q-ma-none">
                      Dir
                    </p>
                  </q-item-section>
                  <q-item-section side>
                    <p class="text-h6 q-ma-none">
                      Lat
                    </p>
                  </q-item-section>
                  <q-item-section side>
                    <p class="text-h6 q-ma-none">
                      Lon
                    </p>
                  </q-item-section>
                </q-item>
                <q-item
                  v-for="item in section.array"
                  :key="item.id"
                  @click="selectNote(section.id, item.id)"
                  clickable v-ripple
                  :class="`ws-inner-item ws-inner-item--focusable ${!editMode ? !item.isHidden ? '' : 'isHidden' : !item.isHidden ? '' : 'isHidden-EditMode'}`"
                >
                  <q-item-section class="q-pa-xs">
                    {{ item.name }}, {{ item.note }}
                  </q-item-section>
                  <q-item-section side>
                    <p class="text-bold q-ma-none" v-show="lastHiddenNote">
                      {{ getDirectionFromLast(item.lat, item.lon) }}
                    </p>
                  </q-item-section>
                  <q-item-section side>
                    {{ item.lat }}
                  </q-item-section>
                  <q-item-section side>
                    {{ item.lon }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { data as aberration } from "../assets/ark_tables_textfile-Aberration.js";
import { data as extinction } from "../assets/ark_tables_textfile-Extinction.js";
import { data as scorchedearth } from "../assets/ark_tables_textfile-ScorchedEarth.js";
import { data as theisland } from "../assets/ark_tables_textfile-TheIsland.js";

export default defineComponent({
  name: "Notes",

  setup() {
    const route = useRoute();
    const $store = useStore();

    const hiddenNotes = computed(() => {
      return $store.state.example.hiddenNotes;
    });

    const toggleNote = val => {
      $store.commit("example/toggleHiddenNote", val);
    };

    // console.log('hidden notes', hiddenNotes.value);

    const current = ref(route.params.map);
    // console.log("current", current.value);

    const mapData = {
      aberration,
      extinction,
      scorchedearth,
      theisland,
    };

    const list = mapData[current.value.toLowerCase()];

    const sectionsObject = ref({});

    list.forEach((item) => {
      const sectionName = item.location
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
      if (sectionName in sectionsObject.value) {
        sectionsObject.value[sectionName].array.push(item);
      } else {
        sectionsObject.value[sectionName] = {
          id: sectionName,
          name: item.location,
          array: [item],
        };
      }
    });

    function calculateDistance(lat1, lon1, lat2, lon2) {
      const radlat1 = Math.PI * lat1/180;
      const radlat2 = Math.PI * lat2/180;
      const theta = lon1-lon2;
      const radtheta = Math.PI * theta/180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;

      return dist;
    }

    for (const sect in sectionsObject.value) {
      if (sectionsObject.value[sect].array.length > 1) {
        sectionsObject.value[sect].array.forEach(item => {
          const zeroVal = {
            lon: 0,
            lat: 0,
          };
          item.dist = calculateDistance(zeroVal.lat, zeroVal.lon, item.lat, item.lon);
          const isHidden = hiddenNotes.value.find(x => x === item.id);
          if (isHidden) {
            item.isHidden = true;
          }
        });

        sectionsObject.value[sect].array.sort(function(a, b) { 
          return a.dist - b.dist;
        });
      }
    }

    const selectNote = (sect, item) => {
      console.log('click', sect, item);
      const itemData = sectionsObject.value[sect].array.find(x => x.id === item);
      console.log(itemData);
      toggleNote(item);
      lastHiddenNote.value = item;
      if (!itemData.isHidden) {
        itemData.isHidden = true;
      } else {
        itemData.isHidden = false;
      }
    }

    const editMode = ref(false);
    const editModeToggle = () => {
      editMode.value = !editMode.value;
    }

    const mapSwitch = id => {
      const mapsIndex = {
        theisland: 1000,
        scorchedearth: 2000,
        aberration: 3000,
        extinction: 4000,
      };
      if (id >= mapsIndex.theisland && id < mapsIndex.scorchedearth)
        return 'theisland';
      if (id >= mapsIndex.scorchedearth && id < mapsIndex.aberration)
        return 'scorchedearth';
      if (id >= mapsIndex.aberration && id < mapsIndex.extinction)
        return 'aberration';
      if (id >= mapsIndex.extinction)
        return 'extinction';
      return false;
    }

    const progress = ref(() => {
      let amountTotal = 0;
      for (const sect in sectionsObject.value) {
        amountTotal += sectionsObject.value[sect].array.length;
      }

      const allItems = hiddenNotes.value;
      let localHiddenItems = 0;
      allItems.forEach(item => {
        const hiddenItemMap = mapSwitch(item);
        if (hiddenItemMap == current.value.toLowerCase()) {
          localHiddenItems++
        }
      });

      const percentage = (localHiddenItems / amountTotal).toFixed(2);

      return parseFloat(percentage);
    });

    const getColorFromPercent = int => {
      if (int < 10)
        return 'red';
      if (int < 20)
        return 'pink';
      if (int < 30)
        return 'deep-purple';
      if (int < 40)
        return 'indigo';
      if (int < 50)
        return 'blue';
      if (int < 60)
        return 'light-blue';
      if (int < 70)
        return 'cyan';
      if (int < 80)
        return 'teal';
      if (int < 90)
        return 'green';

      return 'light-green';
    };

    const progressColor = ref(() => {
      const val = parseInt(parseFloat(progress.value()) * 100);
      const color = getColorFromPercent(val);
      return color;
    });

    const isSectionHidden = section => {
      const total = section.array.length;
      console.log(`section: ${section.id}, length: ${total}`);
      let amount = 0;
      section.array.forEach(item => {
        // console.log(item.isHidden);
        if (item.isHidden) {
          amount++;
        }
      });
      return amount === total ? true : false;
    }

    const getLastHiddenLonLat = last => {
      if (last) {
        for (const section in sectionsObject.value) {
          console.log(`Searching for ${lastHiddenNote.value} in ${section}`);
          const index = sectionsObject.value[section].array.findIndex(x => x.id === last);
          console.log('index: ', index);
          if (index > -1) {
            const hit = sectionsObject.value[section].array[index];
            return {
              lon: hit.lon,
              lat: hit.lat,
            };
          }
        }
      }
      console.log('could not find last in getLastHiddenLonLat', last);
      return false;
    }

    const lastHiddenNote = ref(false);
    const lastHiddenNoteLatLon = computed(() => getLastHiddenLonLat(lastHiddenNote.value));

    const getDirectionFromLast = ref((lat, lon) => {
      let NS = '?';
      let EW = '?';

      if (lastHiddenNoteLatLon.value.lat < lat) {
        NS = 'S';
      } else if (lastHiddenNoteLatLon.value.lat > lat) {
        NS = 'N';
      } else {
        NS = '?';
      }

      if (lastHiddenNoteLatLon.value.lon < lon) {
        EW = 'E';
      } else if (lastHiddenNoteLatLon.value.lon > lon) {
        EW = 'W';
      } else {
        EW = '?';
      }

      return `${NS}/${EW}`;
    });

    return {
      list,
      current: current.value,
      sectionsObject,
      selectNote,
      editMode,
      editModeToggle,
      progress,
      isSectionHidden,
      progressColor,
      lastHiddenNote,
      getDirectionFromLast,
      lastHiddenNoteLatLon,
    };
  },
});
</script>

<style lang="scss" scoped>
  .ws-page--notes {
    > div {
      width: 100%;
      max-width: 600px;
    }
  }
  .is-editing {
    background-color: rgba($orange, 0.05);
  }

  .ws-noteslist {
    max-width: 800px;
  }

  .ws-info-bar {
    position: fixed;
    display: block;
    bottom: 1rem;
    right: 1rem;
    z-index: 1001;

    &--percentage {
      display: block;
      text-align: center;
      font-size: 0.8rem;
      font-weight: 700;
      background-color: #fff;
    }

    .q-linear-progress {
      background-color: #fff;
    }

    .map {
      width: 100px;
      height: 100px;
      margin-bottom: 1rem;
      border: 1px solid #333;
    }
  }

  .ws-inner-item {
    padding: 0 0.5rem;

    &--title {
      background-color: #333;

      p {
        font-size: 1.75rem;
        color: #fff;
        text-transform: uppercase;
        font-weight: 700;
      }
    }

    &--content {
      border: 1px solid #333;
      margin-bottom: 1rem;
    }

    &:not(.ws-inner-item--focusable) {
      p, div {
        font-size: 1.25rem;
      }

      div.q-item__section {
        flex: 1 1 0;

        &:first-of-type {
          flex: 6 1 0;
        }
      }
    }

    &.ws-inner-item--focusable {

      &:nth-child(2n + 2) {
        // background-color: rgba(100, 100, 100, 0.2);
      }

      p, div {
        font-size: 1.25rem;
      }

      div.q-item__section {
        flex: 1 1 0;

        &:first-of-type {
          flex: 0 0 0;
        }

        &:nth-child(2) {
          flex: 6 1 0;
        }
      }
    }
  }

  .ws-item-first {
    width: 80%;
  }

  .isHidden {
    display: none !important;
  }

  .isHidden-EditMode {
    background-color: rgba(0,0,0,0.05);
    opacity: 0.8;
  }
</style>
