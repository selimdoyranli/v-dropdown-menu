<template>
  <div class="advanced-demo">
    <dropdown-menu v-bind="$attrs" class="custom-style" transition="zoom" @opened="writeToConsoleForOpened" @closed="writeToConsoleForClosed">
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
import DropdownMenu from 'v-dropdown-menu'
import 'v-dropdown-menu/css'

const writeToConsoleForOpened = value => {
  console.log(value, 'opened')
}

const writeToConsoleForClosed = value => {
  console.log(value, 'closed')
}
</script>

<style>
.advanced-demo button {
  border: 2px solid #ddd;
  padding: 0.4rem 0.6rem;
}

.advanced-demo .v-dropdown-menu__header {
  color: #201e1b !important;
}

.v-dropdown-menu.custom-style .v-dropdown-menu__container {
  border: 0;
  border-radius: 5px;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
  transform: translateY(-50px);
}
.v-dropdown-menu.custom-style
  .v-dropdown-menu__container
  .v-dropdown-menu__header {
  display: flex;
  justify-content: center;
  padding: 5px;
  background-color: #eee;
}
.v-dropdown-menu.custom-style
  .v-dropdown-menu__container
  .v-dropdown-menu__body
  ul {
  margin: 0;
  padding: 0;
}
.v-dropdown-menu.custom-style
  .v-dropdown-menu__container
  .v-dropdown-menu__body
  ul
  li {
  list-style: none;
}
.v-dropdown-menu.custom-style
  .v-dropdown-menu__container
  .v-dropdown-menu__body
  ul
  li
  a {
  display: flex;
  padding: 1rem;
  color: #666;
  font-size: 16px;
  text-decoration: none;
}
.v-dropdown-menu.custom-style
  .v-dropdown-menu__container
  .v-dropdown-menu__body
  ul
  li
  a:hover {
  background-color: #f2f2f2;
}
.v-dropdown-menu.custom-style
  .v-dropdown-menu__container
  .v-dropdown-menu__footer {
  display: flex;
  justify-content: center;
  padding: 5px;
  color: #fff;
  background-color: #012353;
}
.v-dropdown-menu.custom-style .zoom-enter-active {
  transition: all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.v-dropdown-menu.custom-style .zoom-enter-from,
.v-dropdown-menu.custom-style .zoom-leave-to {
  transform: translateY(50px) scale(0.5);
  transform-origin: center top;
  opacity: 0;
}
.v-dropdown-menu.custom-style.v-dropdown-menu--mode-hover .zoom-enter-from,
.v-dropdown-menu.custom-style.v-dropdown-menu--mode-hover .zoom-leave-to {
  transition-delay: 0.4s;
}

</style>
