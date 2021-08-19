<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <div class="q-mt-md q-mb-sm q-mx-md ws-info-bar">
        {{ totalTrue }} of {{ total }} : {{ progress }}%
        <q-linear-progress stripe size="20px" :value="progress / 100" :color="progressColor">
          <div class="absolute-full flex flex-center">
            <q-badge color="transparent" text-color="black" :label="`${progress}%`" />
          </div>
        </q-linear-progress>
      </div>
      <div v-for="(dino, name) in dinoTamingState" :key="name">
        <p class="q-ma-none q-mb-xs">
          <q-btn :color="!dino ? 'red' : 'primary'" @click="toggleDinoTaming(name)">
            {{ dinoKey(name) }}
          </q-btn>
        </p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useStore } from "vuex";

export default defineComponent({
  name: 'dinoTaming',

  setup () {
    const $store = useStore();

    const dinoTamingState = computed(() => {
      return $store.state.example.dinoTaming;
    });

    // const dinoKeys = computed(() => Object.keys(dinoTamingState.value));

    const dinoKey = name => {
      return name.replace('_', ' ');
    };

    const toggleDinoTaming = dino => {
      console.log('toggling dino', dino);
      $store.commit("example/toggleDinoTaming", dino);
    }

    const total = ref(Object.keys(dinoTamingState.value).length);

    const totalTrue = computed(() => {
      return Object.values(dinoTamingState.value).reduce((a, item) => a + item, 0);
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

    const progress = computed(() => {
      return (totalTrue.value / total.value  * 100).toFixed(1);
    });

    const progressColor = computed(() => {
      const val = parseInt(parseFloat(progress.value));
      const color = getColorFromPercent(val);
      return color;
    });

    return {
      dinoTamingState,
      dinoKey,
      toggleDinoTaming,
      total,
      totalTrue,
      progress,
      progressColor,
    }
  }
})
</script>

<style lang="scss" scoped>
p {
  text-transform: capitalize;
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

</style>
