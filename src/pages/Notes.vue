<template>
  <q-page :class="`ws-page--notes flex justify-center${ editMode ? ' is-editing' : ''}`">
    <div>
      <div class="q-mt-md q-mb-sm q-mx-md ws-info-bar">
        <div v-if="lastHiddenNote" class="bg-white">
          Last pos:
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
          <q-item :class="isSectionHidden(section.id) ? 'isHidden' : ''">
            <q-item-section>
              <p class="text-h5 q-pl-sm">
                {{ section.name }}
              </p>
            </q-item-section>
          </q-item>
          <q-item :class="isSectionHidden(section.id) ? 'isHidden' : ''">
            <q-item-section>
              <q-list>
                <q-item class="ws-inner-item">
                  <q-item-section>
                    <p class="text-h6">
                      Name / Note
                    </p>
                  </q-item-section>
                  <q-item-section side>
                    <p class="text-h6">
                      Dir
                    </p>
                  </q-item-section>
                  <q-item-section side>
                    <p class="text-h6">
                      Lat
                    </p>
                  </q-item-section>
                  <q-item-section side>
                    <p class="text-h6">
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
                  <q-item-section>
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
    // console.log("list", list);

    const sectionsObject = ref({});

    list.forEach((item) => {
      const sectionName = item.location
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
      // console.log(`${item.location} : ${sectionName}`);
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

    // console.log("sections: ", sectionsObject);

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
            // console.log('item is hidden', item);
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
      console.log(`${val} => ${color}`);
      return color;
    });

    const isSectionHidden = () => {
      // console.log('isSectionHidden called');
      return false;
    }

    const getLastHiddenLonLat = last => {
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
      return false;
    }

    const lastHiddenNote = computed(() => $store.state.example.lastProgress);
    const lastHiddenNoteLatLon = ref(getLastHiddenLonLat(lastHiddenNote.value));

    const getDirectionFromLast = ref((lat, lon) => {
      let NS = '?';
      let EW = '?';

      if (lastHiddenNoteLatLon.value.lat < lat) {
        NS = 'S';
      } else {
        NS = 'N';
      }

      if (lastHiddenNoteLatLon.value.lon < lon) {
        EW = 'E';
      } else {
        EW = 'W';
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
  }

  .ws-inner-item {
    padding: 0 0.5rem;

    &:not(.ws-inner-item--focusable) {
      div.q-item__section {
        flex: 1 1 0;

        &:first-of-type {
          flex: 6 1 0;
        }
      }
    }

    &.ws-inner-item--focusable {
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
