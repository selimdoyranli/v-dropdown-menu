<template lang="pug">
header.app-header
  h1.title
    a(href="https://www.npmjs.com/package/v-dropdown-menu" target="_blank" title="v-dropdown-menu") v-dropdown-menu
</template>

<script>
export default {}
</script>

<style lang="scss">
.app-header {
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 2em;
  .title {
    a {
      text-decoration: none;
      color: #4fc08d;
    }
  }
}
</style>
