//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
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
    };
  },

  computed: {
    activeClass() {
      return this.menu.isOpen ? `${this.baseClassName}--active` : null;
    },

    modeClass() {
      return this.menu.mode === 'click' ? `${this.baseClassName}--mode-click` : `${this.baseClassName}--mode-hover`;
    },

    dropupClass() {
      return this.menu.dropup ? `${this.baseClassName}--dropup` : null;
    },

    directionClass() {
      let menuDirection = null;

      if (this.menu.direction === 'left') {
        menuDirection = `${this.baseClassName}--direction-left`;
      } else if (this.menu.direction === 'center') {
        menuDirection = `${this.baseClassName}--direction-center`;
      } else {
        menuDirection = `${this.baseClassName}--direction-right`;
      }

      return menuDirection;
    }

  },
  watch: {
    isOpen(value) {
      if (this.menu.mode === 'click') {
        if (value) {
          setTimeout(() => {
            this.show();
          }, 1); // wait, bypass for closeOnClickOutside
        } else {
          setTimeout(() => {
            this.hide();
          }, 1); // wait, bypass for closeOnClickOutside
        }
      }
    },

    'menu.isOpen'(value) {
      if (this.menu.mode === 'click') {
        if (value) {
          this.$emit('opened', this.$props);
        } else {
          this.$emit('closed', this.$props);
        }
      }
    }

  },

  mounted() {
    this.dropdownCloser();
    this.$nextTick(() => {
      if (this.menu.closeOnClickOutside) {
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
    show() {
      this.menu.isOpen = true;
    },

    hide() {
      this.menu.isOpen = false;
    },

    registerCloseDropdownOnClickOutside() {
      window.addEventListener('click', this.closeDropdownOnClickOutside);
    },

    closeDropdownOnClickOutside(e) {
      if (this.menu.isOpen) {
        if (!this.$refs.dropdown.contains(e.target)) {
          this.menu.isOpen = false;
        }
      }
    },

    destroyCloseDropdownOnClickOutside() {
      if (this.menu.closeOnClickOutside) {
        window.removeEventListener('click', this.closeDropdownOnClickOutside);
      }
    },

    dropdownCloser() {
      if (this.menu.withDropdownCloser) {
        const dropdown = this.$refs.dropdown;
        dropdown.querySelectorAll('[dropdown-closer]').forEach(element => {
          element.addEventListener('click', () => {
            this.menu.isOpen = false;
          });
        });
      }
    },

    closeDropdownOnPopState() {
      window.addEventListener('popstate', () => {
        if (this.menu.isOpen) {
          this.menu.isOpen = false;
        }
      });
    },

    destroyCloseDropdownOnPopState() {
      window.removeEventListener('popstate', this.closeDropdownOnPopState);
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    ref: "dropdown",
    staticClass: "v-dropdown-menu",
    class: [_vm.activeClass, _vm.modeClass, _vm.dropupClass, _vm.directionClass]
  }, [_vm.menu.mode === 'click' ? [_c('div', {
    ref: "trigger",
    staticClass: "v-dropdown-menu__trigger",
    on: {
      "click": function ($event) {
        $event.preventDefault();
        _vm.menu.isOpen = !_vm.menu.isOpen;
      }
    }
  }, [_vm._t("trigger")], 2), _c('transition', {
    attrs: {
      "name": _vm.menu.transition
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.menu.isOpen,
      expression: "menu.isOpen"
    }],
    staticClass: "v-dropdown-menu__container",
    style: {
      'z-index': _vm.menu.containerZIndex
    }
  }, [_c('div', {
    staticClass: "v-dropdown-menu__header"
  }, [_vm._t("header")], 2), _c('div', {
    staticClass: "v-dropdown-menu__body"
  }, [_vm._t("body")], 2), _c('div', {
    staticClass: "v-dropdown-menu__footer"
  }, [_vm._t("footer")], 2)])])] : [_c('div', {
    ref: "trigger",
    staticClass: "v-dropdown-menu__trigger",
    on: {
      "mouseover": function ($event) {
        $event.preventDefault();
        return _vm.show($event);
      },
      "mouseleave": function ($event) {
        $event.preventDefault();
        return _vm.hide($event);
      }
    }
  }, [_vm._t("trigger")], 2), _c('transition', {
    attrs: {
      "name": _vm.menu.transition
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.menu.isOpen,
      expression: "menu.isOpen"
    }],
    staticClass: "v-dropdown-menu__container",
    style: {
      'z-index': _vm.menu.containerZIndex
    },
    on: {
      "mouseover": function ($event) {
        $event.preventDefault();
        return _vm.show($event);
      },
      "mouseleave": function ($event) {
        $event.preventDefault();
        return _vm.hide($event);
      }
    }
  }, [_c('div', {
    staticClass: "v-dropdown-menu__header"
  }, [_vm._t("header")], 2), _c('div', {
    staticClass: "v-dropdown-menu__body"
  }, [_vm._t("body")], 2), _c('div', {
    staticClass: "v-dropdown-menu__footer"
  }, [_vm._t("footer")], 2)])])], _vm.menu.overlay && _vm.menu.closeOnClickOutside && _vm.menu.mode === 'click' ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.menu.isOpen,
      expression: "menu.isOpen"
    }],
    ref: "overlay",
    staticClass: "v-dropdown-menu__overlay",
    style: {
      'background-color': _vm.menu.overlayBgColor,
      'z-index': _vm.menu.overlayZIndex
    },
    on: {
      "mousedown": function ($event) {
        $event.preventDefault();
        return _vm.hide($event);
      }
    }
  }) : _vm._e()], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-0eab5251_0", {
    source: ".v-dropdown-menu{position:relative;display:inline-block}.v-dropdown-menu__trigger{position:relative}.v-dropdown-menu__container{position:absolute;top:100%;bottom:auto;min-width:230px;max-width:100%;overflow:hidden;background-color:#fff;border:1px solid #ddd}.v-dropdown-menu--dropup .v-dropdown-menu__container{top:auto;bottom:100%}.v-dropdown-menu--direction-left .v-dropdown-menu__container{left:0}.v-dropdown-menu--direction-center .v-dropdown-menu__container{left:50%;transform:translateX(-50%) translateY(0)}.v-dropdown-menu--direction-right .v-dropdown-menu__container{right:0}.v-dropdown-menu__overlay{position:fixed;top:0;left:0;width:100%;height:100vh}.v-dropdown-menu .default-enter-active{transition:all .2s ease}.v-dropdown-menu .default-leave-active{transition:all .2s cubic-bezier(1,.5,.8,1)}.v-dropdown-menu .default-enter,.v-dropdown-menu .default-leave-to{transform:translateY(12px);opacity:0}.v-dropdown-menu--mode-hover .default-enter,.v-dropdown-menu--mode-hover .default-leave-active{transition-delay:.4s}.v-dropdown-menu--dropup .default-enter,.v-dropdown-menu--dropup .default-leave-to{transform:translateY(-12px)}.v-dropdown-menu--dropup.v-dropdown-menu--direction-center .default-enter,.v-dropdown-menu--dropup.v-dropdown-menu--direction-center .default-leave-to{transform:translateX(-50%) translateY(-12px)}.v-dropdown-menu--direction-center .default-enter,.v-dropdown-menu--direction-center .default-leave-to{transform:translateX(-50%) translateY(12px)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component

const install = function installDropdownMenu(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('DropdownMenu', __vue_component__);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
