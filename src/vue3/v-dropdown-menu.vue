<template lang="pug">
.v-dropdown-menu(ref="rootRef" :class="[activeClass, modeClass, dropupClass, directionClass]")
  // For Click Mode
  template(v-if="menu.mode === 'click'")
    .v-dropdown-menu__trigger(ref="triggerRef" @click.prevent="menu.isOpen = !menu.isOpen")
      slot(name="trigger")
    Transition(mode="out-in" :name="menu.transition")
      .v-dropdown-menu__container(v-show="menu.isOpen" :style="{ 'z-index': menu.containerZIndex }")
        .v-dropdown-menu__header
          slot(name="header")
        .v-dropdown-menu__body
          slot(name="body")
        .v-dropdown-menu__footer
          slot(name="footer")

  // For Hover Mode
  template(v-if="menu.mode === 'hover'")
    .v-dropdown-menu__trigger(ref="triggerRef" @mouseover.prevent="show" @mouseleave.prevent="hide")
      slot(name="trigger")
    Transition(:name="menu.transition")
      .v-dropdown-menu__container(
        v-show="menu.isOpen"
        :style="{ 'z-index': menu.containerZIndex }"
        @mouseover.prevent="show"
        @mouseleave.prevent="hide"
      )
        .v-dropdown-menu__header
          slot(name="header")
        .v-dropdown-menu__body
          slot(name="body")
        .v-dropdown-menu__footer
          slot(name="footer")

  // Overlay
  .v-dropdown-menu__overlay(
    v-if="menu.overlay && menu.closeOnClickOutside && menu.mode === 'click'"
    ref="overlayRef"
    v-show="menu.isOpen"
    :style="{ 'background-color': menu.overlayBgColor, 'z-index': menu.overlayZIndex }"
    @mousedown.prevent="hide"
  )
</template>

<script>
import { defineComponent, ref, reactive, onMounted, onBeforeUnmount, nextTick, watch, computed } from 'vue'

export default defineComponent({
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
  setup(props, { emit }) {
    const baseClassName = 'v-dropdown-menu'

    const rootRef = ref(null)
    const triggerRef = ref(null)
    const overlayRef = ref(null)

    const menu = reactive({
      isOpen: props.isOpen,
      mode: props.mode,
      dropup: props.dropup,
      direction: props.direction,
      closeOnClickOutside: props.closeOnClickOutside,
      withDropdownCloser: props.withDropdownCloser,
      containerZIndex: props.containerZIndex,
      overlay: props.overlay,
      overlayBgColor: props.overlayBgColor,
      overlayZIndex: props.overlayZIndex,
      transition: props.transition
    })

    const activeClass = computed(() => {
      return menu.isOpen ? `${baseClassName}--active` : null
    })

    const modeClass = computed(() => {
      return menu.mode === 'click' ? `${baseClassName}--mode-click` : `${baseClassName}--mode-hover`
    })

    const dropupClass = computed(() => {
      return menu.dropup ? `${baseClassName}--dropup` : null
    })

    const directionClass = computed(() => {
      let menuDirection = null

      if (menu.direction === 'left') {
        menuDirection = `${baseClassName}--direction-left`
      } else if (menu.direction === 'center') {
        menuDirection = `${baseClassName}--direction-center`
      } else {
        menuDirection = `${baseClassName}--direction-right`
      }

      return menuDirection
    })

    watch(
      () => props.isOpen,
      value => {
        if (menu.mode === 'click') {
          if (value) {
            setTimeout(() => {
              show()
            }, 1) // wait, bypass for closeOnClickOutside
          } else {
            setTimeout(() => {
              hide()
            }, 1) // wait, bypass for closeOnClickOutside
          }
        }
      }
    )

    watch(
      () => menu.isOpen,
      value => {
        if (menu.mode === 'click') {
          if (value) {
            emit('opened', props)
          } else {
            emit('closed', props)
          }
        }
      }
    )

    onMounted(() => {
      dropdownCloser()

      nextTick(() => {
        if (menu.closeOnClickOutside) {
          registerCloseDropdownOnClickOutside()
        }
      })
      closeDropdownOnPopState()
    })

    onBeforeUnmount(() => {
      destroyCloseDropdownOnClickOutside()
      destroyCloseDropdownOnPopState()
    })

    // Methods
    const show = () => {
      menu.isOpen = true
    }

    const hide = () => {
      menu.isOpen = false
    }

    const registerCloseDropdownOnClickOutside = () => {
      window.addEventListener('click', closeDropdownOnClickOutside)
    }

    const closeDropdownOnClickOutside = e => {
      if (menu.isOpen) {
        if (!rootRef.value.contains(e.target)) {
          menu.isOpen = false
        }
      }
    }

    const destroyCloseDropdownOnClickOutside = () => {
      if (menu.closeOnClickOutside) {
        window.removeEventListener('click', closeDropdownOnClickOutside)
      }
    }

    const dropdownCloser = () => {
      if (menu.withDropdownCloser) {
        const dropdown = rootRef.value

        dropdown.querySelectorAll('[dropdown-closer]').forEach(element => {
          element.addEventListener('click', () => {
            menu.isOpen = false
          })
        })
      }
    }

    const closeDropdownOnPopState = () => {
      window.addEventListener('popstate', () => {
        if (menu.isOpen) {
          menu.isOpen = false
        }
      })
    }

    const destroyCloseDropdownOnPopState = () => {
      window.removeEventListener('popstate', closeDropdownOnPopState)
    }

    return {
      rootRef,
      triggerRef,
      overlayRef,
      menu,
      show,
      hide,
      activeClass,
      modeClass,
      dropupClass,
      directionClass
    }
  }
})
</script>

<style lang="scss" src="./v-dropdown-menu.scss"></style>
