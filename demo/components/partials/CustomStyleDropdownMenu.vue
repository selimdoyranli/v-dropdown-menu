<template lang="pug">
// Section
section.demo-menu-wrapper
  p.demo-menu-desc customized style
  dropdown-menu.custom-style
    button(slot="trigger") Open Dropdown
    header(slot="header") Dropdown Header
    ul(slot="body")
      li(v-for="i in 6")
        a(href="") Item {{i}}
    footer(slot="footer") Dropdown Footer
  p ex. code
  code(data-gist-id="765dde383be86d8e8cd365dc7599a46f")
  code(data-gist-id="8a7f16e4b738314d307079527d30da00")
</template>

<style lang="scss">
.custom-style {
  &.v-dropdown-menu {
    .v-dropdown-menu__header {
      background-color: #eee;
      display: flex;
      justify-content: center;
      padding: 5px;
    }
    .v-dropdown-menu__container {
      border: 0;
      box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
      border-radius: 5px;
      &--active {
        top: -50px;
      }
    }
    .v-dropdown-menu__body {
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
    .v-dropdown-menu__footer {
      background-color: #012353;
      color: #fff;
      display: flex;
      justify-content: center;
      padding: 5px;
    }
  }
}
</style>
