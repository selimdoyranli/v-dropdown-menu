<template lang="pug">
// Section
section.demo-menu-wrapper
  p.demo-menu-desc customized style & callbacks
  small check console for event logs after clicking
  br
  br
  dropdown-menu.custom-style(@opened="writeToConsoleForOpened" @closed="writeToConsoleForClosed")
    button(slot="trigger") Open Dropdown
    header(slot="header") v-dropdown-menu
    ul(slot="body")
      li(v-for="i in 6")
        a(href="") Item {{i}}
    footer(slot="footer") @RadKod
  p ex. code
  code(data-gist-id="7af19e39baa13947428b899f6adc0fd3")
  code(data-gist-id="01ced89f534bc0214a4f98a42a81a978")
</template>

<script>
export default {
  methods: {
    writeToConsoleForOpened(value) {
      console.log(value, 'opened')
    },
    writeToConsoleForClosed(value) {
      console.log(value, 'closed')
    }
  }
}
</script>

<style lang="scss">
.v-dropdown-menu {
  $this: &;
  &.custom-style & {
    &__container {
      border: 0;
      box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
      border-radius: 5px;
      transform: translateY(0) scale(0.5);
      #{$this} {
        &__header {
          background-color: #eee;
          display: flex;
          justify-content: center;
          padding: 5px;
        }
        &__body {
          ul {
            margin: 0;
            padding: 0;
            li {
              list-style: none;
              a {
                text-decoration: none;
                font-size: 16px;
                padding: 1rem;
                color: #666;
                display: flex;
                &:hover {
                  background-color: #f2f2f2;
                }
              }
            }
          }
        }
        &__footer {
          background-color: #012353;
          color: #fff;
          display: flex;
          justify-content: center;
          padding: 5px;
        }
      }
    }
  }
  &.custom-style {
    &#{$this}--active {
      #{$this}__container {
        transform: translateY(-50px) scale(1);
        transform-origin: top center;
        transition: 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    }
  }
}
</style>
