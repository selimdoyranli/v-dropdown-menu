<template lang="pug">
.v-dropdown-menu(ref="dropdown" :class="[modeClass, dropupClass, directionClass, {'v-dropdown-menu--active': isShow}]")
  // For Hover Mode
  .v-dropdown-menu__trigger(v-if="mode === 'hover'" ref="dropdownMenuTrigger")
    slot(name='trigger')
  .v-dropdown-menu__container(v-if="mode == 'hover'" :style="{'z-index': menuZIndex}")
    .v-dropdown-menu__header
      slot(name="header")
    .v-dropdown-menu__body
      slot(name='body')
    .v-dropdown-menu__footer
      slot(name="footer")

  // For Click Mode
  .v-dropdown-menu__trigger(v-if="mode == 'click'" ref="dropdownMenuTrigger" @mousedown.prevent="isShow = !isShow")
    slot(name='trigger')
  .v-dropdown-menu__container(v-if="mode == 'click'" :style="{'z-index': menuZIndex}")
    .v-dropdown-menu__header
      slot(name="header")
    .v-dropdown-menu__body
      slot(name='body')
    .v-dropdown-menu__footer
      slot(name="footer")

  // Overlay
  .v-dropdown-menu__overlay(ref="overlay" v-if="withOverlay && closeOnClickOutside" v-show="isShow" :style="{'background-color': overlayBgColor, 'z-index': overlayZIndex}" @mousedown="isShow = false")
</template>

<script>
export default {
  name: 'DropdownMenu',
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    mode: {
      type: String,
      required: false,
      default: 'click',
    },
    dropup: {
      type: Boolean,
      required: false,
      default: false,
    },
    direction: {
      type: String,
      required: false,
      default: 'left',
    },
    closeOnClickOutside: {
      type: Boolean,
      required: false,
      default: true,
    },
    withDropdownCloser: {
      type: Boolean,
      required: false,
      default: false,
    },
    menuZIndex: {
      type: String,
      required: false,
      default: '994',
    },
    overlay: {
      type: Boolean,
      required: false,
      default: true,
    },
    overlayBgColor: {
      type: String,
      required: false,
      default: 'rgba(0, 0, 0, 0.2)',
    },
    overlayZIndex: {
      type: String,
      required: false,
      default: '992',
    },
  },
  data() {
    return {
      baseClassName: 'v-dropdown-menu',
      isShow: this.isOpen,
      withOverlay: this.overlay,
      menuDirection: this.direction,
    };
  },
  computed: {
    modeClass() {
      return this.mode === 'click'
        ? `${this.baseClassName}--mode-click`
        : `${this.baseClassName}--mode-hover`;
    },
    dropupClass() {
      return this.dropup ? `${this.baseClassName}--dropup` : null;
    },
    directionClass() {
      let menuDirection = null;

      if (this.menuDirection === 'left') {
        menuDirection = `${this.baseClassName}--direction-left`;
      } else if (this.menuDirection === 'right') {
        menuDirection = `${this.baseClassName}--direction-right`;
      } else {
        menuDirection = `${this.baseClassName}--direction-center`;
      }

      return menuDirection;
    },
  },
  watch: {
    isShow(value) {
      if (value) {
        this.isShow = true;
        this.$emit('opened', this.$props);
      } else {
        this.isShow = false;
        this.$emit('closed', this.$props);
      }
    },
  },
  mounted() {
    this.dropdownCloser();
    this.$nextTick(() => {
      if (this.closeOnClickOutside) {
        this.registerCloseDropdownOnClickOutside();
      }
    });
    this.closeDropdownOnPopState();
  },
  beforeDestroy() {
    this.destroyCloseDropdownOnClickOutside();
    this.destroyCloseDropdownOnPopState();
  },
  methods: {
    registerCloseDropdownOnClickOutside() {
      window.addEventListener('click', this.closeDropdownOnClickOutside);
    },
    closeDropdownOnClickOutside(e) {
      if (this.isShow) {
        if (!this.$refs.dropdown.contains(e.target)) {
          this.isShow = false;
        }
      }
    },
    destroyCloseDropdownOnClickOutside() {
      if (this.closeOnClickOutside) {
        window.removeEventListener('click', this.closeDropdownOnClickOutside);
      }
    },
    dropdownCloser() {
      if (this.withDropdownCloser) {
        const dropdown = this.$refs.dropdown;

        dropdown.querySelectorAll('[dropdown-closer]').forEach((element) => {
          element.addEventListener('click', () => {
            this.isShow = false;
          });
        });
      }
    },
    closeDropdownOnPopState() {
      window.addEventListener('popstate', () => {
        if (this.isShow) {
          this.isShow = false;
        }
      });
    },
    destroyCloseDropdownOnPopState() {
      window.removeEventListener('popstate', this.closeDropdownOnPopState);
    },
  },
};
</script>

<style lang="scss">
%active {
  opacity: 1;
  visibility: visible;
}
.v-dropdown-menu {
  $this: &;
  $hover-offset: 12px;
  position: relative;
  display: inline-block;
  &__container {
    position: absolute;
    top: 100%;
    bottom: auto;
    min-width: 230px;
    max-width: 100%;
    background-color: #fff;
    border: 1px solid #ddd;
    opacity: 0;
    visibility: hidden;
    overflow: hidden;
  }
  &--active & {
    &__container {
      @extend %active;
    }
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
  &--direction-right & {
    &__container {
      right: 0;
    }
  }
  &--direction-center & {
    &__container {
      left: 50%;
      transform: translateX(-50%) translateY(0);
    }
  }
  &--mode-hover & {
    &__container {
      transform: translateY($hover-offset);
      transition: 0.1s;
      transition-delay: 0.2s;
      &:hover {
        @extend %active;
        transform: translateY(0);
      }
    }
    &__trigger:hover + #{$this}__container {
      @extend %active;
      transform: translateY(0);
    }
  }
  &--mode-hover {
    &#{$this}--dropup {
      #{$this}__container {
        transform: translateY(-$hover-offset);
      }
      &#{$this}--direction-center {
        #{$this}__container {
          transform: translateX(-50%) translateY(-$hover-offset);
        }
      }
    }

    &#{$this}--direction-center {
      #{$this}__container {
        transform: translateX(-50%) translateY($hover-offset);
        &:hover {
          transform: translateX(-50%) translateY(0);
        }
      }
      #{$this}__trigger:hover + #{$this}__container {
        @extend %active;
        transform: translateX(-50%) translateY(0);
      }
    }
  }
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
}
</style>
