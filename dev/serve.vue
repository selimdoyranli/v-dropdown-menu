<script>
import Vue from 'vue';
import DropdownMenu from '../dist/v-dropdown-menu';
import '../dist/v-dropdown-menu.css';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    DropdownMenu,
  },
});
</script>

<template>
  <div id="app">
    <dropdown-menu>
      <button slot="trigger">Open</button>
      <header slot="body">Header</header>
      <div slot="body">Body</div>
      <footer slot="body">Footer</footer>
    </dropdown-menu>
  </div>
</template>
