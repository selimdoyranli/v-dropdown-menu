<template lang="pug">
.page

  p.desc Customizable dropdown menu plugin for vuejs. SSR supported.&nbsp;&nbsp;
    a(href="https://github.com/radkod.com/vue-dropdown-menu" target="_blank" title="vue-dropdown-menu documentation") See doc.
  .demo-menu-wrapper
    p.demo-menu-desc Default
    client-only
      dropdown-menu
        button(slot="trigger") Open Dropdown
        header(slot="header") Dropdown Header
        ul(slot="body")
          li(v-for="i in 6")
            a(href="") Item {{i}}
        footer(slot="footer") Dropdown Footer
</template>

<script>
export default {
  head() {
    return {
      title: 'vue-dropdown-menu | Customizable dropdown menu plugin for vuejs.'
    }
  }
}
</script>

<style lang="scss">
.page {
  position: relative;
  min-height: 90vh;
  padding: 2em;
  .desc {
    font-size: 16px;
    color: #888;
    text-align: center;
    margin-bottom: 4em;
  }
}
</style>
