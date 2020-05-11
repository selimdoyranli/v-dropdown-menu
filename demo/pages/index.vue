<template lang="pug">
.page

  blockquote.desc Customizable dropdown menu plugin for vuejs. SSR supported.&nbsp;&nbsp;
    a(href="https://github.com/RadKod/v-dropdown-menu" target="_blank" title="v-dropdown-menu documentation") See doc.

  .wrapper

    // Section
    section.demo-menu-wrapper
      p.demo-menu-desc Basic - no options
      dropdown-menu
        button(slot="trigger") Open Dropdown
        header(slot="header") Dropdown Header
        ul(slot="body")
          li(v-for="i in 6")
            a(href="") Item {{i}}
        footer(slot="footer") Dropdown Footer

    // Section
    section.demo-menu-wrapper
      p.demo-menu-desc isOpen: true , overlay: false
      dropdown-menu(:isOpen="true" :overlay="false")
        button(slot="trigger") Open Dropdown
        header(slot="header") Dropdown Header
        ul(slot="body")
          li(v-for="i in 6")
            a(href="") Item {{i}}
        footer(slot="footer") Dropdown Footer

    // Section
    section.demo-menu-wrapper
      p.demo-menu-desc isOpen: true , overlay: false, closeOnClickOutside: false
      dropdown-menu(:isOpen="true" :overlay="false" :closeOnClickOutside="false")
        button(slot="trigger") Toggle Dropdown
        header(slot="header") Dropdown Header
        ul(slot="body")
          li(v-for="i in 6")
            a(href="") Item {{i}}
        footer(slot="footer") Dropdown Footer

    // Section
    section.demo-menu-wrapper
      p.demo-menu-desc mode: hover
      dropdown-menu(mode="hover")
        button(slot="trigger") Open Dropdown
        header(slot="header") Dropdown Header
        ul(slot="body")
          li(v-for="i in 6")
            a(href="") Item {{i}}
        footer(slot="footer") Dropdown Footer

    // Section
    section.demo-menu-wrapper
      p.demo-menu-desc overlay: false
      dropdown-menu(:overlay="false")
        button(slot="trigger") Open Dropdown
        header(slot="header") Dropdown Header
        ul(slot="body")
          li(v-for="i in 6")
            a(href="") Item {{i}}
        footer(slot="footer") Dropdown Footer

    // Section
    section.demo-menu-wrapper
      p.demo-menu-desc overlayBgColor: rgba(1, 35, 83, 0.8)
      dropdown-menu(overlayBgColor="rgba(1, 35, 83, 0.8)")
        button(slot="trigger") Open Dropdown
        header(slot="header") Dropdown Header
        ul(slot="body")
          li(v-for="i in 6")
            a(href="") Item {{i}}
        footer(slot="footer") Dropdown Footer

    // Section
    section.demo-menu-wrapper
      p.demo-menu-desc direction: center
      dropdown-menu(direction="center")
        button(slot="trigger") Open Dropdown
        header(slot="header") Dropdown Header
        ul(slot="body")
          li(v-for="i in 6")
            a(href="") Item {{i}}
        footer(slot="footer") Dropdown Footer

    // Section
    section.demo-menu-wrapper
      p.demo-menu-desc direction: right
      dropdown-menu(direction="right")
        button(slot="trigger") Open Dropdown
        header(slot="header") Dropdown Header
        ul(slot="body")
          li(v-for="i in 6")
            a(href="") Item {{i}}
        footer(slot="footer") Dropdown Footer

    // Section
    section.demo-menu-wrapper
      p.demo-menu-desc direction: right , mode:hover
      dropdown-menu(direction="right" mode="hover")
        button(slot="trigger") Open Dropdown
        header(slot="header") Dropdown Header
        ul(slot="body")
          li(v-for="i in 6")
            a(href="") Item {{i}}
        footer(slot="footer") Dropdown Footer

    // Section
    section.demo-menu-wrapper
      p.demo-menu-desc direction: center , mode:hover
      dropdown-menu(direction="center" mode="hover")
        button(slot="trigger") Open Dropdown
        header(slot="header") Dropdown Header
        ul(slot="body")
          li(v-for="i in 6")
            a(href="") Item {{i}}
        footer(slot="footer") Dropdown Footer

    // Section
    section.demo-menu-wrapper
      p.demo-menu-desc withDropdownCloser: true
      dropdown-menu(:withDropdownCloser="true")
        button(slot="trigger") Open Dropdown
        header(slot="header") Dropdown Header
        ul(slot="body")
          li
            a(href="") Item 1
          li
            a(href="") Item 2
          li
            button.dropdown-closer Dropdown Closer (this contain class: .dropdown-closer)
          li
            a(href="") Item 4
          li
            a(href="") Item 5
          li
            a(href="")
        footer(slot="footer") Dropdown Footer

    CustomStyleDropdownMenu

  MetaData

</template>

<script>
import MetaData from '@/components/partials/MetaData'
import CustomStyleDropdownMenu from '@/components/partials/CustomStyleDropdownMenu'

export default {
  head() {
    return {
      title: 'v-dropdown-menu | Customizable dropdown menu plugin for vuejs.'
    }
  },
  components: {
    CustomStyleDropdownMenu,
    MetaData
  }
}
</script>

<style lang="scss">
.page {
  position: relative;
  padding: 2em;
  padding-bottom: 50vh;
  .desc {
    font-size: 16px;
    color: #222;
    text-align: center;
    margin-bottom: 4em;
    background-color: #ddd;
    border-radius: 0;
    padding: 8px 14px;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 0px;
    section.demo-menu-wrapper {
      height: max-content;
      border: 1px solid #ddd;
      padding: 1em 2em 4em 2em;
      margin-bottom: 2em;
      .demo-menu-desc {
        background-color: #000;
        border-radius: 5px;
        padding: 5px 14px;
        color: #fff;
        display: table;
      }
    }
  }
  @media (max-width: 992px) {
    .wrapper {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
