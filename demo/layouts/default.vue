<template lang="pug">
.layout.default-layout
  AppHeader
  .nuxt-view
    nuxt
</template>

<script>
import AppHeader from '@/components/shared/AppHeader'

export default {
  components: {
    AppHeader
  }
}
</script>

<style lang="scss" scoped>
.default-layout {
  position: relative;
}
</style>
