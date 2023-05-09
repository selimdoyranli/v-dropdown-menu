var DropdownMenu = (function () {
  'use strict';

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
    data: function data() {
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
      activeClass: function activeClass() {
        return this.menu.isOpen ? "".concat(this.baseClassName, "--active") : null;
      },
      modeClass: function modeClass() {
        return this.menu.mode === 'click' ? "".concat(this.baseClassName, "--mode-click") : "".concat(this.baseClassName, "--mode-hover");
      },
      dropupClass: function dropupClass() {
        return this.menu.dropup ? "".concat(this.baseClassName, "--dropup") : null;
      },
      directionClass: function directionClass() {
        var menuDirection = null;
        if (this.menu.direction === 'left') {
          menuDirection = "".concat(this.baseClassName, "--direction-left");
        } else if (this.menu.direction === 'center') {
          menuDirection = "".concat(this.baseClassName, "--direction-center");
        } else {
          menuDirection = "".concat(this.baseClassName, "--direction-right");
        }
        return menuDirection;
      }
    },
    watch: {
      isOpen: function isOpen(value) {
        var _this = this;
        if (this.menu.mode === 'click') {
          if (value) {
            setTimeout(function () {
              _this.show();
            }, 1); // wait, bypass for closeOnClickOutside
          } else {
            setTimeout(function () {
              _this.hide();
            }, 1); // wait, bypass for closeOnClickOutside
          }
        }
      },
      'menu.isOpen': function menuIsOpen(value) {
        if (this.menu.mode === 'click') {
          if (value) {
            this.$emit('opened', this.$props);
          } else {
            this.$emit('closed', this.$props);
          }
        }
      }
    },
    mounted: function mounted() {
      var _this2 = this;
      this.dropdownCloser();
      this.$nextTick(function () {
        if (_this2.menu.closeOnClickOutside) {
          _this2.registerCloseDropdownOnClickOutside();
        }
      });
      this.closeDropdownOnPopState();
    },
    beforeDestroy: function beforeDestroy() {
      this.destroyCloseDropdownOnClickOutside();
      this.destroyCloseDropdownOnPopState();
    },
    methods: {
      show: function show() {
        this.menu.isOpen = true;
      },
      hide: function hide() {
        this.menu.isOpen = false;
      },
      registerCloseDropdownOnClickOutside: function registerCloseDropdownOnClickOutside() {
        window.addEventListener('click', this.closeDropdownOnClickOutside);
      },
      closeDropdownOnClickOutside: function closeDropdownOnClickOutside(e) {
        if (this.menu.isOpen) {
          if (!this.$refs.rootRef.contains(e.target)) {
            this.menu.isOpen = false;
          }
        }
      },
      destroyCloseDropdownOnClickOutside: function destroyCloseDropdownOnClickOutside() {
        if (this.menu.closeOnClickOutside) {
          window.removeEventListener('click', this.closeDropdownOnClickOutside);
        }
      },
      dropdownCloser: function dropdownCloser() {
        var _this3 = this;
        if (this.menu.withDropdownCloser) {
          var dropdown = this.$refs.rootRef;
          dropdown.querySelectorAll('[dropdown-closer]').forEach(function (element) {
            element.addEventListener('click', function () {
              _this3.menu.isOpen = false;
            });
          });
        }
      },
      closeDropdownOnPopState: function closeDropdownOnPopState() {
        var _this4 = this;
        window.addEventListener('popstate', function () {
          if (_this4.menu.isOpen) {
            _this4.menu.isOpen = false;
          }
        });
      },
      destroyCloseDropdownOnPopState: function destroyCloseDropdownOnPopState() {
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

  /* script */
  var __vue_script__ = script;
  /* template */
  var __vue_render__ = function __vue_render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', {
      ref: "rootRef",
      staticClass: "v-dropdown-menu",
      class: [_vm.activeClass, _vm.modeClass, _vm.dropupClass, _vm.directionClass]
    }, [_vm.menu.mode === 'click' ? [_c('div', {
      ref: "triggerRef",
      staticClass: "v-dropdown-menu__trigger",
      on: {
        "click": function click($event) {
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
    }, [_vm._t("footer")], 2)])])] : _vm._e(), _vm.menu.mode === 'hover' ? [_c('div', {
      ref: "triggerRef",
      staticClass: "v-dropdown-menu__trigger",
      on: {
        "mouseover": function mouseover($event) {
          $event.preventDefault();
          return _vm.show.apply(null, arguments);
        },
        "mouseleave": function mouseleave($event) {
          $event.preventDefault();
          return _vm.hide.apply(null, arguments);
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
        "mouseover": function mouseover($event) {
          $event.preventDefault();
          return _vm.show.apply(null, arguments);
        },
        "mouseleave": function mouseleave($event) {
          $event.preventDefault();
          return _vm.hide.apply(null, arguments);
        }
      }
    }, [_c('div', {
      staticClass: "v-dropdown-menu__header"
    }, [_vm._t("header")], 2), _c('div', {
      staticClass: "v-dropdown-menu__body"
    }, [_vm._t("body")], 2), _c('div', {
      staticClass: "v-dropdown-menu__footer"
    }, [_vm._t("footer")], 2)])])] : _vm._e(), _vm.menu.overlay && _vm.menu.closeOnClickOutside && _vm.menu.mode === 'click' ? _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.menu.isOpen,
        expression: "menu.isOpen"
      }],
      ref: "overlayRef",
      staticClass: "v-dropdown-menu__overlay",
      style: {
        'background-color': _vm.menu.overlayBgColor,
        'z-index': _vm.menu.overlayZIndex
      },
      on: {
        "mousedown": function mousedown($event) {
          $event.preventDefault();
          return _vm.hide.apply(null, arguments);
        }
      }
    }) : _vm._e()], 2);
  };
  var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__ = /*#__PURE__*/normalizeComponent({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

  // Import vue component

  // install function executed by Vue.use()
  var install = function installDropdownMenu(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('DropdownMenu', __vue_component__);
  };

  // Create module definition for Vue.use()
  var plugin = {
    install: install
  };

  // To auto-install on non-es builds, when vue is found
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
  }

  // Inject install function into component - allows component
  // to be registered via Vue.use() as well as Vue.component()
  __vue_component__.install = install;

  // It's possible to expose named exports when writing components that can
  // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
  // export const RollupDemoDirective = component;

  return __vue_component__;

})();
