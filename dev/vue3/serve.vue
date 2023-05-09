<template>
  <div id="app">
    <dropdown-menu>
      <template #trigger>
        <button>Open Dropdown</button>
      </template>

      <template #header> Dropdown Header </template>

      <template #body>
        <ul>
          <li v-for="i in 6" :key="i">
            <a href="">Item {{ i }}</a>
          </li>
        </ul>
      </template>

      <template #footer> Dropdown Footer </template>
    </dropdown-menu>
  </div>
</template>

<script setup>
import DropdownMenu from '../../dist/vue3'
import '../../dist/vue3/v-dropdown-menu.css'
</script>
