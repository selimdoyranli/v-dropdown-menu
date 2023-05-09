<template>
  <dropdown-menu v-bind="$attrs">
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
</template>

<script setup>
import DropdownMenu from 'v-dropdown-menu'
import '/node_modules/v-dropdown-menu/dist/vue3/v-dropdown-menu.css'
</script>

<style scoped>
button {
  border: 2px solid #ddd;
  padding: 0.4rem 0.6rem;
}
</style>
