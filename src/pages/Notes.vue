<template>
  <q-page :class="`flex justify-center${ editMode ? ' is-editing' : ''}`">
    <div>
      <q-btn
        rounded
        dense
        class="q-pa-sm ws-toggle-button"
        size="lg"
        :color="editMode ? 'warning' : 'primary'"
        :text-color="editMode ? 'black' : 'white'"
        icon="settings"
        @click="editModeToggle()"
      ></q-btn>
      <div class="q-px-md q-pt-md">
        <q-list
          v-for="section in sectionsObject"
          :key="section"
          class="ws-noteslist"
        >
          <q-item>
            <q-item-section>
              <p class="text-h4">
                {{ section.name }}
              </p>
            </q-item-section>
          </q-item>
          <q-item>
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
                      Lon
                    </p>
                  </q-item-section>
                  <q-item-section side>
                    <p class="text-h6">
                      Lat
                    </p>
                  </q-item-section>
                </q-item>
                <q-item
                  v-for="item in section.array"
                  :key="item.id"
                  @click="selectNote(section.id, item.id)"
                  clickable v-ripple
                  :class="`ws-inner-item ${!editMode ? !item.isHidden ? '' : 'isHidden' : !item.isHidden ? '' : 'isHidden-EditMode'}`"
                >
                  <q-item-section>
                    {{ item.name }}, {{ item.note }}
                  </q-item-section>
                  <q-item-section side>
                    {{ item.lon }}
                  </q-item-section>
                  <q-item-section side>
                    {{ item.lat }}
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

    console.log('hidden notes', hiddenNotes.value);

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
            console.log('item is hidden', item);
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
      console.log('hidden notes', hiddenNotes.value);
    }

    const editMode = ref(false);
    const editModeToggle = () => {
      editMode.value = !editMode.value;
    }

    return {
      list,
      current: current.value,
      sectionsObject,
      selectNote,
      editMode,
      editModeToggle,
    };
  },
});
</script>

<style lang="scss" scoped>
  .is-editing {
    background-color: rgba($orange, 0.05);
  }

  .ws-noteslist {
    max-width: 800px;
  }

  .ws-toggle-button {
    position: fixed;
    top: 8vh;
    right: 1rem;
    z-index: 1001;
  }

  .ws-inner-item {
    padding: 0 0.5rem;
  }

  .isHidden {
    display: none !important;
  }

  .isHidden-EditMode {
    background-color: rgba(0,0,0,0.05);
    opacity: 0.8;
  }
</style>
