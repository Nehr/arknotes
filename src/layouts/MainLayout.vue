<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>

        <div>ARK notes v{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
        Links
        </q-item-label>

          <q-item
            clickable
            tag="a"
            to="/"
          >
            <q-item-section avatar>
              <q-icon name="house" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Home</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            tag="a"
            v-for="map in maps"
            :key="map"
            :to="`/notes/${map}`"
          >
            <q-item-section avatar>
              <q-icon name="school" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ map }}</q-item-label>
              <q-item-label caption>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            tag="a"
            to="/todo"
          >
            <q-item-section avatar>
              <q-icon name="school" />
            </q-item-section>

            <q-item-section>
              <q-item-label>To do</q-item-label>
              <q-item-label caption>
                Stuff left to do
              </q-item-label>
            </q-item-section>
          </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import pkgjson from '../../package.json'
import { useRoute } from "vue-router";

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    const $store = useStore();
    const route = useRoute();
    const leftDrawerOpen = ref(false)

    const savedNotes = localStorage.getItem('wsARKnotes');
    console.log('savedNotes', JSON.parse(savedNotes));
    if (savedNotes) {
      $store.commit('example/setHiddenNotes', JSON.parse(savedNotes));
    }

    const mapList = computed({
      get: () => $store.state.example.maps,
      set: val => {
        $store.commit('example/setMapList', val)
      }
    });

    const current = computed(() => route);
    const title = ref(`${Object.keys(current.value.params).length !== 0 ? `${current.value.name}: ${current.value.params.map}` : current.value.name}`);

    watch(current.value, () => {
      console.log('new route', current.value);
      title.value = `${Object.keys(current.value.params).length !== 0 ? `${current.value.name}: ${current.value.params.map}` : current.value.name}`;
    });

    return {
      version: pkgjson.version,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      title,
      maps: mapList.value,
    }
  }
})
</script>
