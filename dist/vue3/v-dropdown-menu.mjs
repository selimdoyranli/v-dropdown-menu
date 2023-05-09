import { defineComponent, ref, reactive, computed, watch, onMounted, nextTick, onBeforeUnmount, openBlock, createElementBlock, normalizeClass, Fragment, createElementVNode, withModifiers, renderSlot, createVNode, Transition, withCtx, withDirectives, normalizeStyle, vShow, createCommentVNode } from 'vue';

var script = defineComponent({
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
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const baseClassName = 'v-dropdown-menu';
    const rootRef = ref(null);
    const triggerRef = ref(null);
    const overlayRef = ref(null);
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
    });
    const activeClass = computed(() => {
      return menu.isOpen ? `${baseClassName}--active` : null;
    });
    const modeClass = computed(() => {
      return menu.mode === 'click' ? `${baseClassName}--mode-click` : `${baseClassName}--mode-hover`;
    });
    const dropupClass = computed(() => {
      return menu.dropup ? `${baseClassName}--dropup` : null;
    });
    const directionClass = computed(() => {
      let menuDirection = null;
      if (menu.direction === 'left') {
        menuDirection = `${baseClassName}--direction-left`;
      } else if (menu.direction === 'center') {
        menuDirection = `${baseClassName}--direction-center`;
      } else {
        menuDirection = `${baseClassName}--direction-right`;
      }
      return menuDirection;
    });
    watch(() => props.isOpen, value => {
      if (menu.mode === 'click') {
        if (value) {
          setTimeout(() => {
            show();
          }, 1); // wait, bypass for closeOnClickOutside
        } else {
          setTimeout(() => {
            hide();
          }, 1); // wait, bypass for closeOnClickOutside
        }
      }
    });

    watch(() => menu.isOpen, value => {
      if (menu.mode === 'click') {
        if (value) {
          emit('opened', props);
        } else {
          emit('closed', props);
        }
      }
    });
    onMounted(() => {
      dropdownCloser();
      nextTick(() => {
        if (menu.closeOnClickOutside) {
          registerCloseDropdownOnClickOutside();
        }
      });
      closeDropdownOnPopState();
    });
    onBeforeUnmount(() => {
      destroyCloseDropdownOnClickOutside();
      destroyCloseDropdownOnPopState();
    });

    // Methods
    const show = () => {
      menu.isOpen = true;
    };
    const hide = () => {
      menu.isOpen = false;
    };
    const registerCloseDropdownOnClickOutside = () => {
      window.addEventListener('click', closeDropdownOnClickOutside);
    };
    const closeDropdownOnClickOutside = e => {
      if (menu.isOpen) {
        if (!rootRef.value.contains(e.target)) {
          menu.isOpen = false;
        }
      }
    };
    const destroyCloseDropdownOnClickOutside = () => {
      if (menu.closeOnClickOutside) {
        window.removeEventListener('click', closeDropdownOnClickOutside);
      }
    };
    const dropdownCloser = () => {
      if (menu.withDropdownCloser) {
        const dropdown = rootRef.value;
        dropdown.querySelectorAll('[dropdown-closer]').forEach(element => {
          element.addEventListener('click', () => {
            menu.isOpen = false;
          });
        });
      }
    };
    const closeDropdownOnPopState = () => {
      window.addEventListener('popstate', () => {
        if (menu.isOpen) {
          menu.isOpen = false;
        }
      });
    };
    const destroyCloseDropdownOnPopState = () => {
      window.removeEventListener('popstate', closeDropdownOnPopState);
    };
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
    };
  }
});

const _hoisted_1 = {
  class: "v-dropdown-menu__header"
};
const _hoisted_2 = {
  class: "v-dropdown-menu__body"
};
const _hoisted_3 = {
  class: "v-dropdown-menu__footer"
};
const _hoisted_4 = {
  class: "v-dropdown-menu__header"
};
const _hoisted_5 = {
  class: "v-dropdown-menu__body"
};
const _hoisted_6 = {
  class: "v-dropdown-menu__footer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["v-dropdown-menu", [_ctx.activeClass, _ctx.modeClass, _ctx.dropupClass, _ctx.directionClass]]),
    ref: "rootRef"
  }, [_ctx.menu.mode === 'click' ? (openBlock(), createElementBlock(Fragment, {
    key: 0
  }, [createElementVNode("div", {
    class: "v-dropdown-menu__trigger",
    ref: "triggerRef",
    onClick: _cache[0] || (_cache[0] = withModifiers($event => _ctx.menu.isOpen = !_ctx.menu.isOpen, ["prevent"]))
  }, [renderSlot(_ctx.$slots, "trigger")], 512), createVNode(Transition, {
    mode: "out-in",
    name: _ctx.menu.transition
  }, {
    default: withCtx(() => [withDirectives(createElementVNode("div", {
      class: "v-dropdown-menu__container",
      style: normalizeStyle({
        'z-index': _ctx.menu.containerZIndex
      })
    }, [createElementVNode("div", _hoisted_1, [renderSlot(_ctx.$slots, "header")]), createElementVNode("div", _hoisted_2, [renderSlot(_ctx.$slots, "body")]), createElementVNode("div", _hoisted_3, [renderSlot(_ctx.$slots, "footer")])], 4), [[vShow, _ctx.menu.isOpen]])]),
    _: 3
  }, 8, ["name"])], 64)) : createCommentVNode("", true), _ctx.menu.mode === 'hover' ? (openBlock(), createElementBlock(Fragment, {
    key: 1
  }, [createElementVNode("div", {
    class: "v-dropdown-menu__trigger",
    ref: "triggerRef",
    onMouseover: _cache[1] || (_cache[1] = withModifiers(function () {
      return _ctx.show && _ctx.show(...arguments);
    }, ["prevent"])),
    onMouseleave: _cache[2] || (_cache[2] = withModifiers(function () {
      return _ctx.hide && _ctx.hide(...arguments);
    }, ["prevent"]))
  }, [renderSlot(_ctx.$slots, "trigger")], 544), createVNode(Transition, {
    name: _ctx.menu.transition
  }, {
    default: withCtx(() => [withDirectives(createElementVNode("div", {
      class: "v-dropdown-menu__container",
      style: normalizeStyle({
        'z-index': _ctx.menu.containerZIndex
      }),
      onMouseover: _cache[3] || (_cache[3] = withModifiers(function () {
        return _ctx.show && _ctx.show(...arguments);
      }, ["prevent"])),
      onMouseleave: _cache[4] || (_cache[4] = withModifiers(function () {
        return _ctx.hide && _ctx.hide(...arguments);
      }, ["prevent"]))
    }, [createElementVNode("div", _hoisted_4, [renderSlot(_ctx.$slots, "header")]), createElementVNode("div", _hoisted_5, [renderSlot(_ctx.$slots, "body")]), createElementVNode("div", _hoisted_6, [renderSlot(_ctx.$slots, "footer")])], 36), [[vShow, _ctx.menu.isOpen]])]),
    _: 3
  }, 8, ["name"])], 64)) : createCommentVNode("", true), _ctx.menu.overlay && _ctx.menu.closeOnClickOutside && _ctx.menu.mode === 'click' ? withDirectives((openBlock(), createElementBlock("div", {
    key: 2,
    class: "v-dropdown-menu__overlay",
    ref: "overlayRef",
    style: normalizeStyle({
      'background-color': _ctx.menu.overlayBgColor,
      'z-index': _ctx.menu.overlayZIndex
    }),
    onMousedown: _cache[5] || (_cache[5] = withModifiers(function () {
      return _ctx.hide && _ctx.hide(...arguments);
    }, ["prevent"]))
  }, null, 36)), [[vShow, _ctx.menu.isOpen]]) : createCommentVNode("", true)], 2);
}

script.render = render;

// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var entry = /*#__PURE__*/(() => {
  // Assign InstallableComponent type
  const installable = script;

  // Attach install function executed by Vue.use()
  installable.install = app => {
    app.component('DropdownMenu', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry as default };
