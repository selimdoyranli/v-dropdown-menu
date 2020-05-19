<template lang="pug">
// Section
section.demo-menu-wrapper
  p.demo-menu-desc customized style & callbacks
  small check console for event logs after clicking
  br
  br
  dropdown-menu.custom-style(transition="zoom" @opened="writeToConsoleForOpened" @closed="writeToConsoleForClosed")
    button(slot="trigger") Open Dropdown
    header(slot="header") v-dropdown-menu
    ul(slot="body")
      li(v-for="i in 6")
        a(href="") Item {{i}}
    footer(slot="footer") @RadKod
  p ex. code
  code(data-gist-id="0908dc999e2ea4f81d190b35fb70c8c9")
  code(data-gist-id="e94a5c0a839dd031137b70d0922bd36b")
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
      border-radius: 5px;
      box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
      transform: translateY(-50px);
      #{$this} {
        &__header {
          display: flex;
          justify-content: center;
          padding: 5px;
          background-color: #eee;
        }
        &__body {
          ul {
            margin: 0;
            padding: 0;
            li {
              list-style: none;
              a {
                display: flex;
                padding: 1rem;
                color: #666;
                font-size: 16px;
                text-decoration: none;
                &:hover {
                  background-color: #f2f2f2;
                }
              }
            }
          }
        }
        &__footer {
          display: flex;
          justify-content: center;
          padding: 5px;
          color: #fff;
          background-color: #012353;
        }
      }
    }
  }
  &.custom-style {
    // Custom Transition - Zoom Effect
    .zoom-enter-active {
      transition: all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .zoom-enter,
    .zoom-leave-to {
      transform: translateY(50px) scale(0.5);
      transform-origin: center top;
      opacity: 0;
    }
    &#{$this}--mode-hover {
      .zoom-enter,
      .zoom-leave-to {
        transition-delay: 0.4s;
      }
    }
  }
}
</style>
