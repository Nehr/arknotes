<template>
  <q-page class="flex flex-center">
    <div>
      <p class="text-h1">To do</p>
      <p>
        Don't forget...<br>
        <ul>
          <li class="done">Edit button to show hidden notes</li>
          <li class="done">Sort items by name/note</li>
          <li class="done">Sort items from both long and lat, whichever is closer</li>
          <li>Enter utgångspunkt för zeroVal</li>
          <li>Add map (canvas?) with lon/lat dots for each unfinished note</li>
          <li class="done">Hide sections when all items are hidden</li>
          <li class="done">Relative position to last cleared note (N/S/E/W)</li>
          <li class="done">Progress bar</li>
          <li>Sort after last cleared note</li>
          <li>Quick clear all button in [map]settings</li>
          <li>List by zone or list all</li>
          <li>List all: sort by closest</li>
        </ul>
      </p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ToDo'
})
</script>

<style lang="scss" scoped>
  ul {
    li {
      &.done {
        text-decoration: line-through;
      }
    }
  }
</style>