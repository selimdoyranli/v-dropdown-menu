<template lang="pug">
header.app-header
  a.logo(href="https://www.npmjs.com/package/v-dropdown-menu" target="_blank" title="v-dropdown-menu")
    img.logo-img(src="@/assets/img/core/logo.png" alt="v-dropdown-menu")
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
  .logo {
    position: relative;
    .logo-img {
      position: relative;
      height: 30px;
      object-fit: contain;
    }
  }
}
</style>
