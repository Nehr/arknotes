<template>
  <q-page class="flex flex-center">
    <div>
      <p class="text-h1">To do</p>
      <p>
        Don't forget...<br>
        <ul>
          <li>Edit button to show hidden notes</li>
          <li>Sort items by name/note</li>
          <li>Enter utgångspunkt för zeroVal</li>
          <li>Add map (canvas) with lon/lat dots for each unfinished note</li>
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
