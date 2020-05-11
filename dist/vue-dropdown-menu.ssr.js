'use strict';Object.defineProperty(exports,'__esModule',{value:true});//
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
    menuZIndex: {
      type: String,
      required: false,
      default: 994
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
      default: 992
    }
  },
  data: function data() {
    return {
      isShow: this.isOpen,
      withOverlay: this.overlay,
      menuDirection: this.direction
    };
  },
  computed: {
    dropdownMenuDirection: function dropdownMenuDirection() {
      var menuDirection = null;

      if (this.menuDirection === 'left') {
        menuDirection = 'vue-dropdown-menu__container--direction-left';
      } else if (this.menuDirection === 'right') {
        menuDirection = 'vue-dropdown-menu__container--direction-right';
      } else {
        menuDirection = 'vue-dropdown-menu__container--direction-center';
      }

      return menuDirection;
    }
  },
  watch: {
    isOpen: function isOpen(_isOpen) {
      if (_isOpen) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.dropdownCloser();
    this.$nextTick(function () {
      if (_this.closeOnClickOutside) {
        _this.registerCloseDropdownOnClickOutside();
      }
    });
    this.closeDropdownOnPopState();
  },
  beforeDestroy: function beforeDestroy() {
    this.destroyCloseDropdownOnClickOutside();
    this.destroyCloseDropdownOnPopState();
  },
  methods: {
    registerCloseDropdownOnClickOutside: function registerCloseDropdownOnClickOutside() {
      window.addEventListener('click', this.closeDropdownOnClickOutside);
    },
    closeDropdownOnClickOutside: function closeDropdownOnClickOutside(e) {
      if (this.isShow) {
        if (!this.$refs.dropdown.contains(e.target)) {
          this.isShow = false;
        }
      }
    },
    destroyCloseDropdownOnClickOutside: function destroyCloseDropdownOnClickOutside() {
      if (this.closeOnClickOutside) {
        window.removeEventListener('click', this.closeDropdownOnClickOutside);
      }
    },
    dropdownCloser: function dropdownCloser() {
      var _this2 = this;

      if (this.withDropdownCloser) {
        var dropdown = this.$refs.dropdown;
        dropdown.querySelectorAll('.dropdown-closer').forEach(function (element) {
          element.addEventListener('click', function () {
            _this2.isShow = false;
          });
        });
      }
    },
    closeDropdownOnPopState: function closeDropdownOnPopState() {
      var _this3 = this;

      window.addEventListener('popstate', function () {
        if (_this3.isShow) {
          _this3.isShow = false;
        }
      });
    },
    destroyCloseDropdownOnPopState: function destroyCloseDropdownOnPopState() {
      window.removeEventListener('popstate', this.closeDropdownOnPopState);
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    ref: "dropdown",
    staticClass: "vue-dropdown-menu"
  }, [_vm.mode == 'hover' ? _vm._ssrNode("<div class=\"vue-dropdown-menu__trigger vue-dropdown-menu__trigger--mode-hover\">", "</div>", [_vm._t("trigger")], 2) : _vm._e(), _vm.mode == 'hover' ? _vm._ssrNode("<div" + _vm._ssrClass("vue-dropdown-menu__container vue-dropdown-menu__container--mode-hover", [_vm.dropdownMenuDirection]) + _vm._ssrStyle(null, {
    'z-index': _vm.menuZIndex
  }, null) + ">", "</div>", [_vm._ssrNode("<div class=\"vue-dropdown-menu__header\">", "</div>", [_vm._t("header")], 2), _vm._ssrNode("<div class=\"vue-dropdown-menu__body\">", "</div>", [_vm._t("body")], 2), _vm._ssrNode("<div class=\"vue-dropdown-menu__footer\">", "</div>", [_vm._t("footer")], 2)]) : _vm._e(), _vm.mode == 'click' ? _vm._ssrNode("<div class=\"vue-dropdown-menu__trigger vue-dropdown-menu__trigger--mode-click\">", "</div>", [_vm._t("trigger")], 2) : _vm._e(), _vm.mode == 'click' ? _vm._ssrNode("<div" + _vm._ssrClass("vue-dropdown-menu__container vue-dropdown-menu__container--mode-click", [{
    'vue-dropdown-menu__container--active': _vm.isShow
  }, _vm.dropdownMenuDirection]) + _vm._ssrStyle(null, {
    'z-index': _vm.menuZIndex
  }, null) + ">", "</div>", [_vm._ssrNode("<div class=\"vue-dropdown-menu__header\">", "</div>", [_vm._t("header")], 2), _vm._ssrNode("<div class=\"vue-dropdown-menu__body\">", "</div>", [_vm._t("body")], 2), _vm._ssrNode("<div class=\"vue-dropdown-menu__footer\">", "</div>", [_vm._t("footer")], 2)]) : _vm._e(), _vm._ssrNode(_vm.withOverlay && _vm.closeOnClickOutside ? "<div class=\"vue-dropdown-menu__overlay\"" + _vm._ssrStyle(null, {
    'background-color': _vm.overlayBgColor,
    'z-index': _vm.overlayZIndex
  }, {
    display: _vm.isShow ? '' : 'none'
  }) + "></div>" : "<!---->")], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-040d7cfb_0", {
    source: ".vue-dropdown-menu{position:relative;display:inline-block}.vue-dropdown-menu .vue-dropdown-menu__container--active,.vue-dropdown-menu .vue-dropdown-menu__container--mode-hover:hover,.vue-dropdown-menu .vue-dropdown-menu__trigger--mode-hover:hover+.vue-dropdown-menu__container--mode-hover{opacity:1;visibility:visible;top:35px}.vue-dropdown-menu__container{background-color:#fff;min-width:230px;max-width:100%;position:absolute;top:40px;opacity:0;visibility:hidden;overflow:hidden}.vue-dropdown-menu__container--mode-hover{transition:.1s;transition-delay:.2s}.vue-dropdown-menu__container--direction-left{left:0}.vue-dropdown-menu__container--direction-right{right:0}.vue-dropdown-menu__container--direction-center{left:50%;transform:translate(-50%,0)}.vue-dropdown-menu__overlay{position:fixed;top:0;left:0;width:100%;height:100vh}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-040d7cfb";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installDropdownMenu(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('DropdownMenu', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__;