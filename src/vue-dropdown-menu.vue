<template lang="pug">
.vue-dropdown-menu(ref="dropdown")
  // For Hover Mode
  .vue-dropdown-menu__trigger.vue-dropdown-menu__trigger--mode-hover(ref="dropdownMenuTrigger" v-if="mode == 'hover'")
    slot(name='trigger')
  .vue-dropdown-menu__container.vue-dropdown-menu__container--mode-hover(v-if="mode == 'hover'" :class="[dropdownMenuDirection]" :style="{'z-index': menuZIndex}")
    .vue-dropdown-menu__header
      slot(name="header")
    .vue-dropdown-menu__body
      slot(name='body')
    .vue-dropdown-menu__footer
      slot(name="footer")

  // For Click Mode
  .vue-dropdown-menu__trigger.vue-dropdown-menu__trigger--mode-click(v-if="mode == 'click'" ref="dropdownMenuTrigger" @mousedown.prevent="isShow = !isShow")
    slot(name='trigger')
  .vue-dropdown-menu__container.vue-dropdown-menu__container--mode-click(v-if="mode == 'click'" :class="[{'vue-dropdown-menu__container--active': isShow}, dropdownMenuDirection]" :style="{'z-index': menuZIndex}")
    .vue-dropdown-menu__header
      slot(name="header")
    .vue-dropdown-menu__body
      slot(name='body')
    .vue-dropdown-menu__footer
      slot(name="footer")

  // Overlay
  .vue-dropdown-menu__overlay(ref="overlay" v-if="withOverlay && closeOnClickOutside" v-show="isShow" :style="{'background-color': overlayBgColor, 'z-index': overlayZIndex}" @mousedown="isShow = false")
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
      default: 994,
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
      default: 992,
    },
  },
  data() {
    return {
      isShow: this.isOpen,
      withOverlay: this.overlay,
      menuDirection: this.direction,
    };
  },
  computed: {
    dropdownMenuDirection() {
      let menuDirection = null;

      if (this.menuDirection === 'left') {
        menuDirection = 'vue-dropdown-menu__container--direction-left';
      } else if (this.menuDirection === 'right') {
        menuDirection = 'vue-dropdown-menu__container--direction-right';
      } else {
        menuDirection = 'vue-dropdown-menu__container--direction-center';
      }

      return menuDirection;
    },
  },
  watch: {
    isOpen(isOpen) {
      if (isOpen) {
        this.isShow = true;
      } else {
        this.isShow = false;
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

        dropdown.querySelectorAll('.dropdown-closer').forEach((element) => {
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
.vue-dropdown-menu {
  position: relative;
  display: inline-block;
  %active {
    opacity: 1;
    visibility: visible;
    top: 35px;
  }
  &__container {
    background-color: #fff;
    min-width: 230px;
    max-width: 100%;
    position: absolute;
    top: 40px;
    opacity: 0;
    visibility: hidden;
    overflow: hidden;
    &--active {
      @extend %active;
    }
    &--mode-hover {
      transition: 0.1s;
      transition-delay: 0.2s;
      &:hover {
        @extend %active;
      }
    }
    &--direction-left {
      left: 0;
    }
    &--direction-right {
      right: 0;
    }
    &--direction-center {
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
  &__trigger {
    &--mode-hover:hover + .vue-dropdown-menu__container {
      &--mode-hover {
        @extend %active;
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
