<template lang="pug">
.v-dropdown-menu(ref="dropdown" :class="[activeClass, modeClass, dropupClass, directionClass]")
  
  // For Click Mode
  template(v-if="menu.mode === 'click'")
    .v-dropdown-menu__trigger(ref="trigger" @click.prevent="menu.isOpen = !menu.isOpen")
      slot(name='trigger')
    transition(:name="menu.transition")
      .v-dropdown-menu__container(v-show="menu.isOpen" :style="{'z-index': menu.containerZIndex}")
        .v-dropdown-menu__header
          slot(name="header")
        .v-dropdown-menu__body
          slot(name='body')
        .v-dropdown-menu__footer
          slot(name="footer")
  
  // For Hover Mode
  template(v-else)
    .v-dropdown-menu__trigger(ref="trigger" @mouseover.prevent="show" @mouseleave.prevent="hide")
      slot(name='trigger')
    transition(:name="menu.transition")
      .v-dropdown-menu__container(v-show="menu.isOpen" :style="{'z-index': menu.containerZIndex}" @mouseover.prevent="show" @mouseleave.prevent="hide")
        .v-dropdown-menu__header
          slot(name="header")
        .v-dropdown-menu__body
          slot(name='body')
        .v-dropdown-menu__footer
          slot(name="footer")

  // Overlay
  .v-dropdown-menu__overlay(ref="overlay" v-if="menu.overlay && menu.closeOnClickOutside && menu.mode === 'click'" v-show="menu.isOpen" :style="{'background-color': menu.overlayBgColor, 'z-index': menu.overlayZIndex}" @mousedown.prevent="hide")
</template>

<script>
export default {
  name: 'DropdownMenu',
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false
    },
    mode: {
      type: String,
      required: false,
      default: 'click'
    },
    dropup: {
      type: Boolean,
      required: false,
      default: false
    },
    direction: {
      type: String,
      required: false,
      default: 'left'
    },
    closeOnClickOutside: {
      type: Boolean,
      required: false,
      default: true
    },
    withDropdownCloser: {
      type: Boolean,
      required: false,
      default: false
    },
    containerZIndex: {
      type: String,
      required: false,
      default: '994'
    },
    overlay: {
      type: Boolean,
      required: false,
      default: true
    },
    overlayBgColor: {
      type: String,
      required: false,
      default: 'rgba(0, 0, 0, 0.2)'
    },
    overlayZIndex: {
      type: String,
      required: false,
      default: '992'
    },
    transition: {
      type: String,
      required: false,
      default: 'default'
    }
  },
  data() {
    return {
      baseClassName: 'v-dropdown-menu',
      menu: {
        isOpen: this.isOpen,
        mode: this.mode,
        dropup: this.dropup,
        direction: this.direction,
        closeOnClickOutside: this.closeOnClickOutside,
        withDropdownCloser: this.withDropdownCloser,
        containerZIndex: this.containerZIndex,
        overlay: this.overlay,
        overlayBgColor: this.overlayBgColor,
        overlayZIndex: this.overlayZIndex,
        transition: this.transition
      }
    }
  },
  computed: {
    activeClass() {
      return this.menu.isOpen ? `${this.baseClassName}--active` : null
    },
    modeClass() {
      return this.menu.mode === 'click'
        ? `${this.baseClassName}--mode-click`
        : `${this.baseClassName}--mode-hover`
    },
    dropupClass() {
      return this.menu.dropup ? `${this.baseClassName}--dropup` : null
    },
    directionClass() {
      let menuDirection = null

      if (this.menu.direction === 'left') {
        menuDirection = `${this.baseClassName}--direction-left`
      } else if (this.menu.direction === 'center') {
        menuDirection = `${this.baseClassName}--direction-center`
      } else {
        menuDirection = `${this.baseClassName}--direction-right`
      }

      return menuDirection
    }
  },
  watch: {
    'menu.isOpen'(value) {
      if (this.menu.mode === 'click') {
        if (value) {
          this.$emit('opened', this.$props)
        } else {
          this.$emit('closed', this.$props)
        }
      }
    }
  },
  mounted() {
    this.dropdownCloser()
    this.$nextTick(() => {
      if (this.menu.closeOnClickOutside) {
        this.registerCloseDropdownOnClickOutside()
      }
    })
    this.closeDropdownOnPopState()
  },
  beforeDestroy() {
    this.destroyCloseDropdownOnClickOutside()
    this.destroyCloseDropdownOnPopState()
  },
  methods: {
    show() {
      this.menu.isOpen = true
    },
    hide() {
      this.menu.isOpen = false
    },
    registerCloseDropdownOnClickOutside() {
      window.addEventListener('click', this.closeDropdownOnClickOutside)
    },
    closeDropdownOnClickOutside(e) {
      if (this.menu.isOpen) {
        if (!this.$refs.dropdown.contains(e.target)) {
          this.menu.isOpen = false
        }
      }
    },
    destroyCloseDropdownOnClickOutside() {
      if (this.menu.closeOnClickOutside) {
        window.removeEventListener('click', this.closeDropdownOnClickOutside)
      }
    },
    dropdownCloser() {
      if (this.menu.withDropdownCloser) {
        const dropdown = this.$refs.dropdown

        dropdown.querySelectorAll('[dropdown-closer]').forEach(element => {
          element.addEventListener('click', () => {
            this.menu.isOpen = false
          })
        })
      }
    },
    closeDropdownOnPopState() {
      window.addEventListener('popstate', () => {
        if (this.menu.isOpen) {
          this.menu.isOpen = false
        }
      })
    },
    destroyCloseDropdownOnPopState() {
      window.removeEventListener('popstate', this.closeDropdownOnPopState)
    }
  }
}
</script>

<style lang="scss">
.v-dropdown-menu {
  $this: &;
  $slide-offset: 12px;
  position: relative;
  display: inline-block;
  &__trigger {
    position: relative;
  }
  &__container {
    position: absolute;
    top: 100%;
    bottom: auto;
    min-width: 230px;
    max-width: 100%;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  &--dropup & {
    &__container {
      top: auto;
      bottom: 100%;
    }
  }
  &--direction-left & {
    &__container {
      left: 0;
    }
  }
  &--direction-center & {
    &__container {
      left: 50%;
      transform: translateX(-50%) translateY(0);
    }
  }
  &--direction-right & {
    &__container {
      right: 0;
    }
  }
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }

  // Default Transition
  .default-enter-active {
    transition: all 0.2s ease;
  }
  .default-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .default-enter,
  .default-leave-to {
    transform: translateY($slide-offset);
    opacity: 0;
  }
  &--mode-hover {
    .default-enter,
    .default-leave-active {
      transition-delay: 0.4s;
    }
  }
  &--dropup {
    .default-enter,
    .default-leave-to {
      transform: translateY(-$slide-offset);
    }
    &#{$this}--direction-center {
      .default-enter,
      .default-leave-to {
        transform: translateX(-50%) translateY(-$slide-offset);
      }
    }
  }
  &--direction-center {
    .default-enter,
    .default-leave-to {
      transform: translateX(-50%) translateY($slide-offset);
    }
  }
}
</style>
