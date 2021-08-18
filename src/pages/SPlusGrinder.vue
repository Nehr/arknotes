<template>
  <q-page class="flex flex-center">
    <div>
      <p class="text-h1">S+ Grinder</p>
      <p>
        <q-select v-model="gemType" :options="gemTypes" label="Gem type" />
        <q-input v-model="amount" label="Amount of gems" />
      </p>
      <p v-show="gemType">
        To make {{ amount }} {{ gemType }} gem{{ amount > 1 ? 's' : '' }}, you need:
      </p>
      <div v-if="gemType">
        <q-list separator dense bordered padding class="rounded-borders">
          <q-item>
            <q-item-section>
              <p class="text-bold">
                Name
              </p>
            </q-item-section>

            <q-item-section side top>
              <p>
                Per item
              </p>
            </q-item-section>

            <q-item-section side top>
              Total
            </q-item-section>
          </q-item>

          <q-item
            v-for="item in gemReq.all"
            :key="item.name"
            clickable
            v-ripple
          >
            <q-item-section>
              {{ item.name }}
            </q-item-section>

            <q-item-section side top>
              <p v-if="amount > 1">
                {{ item.amount }}
              </p>
            </q-item-section>

            <q-item-section side top>
              {{ item.amount * amount }}
            </q-item-section>
          </q-item>

          <q-item
            v-for="item in gemReq[gemType]"
            :key="item.name"
            clickable
            v-ripple
          >
            <q-item-section>
              <p class="text-bold q-ma-none">{{ item.name }}</p>
              <div v-if="typeReq.color[item.name]">
                <div v-for="reqItem in typeReq.color[item.name]" :key="reqItem.name">
                  {{ reqItem.name }}{{ reqItem.type == 'berry' ? 'berry' : '' }} ({{ reqItem.amount * 5 * amount }})
                </div>
              </div>
            </q-item-section>

            <q-item-section side top>
              <p v-if="amount > 1">
                {{ item.amount }}
              </p>
            </q-item-section>

            <q-item-section side top>
              {{ item.amount * amount }}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SPlusGrinder',

  setup () {
    const gemTypes = [
      'red',
      'green',
      'blue'
    ];

    const typeReq = {
      color: {
        all: [
          {
            name: 'water',
            type: 'other',
            amount: 1,
          }
        ],
        brown: [
          {
            name: 'charcoal',
            type: 'other',
            amount: 2,
          },
          {
            name: 'Tinto',
            type: 'berry',
            amount: 9,
          },
          {
            name: 'Amar',
            type: 'berry',
            amount: 6,
          },
          {
            name: 'Azul',
            type: 'berry',
            amount: 3,
          },
        ],
        cantaloupe: [
          {
            name: 'sparkpowder',
            type: 'other',
            amount: 1,
          },
          {
            name: 'Tinto',
            type: 'berry',
            amount: 7,
          },
          {
            name: 'Amar',
            type: 'berry',
            amount: 7,
          },
          {
            name: 'Stim',
            type: 'berry',
            amount: 4,
          },
        ],
        mud: [
          {
            name: 'sparkpowder',
            type: 'other',
            amount: 1,
          },
          {
            name: 'Tinto',
            type: 'berry',
            amount: 7,
          },
          {
            name: 'Amar',
            type: 'berry',
            amount: 4,
          },
          {
            name: 'Azul',
            type: 'berry',
            amount: 1,
          },
          {
            name: 'Narco',
            type: 'berry',
            amount: 6,
          },
        ],
        red: [
          {
            name: 'charcoal',
            type: 'other',
            amount: 2,
          },
          {
            name: 'Tinto',
            type: 'berry',
            amount: 15,
          },
        ],
        tan: [
          {
            name: 'gunpowder',
            type: 'other',
            amount: 1,
          },
          {
            name: 'Tinto',
            type: 'berry',
            amount: 7,
          },
          {
            name: 'Amar',
            type: 'berry',
            amount: 7,
          },
          {
            name: 'Azul',
            type: 'berry',
            amount: 1,
          },
          {
            name: 'Stim',
            type: 'berry',
            amount: 6,
          },
        ],
        royalty: [
          {
            name: 'gunpowder',
            type: 'other',
            amount: 1,
          },
          {
            name: 'Azul',
            type: 'berry',
            amount: 7,
          },
          {
            name: 'Tinto',
            type: 'berry',
            amount: 7,
          },
          {
            name: 'Narco',
            type: 'berry',
            amount: 4,
          },
        ],
        navy: [
          {
            name: 'sparkpowder',
            type: 'other',
            amount: 1,
          },
          {
            name: 'Azul',
            type: 'berry',
            amount: 12,
          },
          {
            name: 'Narco',
            type: 'berry',
            amount: 6,
          },
        ],
        cyan: [
          {
            name: 'sparkpowder',
            type: 'other',
            amount: 1,
          },
          {
            name: 'Azul',
            type: 'berry',
            amount: 12,
          },
          {
            name: 'Amar',
            type: 'berry',
            amount: 6,
          },
        ],
        blue: [
          {
            name: 'charcoal',
            type: 'other',
            amount: 2,
          },
          {
            name: 'Azul',
            type: 'berry',
            amount: 15,
          },
        ],
        yellow: [
          {
            name: 'charcoal',
            type: 'other',
            amount: 2,
          },
          {
            name: 'Amar',
            type: 'berry',
            amount: 15,
          },
        ],
        green: [
          {
            name: 'charcoal',
            type: 'other',
            amount: 2,
          },
          {
            name: 'Amar',
            type: 'berry',
            amount: 9,
          },
          {
            name: 'Azul',
            type: 'berry',
            amount: 9,
          },
        ],
      }
    };

    const gemReq = {
      all: [
        {
          name: 'crystal',
          type: 'other',
          amount: 1,
        }
      ],
      red: [
        {
          name: 'brown',
          type: 'color',
          amount: 25,
        },
        {
          name: 'cantaloupe',
          type: 'color',
          amount: 25,
        },
        {
          name: 'mud',
          type: 'color',
          amount: 25,
        },
        {
          name: 'tan',
          type: 'color',
          amount: 25,
        },
        {
          name: 'red',
          type: 'color',
          amount: 100,
        },
      ],
      blue: [
        {
          name: 'cyan',
          type: 'color',
          amount: 25,
        },
        {
          name: 'navy',
          type: 'color',
          amount: 25,
        },
        {
          name: 'royalty',
          type: 'color',
          amount: 25,
        },
        {
          name: 'blue',
          type: 'color',
          amount: 100,
        },
      ],
      green: [
        {
          name: 'blue',
          type: 'color',
          amount: 25,
        },
        {
          name: 'yellow',
          type: 'color',
          amount: 25,
        },
        {
          name: 'green',
          type: 'color',
          amount: 100,
        },
      ],
    };

    return {
      amount: ref(1),
      gemTypes,
      gemReq,
      typeReq,
      gemType: ref(null),
    }
  }
})
</script>

<style lang="scss" scoped>
p {
  text-transform: capitalize;
}
</style>
