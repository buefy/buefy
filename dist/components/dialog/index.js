/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Dialog = {}));
}(this, function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var findFocusable = function findFocusable(element) {
    var programmatic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (!element) {
      return null;
    }

    if (programmatic) {
      return element.querySelectorAll("*[tabindex=\"-1\"]");
    }

    return element.querySelectorAll("a[href]:not([tabindex=\"-1\"]),\n                                     area[href],\n                                     input:not([disabled]),\n                                     select:not([disabled]),\n                                     textarea:not([disabled]),\n                                     button:not([disabled]),\n                                     iframe,\n                                     object,\n                                     embed,\n                                     *[tabindex]:not([tabindex=\"-1\"]),\n                                     *[contenteditable]");
  };

  var onKeyDown;

  var bind = function bind(el, _ref) {
    var _ref$value = _ref.value,
        value = _ref$value === void 0 ? true : _ref$value;

    if (value) {
      var focusable = findFocusable(el);
      var focusableProg = findFocusable(el, true);

      if (focusable && focusable.length > 0) {
        onKeyDown = function onKeyDown(event) {
          // Need to get focusable each time since it can change between key events
          // ex. changing month in a datepicker
          focusable = findFocusable(el);
          focusableProg = findFocusable(el, true);
          var firstFocusable = focusable[0];
          var lastFocusable = focusable[focusable.length - 1];

          if (event.target === firstFocusable && event.shiftKey && event.key === 'Tab') {
            event.preventDefault();
            lastFocusable.focus();
          } else if ((event.target === lastFocusable || Array.from(focusableProg).indexOf(event.target) >= 0) && !event.shiftKey && event.key === 'Tab') {
            event.preventDefault();
            firstFocusable.focus();
          }
        };

        el.addEventListener('keydown', onKeyDown);
      }
    }
  };

  var unbind = function unbind(el) {
    el.removeEventListener('keydown', onKeyDown);
  };

  var directive = {
    bind: bind,
    unbind: unbind
  };

  var config = {
    defaultContainerElement: null,
    defaultIconPack: 'mdi',
    defaultIconComponent: null,
    defaultIconPrev: 'chevron-left',
    defaultIconNext: 'chevron-right',
    defaultLocale: undefined,
    defaultDialogConfirmText: null,
    defaultDialogCancelText: null,
    defaultSnackbarDuration: 3500,
    defaultSnackbarPosition: null,
    defaultToastDuration: 2000,
    defaultToastPosition: null,
    defaultNotificationDuration: 2000,
    defaultNotificationPosition: null,
    defaultTooltipType: 'is-primary',
    defaultTooltipDelay: null,
    defaultInputAutocomplete: 'on',
    defaultDateFormatter: null,
    defaultDateParser: null,
    defaultDateCreator: null,
    defaultTimeCreator: null,
    defaultDayNames: null,
    defaultMonthNames: null,
    defaultFirstDayOfWeek: null,
    defaultUnselectableDaysOfWeek: null,
    defaultTimeFormatter: null,
    defaultTimeParser: null,
    defaultModalCanCancel: ['escape', 'x', 'outside', 'button'],
    defaultModalScroll: null,
    defaultDatepickerMobileNative: true,
    defaultTimepickerMobileNative: true,
    defaultNoticeQueue: true,
    defaultInputHasCounter: true,
    defaultTaginputHasCounter: true,
    defaultUseHtml5Validation: true,
    defaultDropdownMobileModal: true,
    defaultFieldLabelPosition: null,
    defaultDatepickerYearsRange: [-100, 10],
    defaultDatepickerNearbyMonthDays: true,
    defaultDatepickerNearbySelectableMonthDays: false,
    defaultDatepickerShowWeekNumber: false,
    defaultDatepickerWeekNumberClickable: false,
    defaultDatepickerMobileModal: true,
    defaultTrapFocus: true,
    defaultAutoFocus: true,
    defaultButtonRounded: false,
    defaultSwitchRounded: true,
    defaultCarouselInterval: 3500,
    defaultTabsExpanded: false,
    defaultTabsAnimated: true,
    defaultTabsType: null,
    defaultStatusIcon: true,
    defaultProgrammaticPromise: false,
    defaultLinkTags: ['a', 'button', 'input', 'router-link', 'nuxt-link', 'n-link', 'RouterLink', 'NuxtLink', 'NLink'],
    defaultImageWebpFallback: null,
    defaultImageLazy: true,
    defaultImageResponsive: true,
    defaultImageRatio: null,
    defaultImageSrcsetFormatter: null,
    customIconPacks: null
  };
  var VueInstance;

  /**
   * Merge function to replace Object.assign with deep merging possibility
   */

  var isObject = function isObject(item) {
    return _typeof(item) === 'object' && !Array.isArray(item);
  };

  var mergeFn = function mergeFn(target, source) {
    var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (deep || !Object.assign) {
      var isDeep = function isDeep(prop) {
        return isObject(source[prop]) && target !== null && target.hasOwnProperty(prop) && isObject(target[prop]);
      };

      var replaced = Object.getOwnPropertyNames(source).map(function (prop) {
        return _defineProperty({}, prop, isDeep(prop) ? mergeFn(target[prop], source[prop], deep) : source[prop]);
      }).reduce(function (a, b) {
        return _objectSpread2({}, a, {}, b);
      }, {});
      return _objectSpread2({}, target, {}, replaced);
    } else {
      return Object.assign(target, source);
    }
  };

  var merge = mergeFn;
  function removeElement(el) {
    if (typeof el.remove !== 'undefined') {
      el.remove();
    } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
      el.parentNode.removeChild(el);
    }
  }

  var mdiIcons = {
    sizes: {
      'default': 'mdi-24px',
      'is-small': null,
      'is-medium': 'mdi-36px',
      'is-large': 'mdi-48px'
    },
    iconPrefix: 'mdi-'
  };

  var faIcons = function faIcons() {
    var faIconPrefix = config && config.defaultIconComponent ? '' : 'fa-';
    return {
      sizes: {
        'default': null,
        'is-small': null,
        'is-medium': faIconPrefix + 'lg',
        'is-large': faIconPrefix + '2x'
      },
      iconPrefix: faIconPrefix,
      internalIcons: {
        'information': 'info-circle',
        'alert': 'exclamation-triangle',
        'alert-circle': 'exclamation-circle',
        'chevron-right': 'angle-right',
        'chevron-left': 'angle-left',
        'chevron-down': 'angle-down',
        'eye-off': 'eye-slash',
        'menu-down': 'caret-down',
        'menu-up': 'caret-up',
        'close-circle': 'times-circle'
      }
    };
  };

  var getIcons = function getIcons() {
    var icons = {
      mdi: mdiIcons,
      fa: faIcons(),
      fas: faIcons(),
      far: faIcons(),
      fad: faIcons(),
      fab: faIcons(),
      fal: faIcons()
    };

    if (config && config.customIconPacks) {
      icons = merge(icons, config.customIconPacks, true);
    }

    return icons;
  };

  var script = {
    name: 'BIcon',
    props: {
      type: [String, Object],
      component: String,
      pack: String,
      icon: String,
      size: String,
      customSize: String,
      customClass: String,
      both: Boolean // This is used internally to show both MDI and FA icon

    },
    computed: {
      iconConfig: function iconConfig() {
        var allIcons = getIcons();
        return allIcons[this.newPack];
      },
      iconPrefix: function iconPrefix() {
        if (this.iconConfig && this.iconConfig.iconPrefix) {
          return this.iconConfig.iconPrefix;
        }

        return '';
      },

      /**
      * Internal icon name based on the pack.
      * If pack is 'fa', gets the equivalent FA icon name of the MDI,
      * internal icons are always MDI.
      */
      newIcon: function newIcon() {
        return "".concat(this.iconPrefix).concat(this.getEquivalentIconOf(this.icon));
      },
      newPack: function newPack() {
        return this.pack || config.defaultIconPack;
      },
      newType: function newType() {
        if (!this.type) return;
        var splitType = [];

        if (typeof this.type === 'string') {
          splitType = this.type.split('-');
        } else {
          for (var key in this.type) {
            if (this.type[key]) {
              splitType = key.split('-');
              break;
            }
          }
        }

        if (splitType.length <= 1) return;

        var _splitType = splitType,
            _splitType2 = _toArray(_splitType),
            type = _splitType2.slice(1);

        return "has-text-".concat(type.join('-'));
      },
      newCustomSize: function newCustomSize() {
        return this.customSize || this.customSizeByPack;
      },
      customSizeByPack: function customSizeByPack() {
        if (this.iconConfig && this.iconConfig.sizes) {
          if (this.size && this.iconConfig.sizes[this.size] !== undefined) {
            return this.iconConfig.sizes[this.size];
          } else if (this.iconConfig.sizes.default) {
            return this.iconConfig.sizes.default;
          }
        }

        return null;
      },
      useIconComponent: function useIconComponent() {
        return this.component || config.defaultIconComponent;
      }
    },
    methods: {
      /**
      * Equivalent icon name of the MDI.
      */
      getEquivalentIconOf: function getEquivalentIconOf(value) {
        // Only transform the class if the both prop is set to true
        if (!this.both) {
          return value;
        }

        if (this.iconConfig && this.iconConfig.internalIcons && this.iconConfig.internalIcons[value]) {
          return this.iconConfig.internalIcons[value];
        }

        return value;
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"icon",class:[_vm.newType, _vm.size]},[(!_vm.useIconComponent)?_c('i',{class:[_vm.newPack, _vm.newIcon, _vm.newCustomSize, _vm.customClass]}):_c(_vm.useIconComponent,{tag:"component",class:[_vm.customClass],attrs:{"icon":[_vm.newPack, _vm.newIcon],"size":_vm.newCustomSize}})],1)};
  var __vue_staticRenderFns__ = [];

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Icon = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  //
  var script$1 = {
    name: 'BModal',
    directives: {
      trapFocus: directive
    },
    // deprecated, to replace with default 'value' in the next breaking change
    model: {
      prop: 'active',
      event: 'update:active'
    },
    props: {
      active: Boolean,
      component: [Object, Function, String],
      content: [String, Array],
      programmatic: Boolean,
      props: Object,
      events: Object,
      width: {
        type: [String, Number],
        default: 960
      },
      hasModalCard: Boolean,
      animation: {
        type: String,
        default: 'zoom-out'
      },
      canCancel: {
        type: [Array, Boolean],
        default: function _default() {
          return config.defaultModalCanCancel;
        }
      },
      onCancel: {
        type: Function,
        default: function _default() {}
      },
      scroll: {
        type: String,
        default: function _default() {
          return config.defaultModalScroll ? config.defaultModalScroll : 'clip';
        },
        validator: function validator(value) {
          return ['clip', 'keep'].indexOf(value) >= 0;
        }
      },
      fullScreen: Boolean,
      trapFocus: {
        type: Boolean,
        default: function _default() {
          return config.defaultTrapFocus;
        }
      },
      autoFocus: {
        type: Boolean,
        default: function _default() {
          return config.defaultAutoFocus;
        }
      },
      customClass: String,
      ariaRole: {
        type: String,
        validator: function validator(value) {
          return ['dialog', 'alertdialog'].indexOf(value) >= 0;
        }
      },
      ariaModal: Boolean,
      ariaLabel: {
        type: String,
        validator: function validator(value) {
          return Boolean(value);
        }
      },
      destroyOnHide: {
        type: Boolean,
        default: true
      }
    },
    data: function data() {
      return {
        isActive: this.active || false,
        savedScrollTop: null,
        newWidth: typeof this.width === 'number' ? this.width + 'px' : this.width,
        animating: !this.active,
        destroyed: !this.active
      };
    },
    computed: {
      cancelOptions: function cancelOptions() {
        return typeof this.canCancel === 'boolean' ? this.canCancel ? config.defaultModalCanCancel : [] : this.canCancel;
      },
      showX: function showX() {
        return this.cancelOptions.indexOf('x') >= 0;
      },
      customStyle: function customStyle() {
        if (!this.fullScreen) {
          return {
            maxWidth: this.newWidth
          };
        }

        return null;
      }
    },
    watch: {
      active: function active(value) {
        this.isActive = value;
      },
      isActive: function isActive(value) {
        var _this = this;

        if (value) this.destroyed = false;
        this.handleScroll();
        this.$nextTick(function () {
          if (value && _this.$el && _this.$el.focus && _this.autoFocus) {
            _this.$el.focus();
          }
        });
      }
    },
    methods: {
      handleScroll: function handleScroll() {
        if (typeof window === 'undefined') return;

        if (this.scroll === 'clip') {
          if (this.isActive) {
            document.documentElement.classList.add('is-clipped');
          } else {
            document.documentElement.classList.remove('is-clipped');
          }

          return;
        }

        this.savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;

        if (this.isActive) {
          document.body.classList.add('is-noscroll');
        } else {
          document.body.classList.remove('is-noscroll');
        }

        if (this.isActive) {
          document.body.style.top = "-".concat(this.savedScrollTop, "px");
          return;
        }

        document.documentElement.scrollTop = this.savedScrollTop;
        document.body.style.top = null;
        this.savedScrollTop = null;
      },

      /**
      * Close the Modal if canCancel and call the onCancel prop (function).
      */
      cancel: function cancel(method) {
        if (this.cancelOptions.indexOf(method) < 0) return;
        this.$emit('cancel', arguments);
        this.onCancel.apply(null, arguments);
        this.close();
      },

      /**
      * Call the onCancel prop (function).
      * Emit events, and destroy modal if it's programmatic.
      */
      close: function close() {
        var _this2 = this;

        this.$emit('close');
        this.$emit('update:active', false); // Timeout for the animation complete before destroying

        if (this.programmatic) {
          this.isActive = false;
          setTimeout(function () {
            _this2.$destroy();

            removeElement(_this2.$el);
          }, 150);
        }
      },

      /**
      * Keypress event that is bound to the document.
      */
      keyPress: function keyPress(_ref) {
        var key = _ref.key;
        if (this.isActive && (key === 'Escape' || key === 'Esc')) this.cancel('escape');
      },

      /**
      * Transition after-enter hook
      */
      afterEnter: function afterEnter() {
        this.animating = false;
        this.$emit('after-enter');
      },

      /**
      * Transition before-leave hook
      */
      beforeLeave: function beforeLeave() {
        this.animating = true;
      },

      /**
      * Transition after-leave hook
      */
      afterLeave: function afterLeave() {
        if (this.destroyOnHide) {
          this.destroyed = true;
        }

        this.$emit('after-leave');
      }
    },
    created: function created() {
      if (typeof window !== 'undefined') {
        document.addEventListener('keyup', this.keyPress);
      }
    },
    beforeMount: function beforeMount() {
      // Insert the Modal component in body tag
      // only if it's programmatic
      this.programmatic && document.body.appendChild(this.$el);
    },
    mounted: function mounted() {
      if (this.programmatic) this.isActive = true;else if (this.isActive) this.handleScroll();
    },
    beforeDestroy: function beforeDestroy() {
      if (typeof window !== 'undefined') {
        document.removeEventListener('keyup', this.keyPress); // reset scroll

        document.documentElement.classList.remove('is-clipped');
        var savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
        document.body.classList.remove('is-noscroll');
        document.documentElement.scrollTop = savedScrollTop;
        document.body.style.top = null;
      }
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.animation},on:{"after-enter":_vm.afterEnter,"before-leave":_vm.beforeLeave,"after-leave":_vm.afterLeave}},[(!_vm.destroyed)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"},{name:"trap-focus",rawName:"v-trap-focus",value:(_vm.trapFocus),expression:"trapFocus"}],staticClass:"modal is-active",class:[{'is-full-screen': _vm.fullScreen}, _vm.customClass],attrs:{"tabindex":"-1","role":_vm.ariaRole,"aria-label":_vm.ariaLabel,"aria-modal":_vm.ariaModal}},[_c('div',{staticClass:"modal-background",on:{"click":function($event){return _vm.cancel('outside')}}}),_c('div',{staticClass:"animation-content",class:{ 'modal-content': !_vm.hasModalCard },style:(_vm.customStyle)},[(_vm.component)?_c(_vm.component,_vm._g(_vm._b({tag:"component",attrs:{"can-cancel":_vm.canCancel},on:{"close":_vm.close}},'component',_vm.props,false),_vm.events)):(_vm.content)?[_c('div',{domProps:{"innerHTML":_vm._s(_vm.content)}})]:_vm._t("default",null,{"canCancel":_vm.canCancel,"close":_vm.close}),(_vm.showX)?_c('button',{directives:[{name:"show",rawName:"v-show",value:(!_vm.animating),expression:"!animating"}],staticClass:"modal-close is-large",attrs:{"type":"button"},on:{"click":function($event){return _vm.cancel('x')}}}):_vm._e()],2)]):_vm._e()])};
  var __vue_staticRenderFns__$1 = [];

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = undefined;
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Modal = normalizeComponent_1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      undefined,
      undefined
    );

  var script$2 = {
    name: 'BDialog',
    components: _defineProperty({}, Icon.name, Icon),
    directives: {
      trapFocus: directive
    },
    extends: Modal,
    props: {
      title: String,
      message: [String, Array],
      icon: String,
      iconPack: String,
      hasIcon: Boolean,
      type: {
        type: String,
        default: 'is-primary'
      },
      size: String,
      confirmText: {
        type: String,
        default: function _default() {
          return config.defaultDialogConfirmText ? config.defaultDialogConfirmText : 'OK';
        }
      },
      cancelText: {
        type: String,
        default: function _default() {
          return config.defaultDialogCancelText ? config.defaultDialogCancelText : 'Cancel';
        }
      },
      hasInput: Boolean,
      // Used internally to know if it's prompt
      inputAttrs: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      onConfirm: {
        type: Function,
        default: function _default() {}
      },
      closeOnConfirm: {
        type: Boolean,
        default: true
      },
      container: {
        type: String,
        default: function _default() {
          return config.defaultContainerElement;
        }
      },
      focusOn: {
        type: String,
        default: 'confirm'
      },
      trapFocus: {
        type: Boolean,
        default: function _default() {
          return config.defaultTrapFocus;
        }
      },
      ariaRole: {
        type: String,
        validator: function validator(value) {
          return ['dialog', 'alertdialog'].indexOf(value) >= 0;
        }
      },
      ariaModal: Boolean
    },
    data: function data() {
      var prompt = this.hasInput ? this.inputAttrs.value || '' : '';
      return {
        prompt: prompt,
        isActive: false,
        validationMessage: ''
      };
    },
    computed: {
      dialogClass: function dialogClass() {
        return [this.size, {
          'has-custom-container': this.container !== null
        }];
      },

      /**
      * Icon name (MDI) based on the type.
      */
      iconByType: function iconByType() {
        switch (this.type) {
          case 'is-info':
            return 'information';

          case 'is-success':
            return 'check-circle';

          case 'is-warning':
            return 'alert';

          case 'is-danger':
            return 'alert-circle';

          default:
            return null;
        }
      },
      showCancel: function showCancel() {
        return this.cancelOptions.indexOf('button') >= 0;
      }
    },
    methods: {
      /**
      * If it's a prompt Dialog, validate the input.
      * Call the onConfirm prop (function) and close the Dialog.
      */
      confirm: function confirm() {
        var _this = this;

        if (this.$refs.input !== undefined) {
          if (!this.$refs.input.checkValidity()) {
            this.validationMessage = this.$refs.input.validationMessage;
            this.$nextTick(function () {
              return _this.$refs.input.select();
            });
            return;
          }
        }

        this.$emit('confirm', this.prompt);
        this.onConfirm(this.prompt, this);
        if (this.closeOnConfirm) this.close();
      },

      /**
      * Close the Dialog.
      */
      close: function close() {
        var _this2 = this;

        this.isActive = false; // Timeout for the animation complete before destroying

        setTimeout(function () {
          _this2.$destroy();

          removeElement(_this2.$el);
        }, 150);
      }
    },
    beforeMount: function beforeMount() {
      var _this3 = this;

      // Insert the Dialog component in the element container
      if (typeof window !== 'undefined') {
        this.$nextTick(function () {
          var container = document.querySelector(_this3.container) || document.body;
          container.appendChild(_this3.$el);
        });
      }
    },
    mounted: function mounted() {
      var _this4 = this;

      this.isActive = true;

      if (typeof this.inputAttrs.required === 'undefined') {
        this.$set(this.inputAttrs, 'required', true);
      }

      this.$nextTick(function () {
        // Handle which element receives focus
        if (_this4.hasInput) {
          _this4.$refs.input.focus();
        } else if (_this4.focusOn === 'cancel' && _this4.showCancel) {
          _this4.$refs.cancelButton.focus();
        } else {
          _this4.$refs.confirmButton.focus();
        }
      });
    }
  };

  /* script */
  const __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.animation}},[(_vm.isActive)?_c('div',{directives:[{name:"trap-focus",rawName:"v-trap-focus",value:(_vm.trapFocus),expression:"trapFocus"}],staticClass:"dialog modal is-active",class:_vm.dialogClass,attrs:{"role":_vm.ariaRole,"aria-modal":_vm.ariaModal}},[_c('div',{staticClass:"modal-background",on:{"click":function($event){return _vm.cancel('outside')}}}),_c('div',{staticClass:"modal-card animation-content"},[(_vm.title)?_c('header',{staticClass:"modal-card-head"},[_c('p',{staticClass:"modal-card-title"},[_vm._v(_vm._s(_vm.title))])]):_vm._e(),_c('section',{staticClass:"modal-card-body",class:{ 'is-titleless': !_vm.title, 'is-flex': _vm.hasIcon }},[_c('div',{staticClass:"media"},[(_vm.hasIcon && (_vm.icon || _vm.iconByType))?_c('div',{staticClass:"media-left"},[_c('b-icon',{attrs:{"icon":_vm.icon ? _vm.icon : _vm.iconByType,"pack":_vm.iconPack,"type":_vm.type,"both":!_vm.icon,"size":"is-large"}})],1):_vm._e(),_c('div',{staticClass:"media-content"},[_c('p',[(_vm.$slots.default)?[_vm._t("default")]:[_c('div',{domProps:{"innerHTML":_vm._s(_vm.message)}})]],2),(_vm.hasInput)?_c('div',{staticClass:"field"},[_c('div',{staticClass:"control"},[(((_vm.inputAttrs).type)==='checkbox')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.prompt),expression:"prompt"}],ref:"input",staticClass:"input",class:{ 'is-danger': _vm.validationMessage },attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.prompt)?_vm._i(_vm.prompt,null)>-1:(_vm.prompt)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.confirm($event)},"change":function($event){var $$a=_vm.prompt,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.prompt=$$a.concat([$$v]));}else{$$i>-1&&(_vm.prompt=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.prompt=$$c;}}}},'input',_vm.inputAttrs,false)):(((_vm.inputAttrs).type)==='radio')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.prompt),expression:"prompt"}],ref:"input",staticClass:"input",class:{ 'is-danger': _vm.validationMessage },attrs:{"type":"radio"},domProps:{"checked":_vm._q(_vm.prompt,null)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.confirm($event)},"change":function($event){_vm.prompt=null;}}},'input',_vm.inputAttrs,false)):_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.prompt),expression:"prompt"}],ref:"input",staticClass:"input",class:{ 'is-danger': _vm.validationMessage },attrs:{"type":(_vm.inputAttrs).type},domProps:{"value":(_vm.prompt)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.confirm($event)},"input":function($event){if($event.target.composing){ return; }_vm.prompt=$event.target.value;}}},'input',_vm.inputAttrs,false))]),_c('p',{staticClass:"help is-danger"},[_vm._v(_vm._s(_vm.validationMessage))])]):_vm._e()])])]),_c('footer',{staticClass:"modal-card-foot"},[(_vm.showCancel)?_c('button',{ref:"cancelButton",staticClass:"button",on:{"click":function($event){return _vm.cancel('button')}}},[_vm._v(_vm._s(_vm.cancelText))]):_vm._e(),_c('button',{ref:"confirmButton",staticClass:"button",class:_vm.type,on:{"click":_vm.confirm}},[_vm._v(_vm._s(_vm.confirmText))])])])]):_vm._e()])};
  var __vue_staticRenderFns__$2 = [];

    /* style */
    const __vue_inject_styles__$2 = undefined;
    /* scoped */
    const __vue_scope_id__$2 = undefined;
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Dialog = normalizeComponent_1(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      undefined,
      undefined
    );

  var use = function use(plugin) {
    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.use(plugin);
    }
  };
  var registerComponent = function registerComponent(Vue, component) {
    Vue.component(component.name, component);
  };
  var registerComponentProgrammatic = function registerComponentProgrammatic(Vue, property, component) {
    if (!Vue.prototype.$buefy) Vue.prototype.$buefy = {};
    Vue.prototype.$buefy[property] = component;
  };

  var localVueInstance;

  function open(propsData) {
    var slot;

    if (Array.isArray(propsData.message)) {
      slot = propsData.message;
      delete propsData.message;
    }

    var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance;
    var DialogComponent = vm.extend(Dialog);
    var component = new DialogComponent({
      el: document.createElement('div'),
      propsData: propsData
    });

    if (slot) {
      component.$slots.default = slot;
      component.$forceUpdate();
    }

    if (!config.defaultProgrammaticPromise) {
      return component;
    } else {
      return new Promise(function (resolve) {
        component.$on('confirm', function (event) {
          return resolve({
            result: event || true,
            dialog: component
          });
        });
        component.$on('cancel', function () {
          return resolve({
            result: false,
            dialog: component
          });
        });
      });
    }
  }

  var DialogProgrammatic = {
    alert: function alert(params) {
      if (typeof params === 'string') {
        params = {
          message: params
        };
      }

      var defaultParam = {
        canCancel: false
      };
      var propsData = merge(defaultParam, params);
      return open(propsData);
    },
    confirm: function confirm(params) {
      var defaultParam = {};
      var propsData = merge(defaultParam, params);
      return open(propsData);
    },
    prompt: function prompt(params) {
      var defaultParam = {
        hasInput: true
      };
      var propsData = merge(defaultParam, params);
      return open(propsData);
    }
  };
  var Plugin = {
    install: function install(Vue) {
      localVueInstance = Vue;
      registerComponent(Vue, Dialog);
      registerComponentProgrammatic(Vue, 'dialog', DialogProgrammatic);
    }
  };
  use(Plugin);

  exports.BDialog = Dialog;
  exports.DialogProgrammatic = DialogProgrammatic;
  exports.default = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
