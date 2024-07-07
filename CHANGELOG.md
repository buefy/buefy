# Buefy Changelog

## Buefy-next 0.1.4

### Fixes
* Fix [256](https://github.com/ntohq/buefy-next/issues/256) Added missing import statement for BIcon in MenuList
* Fix [19](https://github.com/ntohq/buefy-next/issues/19) Update MenuItem's model Prop to Work with Vue3
* Fix [34](https://github.com/ntohq/buefy-next/issues/34), [35](https://github.com/ntohq/buefy-next/issues/35) Add Missing Prop and Import Statement to the Colorpicker
* Fix [40](https://github.com/ntohq/buefy-next/issues/40) Added missing import statement for BIcon in BTag component
* Fix [24](https://github.com/ntohq/buefy-next/issues/24) Added missing Progress import statements to Message component
* Fix [241](https://github.com/ntohq/buefy-next/pull/241) Update import path for ClockpickerFace and NotificationNotice
* Fix [182](https://github.com/ntohq/buefy-next/issues/182) Set modal's event prop's default value
* Fix [177](https://github.com/ntohq/buefy-next/issues/177) Remove use from all components
* Fix [178](https://github.com/ntohq/buefy-next/issues/178) Remove unnecessary prop `style` causing console warning

## Buefy-next 0.1.3

Buefy-next 0.1.3 includes all the relevant changes until Buefy 0.9.29.

### Breaking changes

* You can no longer install `@ntohq/buefy-next` directly from the GitHub repository.
  You can try developer releases instead.
  See <https://github.com/ntohq/buefy-next/pkgs/npm/buefy-next>

### New features

* The following components introduce a new prop `compat-fallthrough`, which determines whether the `class`, `style`, and `id` attributes are applied to the root element or the underlying element.
  If `compat-fallthrough` is `true`, they are applied to the root element, which is compatible with Buefy for Vue 2.
  The default value can be controlled by the `defaultCompatFallthrough` config option (`true` by default).
  [#16](https://github.com/ntohq/buefy-next/issues/16)

  * `BAutocomplete`:

    If `compat-fallthrough` is `true`, the attributes fall through to the root `<div>` element, otherwise to the underlying `BInput`.

  * `BBreadcrumbItem`:

    If `compat-fallthrough` is `true`, the attributes fall through to the root `<li>` element, otherwise to the underlying tag.

  * `BClockpicker`:

    If `compat-fallthrough` is `true`, the attributes fall through to the root `<div>` element, otherwise to the underlying `BInput`.

  * `BDatepicker`:

    If `compat-fallthrough` is `true`, the attributes fall through to the root `<div>` element, otherwise to the underlying `BInput`.

  * `BInput`:

    If `compat-fallthrough` is `true`, the attributes fall through to the root `<div>` element, otherwise to either of `<input>` or `<textarea>` element.

  * `BMenuItem`:

    If `compat-fallthrough` is `true`, the attributes fall through to the root `<li>` element, otherwise to the underlying tag.

  * `BNavbarDropdown`:

    If `compat-fallthrough` is `true`, the attributes fall through to the root `<div>` element, otherwise to the underlying tag.

  * `BNumberinput`:

    If `compat-fallthrough` is `true`, the attributes fall through to the root `<div>` element, otherwise to the underlying `<b-input>` component.

  * `BSelect`:

    If `compat-fallthrough` is `true`, the attributes fall through to the root `<div>` element, otherwise to the underlying `<select>` element.

  * `BSliderThumb`:

    If `compat-fallthrough` is `true`, the attributes fall through to the root `<div>` element, otherwise to the inner `<div>` element.

  * `BTable`:

    If `compat-fallthrough` is `true`, the attributes fall through to the root `<div>` element, otherwise to the underlying pagination components.

  * `BTaginput`:

    If `compat-fallthrough` is `true`, the attributes fall through to the root `<div>` element, otherwise to the underlying `BAutocomplete` component.

  * `BTimepicker`:

    If `compat-fallthrough` is `true`, the attributes fall through to the root `<div>` element, otherwise to the underlying `BInput`.

  * `BUpload`:

    If `compat-fallthrough` is `true`, the attributes fall through to the root `<label>` element, otherwise to the underlying `<input>` element.

* `BCarouselItem`, `BStepItem`, and `BTabItem` introduce a new prop `order`, which determines the order of each child item.
  By default, the order of each child item is determined by the sequence in which each child item is mounted.
  If any child item is unmounted and mounted again, the order may be changed (**BREAKING CHANGE**).
  You have to give explicit `order` if you want to maintain the order of child items consistent.

### Fixes

* Fix [#163](https://github.com/ntohq/buefy-next/pull/163) Missing `BMenuList` in production (thanks [@dword-design](https://github.com/dword-design))
* Fix [#124](https://github.com/ntohq/buefy-next/pull/124) Progress bar in `BNotification` component was not showing, when programmatically opened (thanks [@zhanghengxin](https://github.com/zhanghengxin))
* Fix [#131](https://github.com/ntohq/buefy-next/issues/131) Typo in the `copyAppContext` helper function.
  Programmatically opened components may be affected; e.g., `BModal`.
* Fix [#153](https://github.com/ntohq/buefy-next/issues/153) `useI18n` did not work in a setup script within the context of a programmatically opened `BModal`
* Fix [#16](https://github.com/ntohq/buefy-next/issues/16) Vue Compat: deprecation INSTANCE_ATTRS_CLASS_STYLE
* Fix [#197](https://github.com/ntohq/buefy-next/pull/197) Migrated `BSkeleton` to Vue 3 functional component as function (thanks [@hirokiky](https://github.com/hirokiky))
* Fix [#187](https://github.com/ntohq/buefy-next/issues/187) `BTabs` did not work in SSR due to `window` access
* Fix [#194](https://github.com/ntohq/buefy-next/issues/194) `_unregisterItem` of `ProviderParentMixin` would not work if child items did not have value.
  `BCarousel`, `BSteps`, `BTabs` are affected.

## Buefy-next 0.1.2

### Fixes

* Fix [#5](https://github.com/ntohq/buefy-next/issues/5) Horizontal `BField` wrapped a simple text element with an extra `BField`
* Fix [#8](https://github.com/ntohq/buefy-next/issues/8) `BTable` had an unexpected `tabindex` attribute containing "false"
* Fix [#20](https://github.com/ntohq/buefy-next/issues/20) `BMenuList` crashed with "TypeError: slots.default is not a function"
* Fix [#18](https://github.com/ntohq/buefy-next/issues/18) `BFieldBody` crashed with "TypeError: this.$slots.default is not a function".
  `BField` may be affected.
* Fix [#29](https://github.com/ntohq/buefy-next/issues/29) Burger menu of `BNavbar` had an unexpected `aria-expanded` attribute with false
* Fix [#28](https://github.com/ntohq/buefy-next/issues/28) `BNavbar` crashed with "TypeError: this.$slots.brand is not a function"
* Fix [#36](https://github.com/ntohq/buefy-next/issues/36) `BFieldBody` could not resolve `BField`.
  `BField` may be affected.
* Fix [#44](https://github.com/ntohq/buefy-next/issues/44) `BSlotComponent` crashed with "TypeError: Cannot read properties of undefined (reading 'default')".
  Components using `BSlotComponent` may be affected; i.e., `BTable`, `BTabs`.
* Fix [#33](https://github.com/ntohq/buefy-next/issues/33) Thumb of `BSlider` had an unexpected `aria-disabled` attribute with "false"
* Fix [#45](https://github.com/ntohq/buefy-next/issues/45) `BSlotComponent` did not handle update events from underlying component.
  `BTabItem`s with a custom header slot may be affected.
* Fix [#42](https://github.com/ntohq/buefy-next/issues/42) `BTabs` did not respond to key interactions
* Fix [#39](https://github.com/ntohq/buefy-next/issues/39) `BPaginationButton` had ab unexpected `aria-current` attribute with "false"
* Fix [#26](https://github.com/ntohq/buefy-next/issues/26) `BCollapse` warned a non-function value for the default slot
* Fix [#32](https://github.com/ntohq/buefy-next/issues/32), [#101](https://github.com/ntohq/buefy-next/issues/101) No plugins were available on programmatically opened components: `BDialog`, `BLoading`, `BModal`, `BNotification`, `BSnackbar`, and `BToast`

## Buefy-next pre 0.1.2

### Breaking changes

* **Vue.js** 3.0+ is now the minimum required version
* `v-model` binding of the following components conform to Vue 3; i.e., `value` → `modelValue`, `@input` → `@update:modelValue`. See also [MIGRATION-NOTE.md](./MIGRATION-NOTE.md#v-model-binding).
    * `Autocomplete` ([#8d9e800adb23a01db0dbffcefad48fab794ac690](https://github.com/buefy/buefy/commit/8d9e800adb23a01db0dbffcefad48fab794ac690))
    * `Carousel` ([#b2a8d88db86bfc0a75f48624bbd5f96d82f9f559](https://github.com/buefy/buefy/commit/b2a8d88db86bfc0a75f48624bbd5f96d82f9f559))
    * `CarouselList` ([#16a2e777010db6c714f3694e03682ce7e74d2be8](https://github.com/buefy/buefy/commit/16a2e777010db6c714f3694e03682ce7e74d2be8))
    * `Checkbox` (`CheckRadioMixin`) ([#c8aad46a709e7f99bc061ba28f2e650c0be223ca](https://github.com/buefy/buefy/commit/c8aad46a709e7f99bc061ba28f2e650c0be223ca))
    * `Clockpicker` (`TimepickerMixin`) ([#33e4086186446abd6f7ed82fe86b5e029090adb3](https://github.com/buefy/buefy/commit/33e4086186446abd6f7ed82fe86b5e029090adb3))
    * `Collapse` used to have a custom `v-model` binding to `open` which is renamed to `modelValue` ([#690d28996dd2eecc1e5059f5ef349351c017f533](https://github.com/buefy/buefy/commit/690d28996dd2eecc1e5059f5ef349351c017f533))
    * `Colorpicker` ([#7011781d25761744468220ae4f63fdba1cb93120](https://github.com/buefy/buefy/commit/7011781d25761744468220ae4f63fdba1cb93120))
    * `Datepicker` ([#c99a8dd0d4cdc5ae27f5eb0677d7a4e80c45bc1c](https://github.com/buefy/buefy/commit/c99a8dd0d4cdc5ae27f5eb0677d7a4e80c45bc1c))
    * `Datetimepicker` ([#c3b8668d300f4d607b1d03973e72e406914ef404](https://github.com/buefy/buefy/commit/c3b8668d300f4d607b1d03973e72e406914ef404))
    * `Dropdown` ([#a18bf8d12d5245427473ad73d51bc7f72ac13a87](https://github.com/buefy/buefy/commit/a18bf8d12d5245427473ad73d51bc7f72ac13a87))
    * `Input` ([#f4f69bae0eef7a604d67e2be059771e929073919](https://github.com/buefy/buefy/commit/f4f69bae0eef7a604d67e2be059771e929073919))
    * `Loading` used to have a custom `v-model` binding to `active` which is renamed to `modelValue` ([#bf6e9cd680298b1a8b572bdb1d742f9ac0eca769](https://github.com/buefy/buefy/commit/bf6e9cd680298b1a8b572bdb1d742f9ac0eca769))
    * `Message` (`MessageMixin`) used to have a custom `v-model` binding to `active` which is renamed to `modelValue` ([#d3ec84f1e5f5abef980d2739fe079f2241a71b77](https://github.com/buefy/buefy/commit/d3ec84f1e5f5abef980d2739fe079f2241a71b77))
    * `Modal` used to have a custom `v-model` binding to `active` which is renamed to `modelValue` ([#8b05481a20ec8bccb03f1c98ad5556442e79258b](https://github.com/buefy/buefy/commit/8b05481a20ec8bccb03f1c98ad5556442e79258b))
    * `Navbar` used to have a custom `v-model` binding to `active` which is renamed to `modelValue` ([#5bc62ffbeba831f60fe1b755b2e5fe7c5e25d3ed](https://github.com/buefy/buefy/commit/5bc62ffbeba831f60fe1b755b2e5fe7c5e25d3ed))
    * `Numberinput` ([#768a9573fd1b1eab90b6404ea922374e3bfa327b](https://github.com/buefy/buefy/commit/768a9573fd1b1eab90b6404ea922374e3bfa327b))
    * `Pagination` used to have a custom `v-model` binding to `current` which is renamed to `modelValue` ([#33aaf4e15270d24116e0c133868992cf6ae2ca99](https://github.com/buefy/buefy/commit/33aaf4e15270d24116e0c133868992cf6ae2ca99))
    * `Rate` ([#047536cd47d667a51f0d2b02eabf23a128f99c41](https://github.com/buefy/buefy/commit/047536cd47d667a51f0d2b02eabf23a128f99c41))
    * `Select` ([#5b103a54c58fe2aad4240e1adfa64dacba35f66b](https://github.com/buefy/buefy/commit/5b103a54c58fe2aad4240e1adfa64dacba35f66b))
    * `Sidebar` used to have a custom `v-model` binding to `open` which is renamed to `modelValue` ([#8b55d7c9d1863b12a2cbc98b0601dc865b56d3e7](https://github.com/buefy/buefy/commit/8b55d7c9d1863b12a2cbc98b0601dc865b56d3e7))
    * `Slider` (`SliderThumb`) ([#a18bf8d12d5245427473ad73d51bc7f72ac13a87](https://github.com/buefy/buefy/commit/a18bf8d12d5245427473ad73d51bc7f72ac13a87))
    * `Steps` (`TabbedMixin`) ([#defe37960d284e6de81d3e273e1a18c33b12e2a5](https://github.com/buefy/buefy/commit/defe37960d284e6de81d3e273e1a18c33b12e2a5))
    * `Switch` ([#1a878a9f7b9851e610329d1f82208d8103505cb2](https://github.com/buefy/buefy/commit/1a878a9f7b9851e610329d1f82208d8103505cb2))
    * `Tabs` (`TabbedMixin`) ([#defe37960d284e6de81d3e273e1a18c33b12e2a5](https://github.com/buefy/buefy/commit/defe37960d284e6de81d3e273e1a18c33b12e2a5))
    * `Taginput` ([#9e29ecc11439f223a1f8f2d140a495680df14903](https://github.com/buefy/buefy/commit/9e29ecc11439f223a1f8f2d140a495680df14903))
    * `Upload` ([#6f8952ec1389b1f74683f69fb04aac4beae62140](https://github.com/buefy/buefy/commit/6f8952ec1389b1f74683f69fb04aac4beae62140))
* A brand-new Vue app is created to programmatically mount the following components.
  **Any plugins including Buefy itself cannot be used** in a programmatically mounted component.
  See also [MIGRATION-NOTE.md](./MIGRATION-NOTE.md#component-alone-cannot-mount-itself).
    * `Dialog` ([#a415f3aef052fdc39c5322372ae0f7d8665c6e9f](https://github.com/buefy/buefy/commit/a415f3aef052fdc39c5322372ae0f7d8665c6e9f))
    * `Loading` ([#bf6e9cd680298b1a8b572bdb1d742f9ac0eca769](https://github.com/buefy/buefy/commit/bf6e9cd680298b1a8b572bdb1d742f9ac0eca769))
    * `Modal` ([#8b05481a20ec8bccb03f1c98ad5556442e79258b](https://github.com/buefy/buefy/commit/8b05481a20ec8bccb03f1c98ad5556442e79258b))
    * `Notification` ([#82136338ca6cdf7be3b4b2d134e457074f5ffcb1](https://github.com/buefy/buefy/commit/82136338ca6cdf7be3b4b2d134e457074f5ffcb1))
    * `Snackbar` ([#43193759a7d88d2ba04407fb8829f0e9196ddf83](https://github.com/buefy/buefy/commit/43193759a7d88d2ba04407fb8829f0e9196ddf83))
    * `Toast` ([#c8643f56d1ecd775e8746f24d8c0ac81dd1df505](https://github.com/buefy/buefy/commit/c8643f56d1ecd775e8746f24d8c0ac81dd1df505))
* Indexing of `StepItem`, and `CarouselItem` is changed.
  Indexes in the default slot are no longer respected.
  They are indexed in the order of creation instead.
  You have to specify the `order` prop to keep the ordering of items.
  See also [MIGRATION-NOTE.md](./MIGRATION-NOTE.md#component-cannot-be-obtained-from-a-slot).
  ([#defe37960d284e6de81d3e273e1a18c33b12e2a5](https://github.com/buefy/buefy/commit/defe37960d284e6de81d3e273e1a18c33b12e2a5))

### Fixes

* A lot of Vue 3 related errors are fixed.
  Please refer to [MIGRATION-NOTE.md](./MIGRATION-NOTE.md) for more details.
* A lot of ESLint errors, and warnings are fixed, as the ESLint rule version has been upgraded.
* The type of the `cancelText` prop of `Snackbar` is fixed. It used to be `String | null`, and ended up with a type error. It is now `String`.

## 0.9.29

### Fixes

* Fix [#4017](https://github.com/buefy/buefy/issues/4017) `Tooltip` - AbortController is not defined in SSR mode (Nuxt)
* Fix [#4018](https://github.com/buefy/buefy/issues/4018) Browser tab froze when `Field` with both `grouped` and `horizontal` props `true` got a validation error. However, there is another issue that validation errors cannot be reset once they are set if `grouped` and `horizontal` are combined.

## 0.9.28

### New features

* [#3862](https://github.com/buefy/buefy/issues/3862) Expose `isActiveDetailRow` method in the default scoped slot props of table column (thanks @OrestHk)
* [#3863](https://github.com/buefy/buefy/issues/3863) Add `active` event emitted when dropdown turns active/inactive (thanks @daniil4udo)

### Fixes

* Fix [#3961](https://github.com/buefy/buefy/issues/3961) Dropdown with "hover" trigger incorrectly rendered on mobile devices
* Fix [#3963](https://github.com/buefy/buefy/issues/3963) No dropdown showed up if the data array was empty and only the footer slot was registered (thanks @GMartigny)
* Fix [#3971](https://github.com/buefy/buefy/issues/3971) Problems with table headers and dates due to 0.9.25 → 0.9.27 changes
* Fix [#3971](https://github.com/buefy/buefy/issues/3971) Percentage width on table columns doubly applied
* Fix [#3991](https://github.com/buefy/buefy/pull/3991) Potential call after unmount in the following components (thanks @Arooba-git):
  * `NumberInput`
  * `Sidebar`
* Fix [#3991](https://github.com/buefy/buefy/pull/3991) Potential listener leaks in `SliderThumb` (thanks @Arooba-git)
* Fix [#4000](https://github.com/buefy/buefy/pull/4000) Potential call after unmount in the following components (thanks @Arooba-git):
  * `Autocomplete`
  * `ColorpickerHSLRepresentationSquare`
  * `ColorpickerHSLRepresentationTriangle`
  * `Dropdown`
  * `Slider`
  * `Taginput`
  * `Tooltip`

## 0.9.27

### New features

* Add `render-on-mount` prop to modal
* Add `startLoading` and `stopLoading` methods to dialog (thanks @zhanghengxin)
* Add drag-and-drop support to table for mobile devices

### Fixes

* Fix dropdown position when autocompleted and appended to body (thanks @francisfontoura)
* Fix b-button nativeType for tag 'input' (thanks @mistersaal)
* Fix [#3887](https://github.com/buefy/buefy/issues/3887) Invalid type error for tags
* Fix [#3872](https://github.com/buefy/buefy/issues/3872) SVG icons too large in Safari
* Fix [#3753](https://github.com/buefy/buefy/issues/3753) and [#3065](https://github.com/buefy/buefy/issues/3065) Tooltip Glitchy
* Fix [#3726](https://github.com/buefy/buefy/issues/3726) Horizontal scrollable table ignores column width
* Fix [#2886](https://github.com/buefy/buefy/issues/2886) and [#3034](https://github.com/buefy/buefy/issues/3034) sort icons on Table overlapped next columns
* Fix [#2621](https://github.com/buefy/buefy/issues/2621) Modal: Display close button in mobile version
* Fix [#2681](https://github.com/buefy/buefy/issues/2681) Table: customSort does not work when sortMultiple is enabled
* Fix [#3939](https://github.com/buefy/buefy/issues/3939) unnecessary component duplication in navbar-item
* Fix [#3074](https://github.com/buefy/buefy/issues/3074) Tag with close in tag list produces unwanted offset

## 0.9.26

Withdrawn due to missing `dist` folder in the package.

## 0.9.25

Include updates on documentation only.

## 0.9.24

### New features

* Add `mobile-modal` prop to clockpicker (thanks @julzELO)
* Add `input-id` prop to checkbox (thanks @ajomuch92)
* Add `nearby-month-days` prop to datetimepicker (thanks @gmercey)

### Fixes

* Fix [#3826](https://github.com/buefy/buefy/issues/3826) Disabled radio button has cursor 'pointer' (thanks @amal-qb)
* Fix [#3838](https://github.com/buefy/buefy/issues/3838) Sidebar image not displaying in the documentation (thanks @amal-qb)
* Fix [#3780](https://github.com/buefy/buefy/issues/3780) Expired and broken websites in expo page (thanks @amal-qb)
* Fix [#3698](https://github.com/buefy/buefy/issues/3698) Number input null issue fix (thanks @amal-qb and @navedqb)
* Fix [#3782](https://github.com/buefy/buefy/issues/3782) Numberinput: fix long-press breaking when disabled (thanks @SylvainMarty)
* Fix [#3802](https://github.com/buefy/buefy/issues/3802) Full width sidebar doesn't have a close button (thanks @amal-qb)
* Fix [#3876](https://github.com/buefy/buefy/issues/3876) Datepicker keyboard navigation causes browser hangup
* Fix [#3884](https://github.com/buefy/buefy/issues/3884) Validation error on Input not reset by programmatically correcting the value
* Fix [#3883](https://github.com/buefy/buefy/issues/3883) Validation error on Field with multiple child components (addons) persists after value is corrected

## 0.9.23

### Breaking changes

* Drop IE11 support

### New features

* Add `trigger-tabindex` prop to dropdown (thanks @Spacarar)
* Pass Dropdown active state to DatePicker trigger slot (thanks @GMartigny)
* Add `custom-content-class` prop to modal (thanks @ajomuch92)
* Add `keep-open` prop to taginput (thanks @CobraClutch)

### Fixes

* Fix [#3786](https://github.com/buefy/buefy/issues/3786) the calculation of the checkIfReachedTheEndOfScroll when footer is present and using arrow keys to navigate down the list
* Fix scope message/notification auto-close progress style (thanks @gmercey)
* Fix [#3433](https://github.com/buefy/buefy/issues/3433) dropdown trigger-tabindex prop (thanks @Spacarar)
* Fix Use the color-parser props for colorPicker value (thanks @GMartigny)
* Fix [#3708](https://github.com/buefy/buefy/issues/3708) sidebar closing on dynamic content click (thanks @OrestHk)
* Fix [#3779](https://github.com/buefy/buefy/issues/3779) Wrap b-table select all button with slot (thanks @Minhyme)
* Fix [#3760](https://github.com/buefy/buefy/issues/3760) show dropdown content based on breakpoints (thanks @geeksilva97)
* Fix [#3272](https://github.com/buefy/buefy/issues/3272) set class on tabitem
* Fix Active/disable infinite scroll (thanks @Sjerd)
* Fix Update VeeValidate.vue (thanks @scriptburn)
* Fix [#3826](https://github.com/buefy/buefy/issues/3826) Disabled radio button has cursor 'pointer' (thanks @amal-qb)
* Fix Fire event when Colorpicker RGB inputs are changed (thanks @RuslanGetmansky)
* Fix add .vue extension to component imports (thanks @daniil4udo)

## 0.9.22

### New features

* Shipped with Bulma 0.9.4 ([release note](https://github.com/jgthms/bulma/releases/tag/0.9.4))
* Add ``messages`` prop to message slot in field (thanks @GMartigny)
* Add ``long-press`` prop to number input (thanks @SylvainMarty )

## Fixes

* Fix input type not updated when type prop is changed (thanks @GMartigny)
* Fix horizontal classes typo (thanks @daniil4udo)
* Fix [#3484](https://github.com/buefy/buefy/issues/3484) table overflow when last column is numeric (thanks @gmercey)
* Fix [#3731](https://github.com/buefy/buefy/issues/3731) input with emoji don't show the right length (thanks @joaoGabriel55)


## 0.9.21

## Fixes

* Fix [#3734](https://github.com/buefy/buefy/issues/3734) refresh columns on destroy
* Fix setting type html attribute on non-button tags (thanks @tcitworld)

## 0.9.20

### New features

* Add search feature to docs (thanks @Mars073)
* Add ``checkbox-type`` prop to table (thanks @Mars073)

### Fixes

* Fix [#3432](https://github.com/buefy/buefy/issues/3432) accessibility using keyboard on checkbox into the table (thanks @chadlafontaine)
* Fix [#3705](https://github.com/buefy/buefy/issues/3705) validation error on focus instead of blur (thanks @lucraraujo)
* Fix [#3707](https://github.com/buefy/buefy/issues/3707) field inner type
* Fix issues about colorpicker (thanks @Mars073)
* Fix expaned on menu item (thanks @adamgreenhall)
* Fix clockpicker close (thanks @s-nesbigall)

## 0.9.19

### Fixes

* Fix theme css build

## 0.9.18

### New features

* Add open and close events to tooltip (thanks @GMartigny)
* Improve accessibility of dropdown, collapse and tabs (thanks @mateuswetah)

### Fixes

* Fix [#2889](https://github.com/buefy/buefy/issues/2889) tooltip when append-to-body
* Fix [#2998](https://github.com/buefy/buefy/issues/2998) sidebar close when content is dynamic
* Fix [#3677](https://github.com/buefy/buefy/issues/3677) emit active-change when hoverable

## 0.9.17

### Fixes

* Fix [#3676](https://github.com/buefy/buefy/issues/3676) table sort when backend

## 0.9.16

### New features

* **Add Font Awesome 6 support** (http://fontawesome.com/)

### Fixes

* Fix [#3672](https://github.com/buefy/buefy/issues/3672) filter table when multiple filters
* Fix colorpicker sass warnings (thanks @SomethingNew71)

## 0.9.15

### New features

* **New component: Colorpicker**, [see docs](https://buefy.org/documentation/colorpicker) (thanks @Mars073)
* Add year to ``week-number-click`` event (thanks @geeksilva97)
* Add ``icon-size`` prop to notification (thanks @matt3188)
* Add **page input** to pagination and table (thanks @chadlafontaine)
* Allow any keyword as step of numberinput (thanks @OrestHk)

### Fixes

* Fix [#3614](https://github.com/buefy/buefy/issues/3614) display zero in numberinput (thanks @rockandre)
* Fix [#3649](https://github.com/buefy/buefy/issues/3649) datetimepicker parser when minute is 59
* Fix [#3663](https://github.com/buefy/buefy/issues/3663) increment/decrement when v-model is null/undefined
* Fix [#3664](https://github.com/buefy/buefy/issues/3664) clip when mobile dropdown is active as modal (thanks @Jimmar)
* Fix reset multi-sort table (thanks @nimaebra)
* Fix tooltip span to div, w3 validation (thanks @nimbleStalker)

## 0.9.14

### New features

* Add normalize string for search in tables (thanks @matheushahnn)
* Add year to ``week-number-click`` event (thanks @geeksilva97)
* Add ``start`` and ``end`` slot to tabs
* Add ``active-change`` event to navbar dropdown (thanks @arusahni)

### Fixes

* Fix table sort when null values (thanks @Ryan-Case-SingleStone)
* Fix queue notification (thanks @geeksilva97)
* Fix upload validation (thanks @l1bra2013)
* Fix [#3599](https://github.com/buefy/buefy/issues/3599) table using multiple column filters
* Fix [#3624](https://github.com/buefy/buefy/issues/3624) reset hovered autocomplete

## 0.9.13

## Fixes

* Fix reset type and message when inner field

## 0.9.12

## Fixes

* Fix [#3571](https://github.com/buefy/buefy/issues/3571) `custom-class` prop to image
* Fix [#3572](https://github.com/buefy/buefy/issues/3572) datepicker timezone
* Fix [#3577](https://github.com/buefy/buefy/issues/3577) field loop using message

## 0.9.11

### New features

* **New component: Breadcrumb**, [see docs](https://buefy.org/documentation/breadcrumb) (thanks @mouadTaoussi)
* Add progress bar (remaining time to close) to notification (thanks @mouadTaoussi)
* Add ``selectable-header`` and ``selectable-footer`` props to autocomplete (thanks @JDurman)
* Add ``close-button-aria-label`` prop to modal (thanks @tcitworld)
* Add navbar burger and dropdowns to be focusable and keyboard selectable (thanks @tcitworld)

### Fixes

* Fix stay open on mouse click when autocomplete is keep-open
* Fix emitting autocomplete header and footer events (thanks @geeksilva97)
* Fix loading when using fixed navbar (thanks @geeksilva97)
* Fix datetimepicker when use granularity (thanks @geeksilva97)
* Fix numberinput increment bug (thanks @geeksilva97)
* Fix [#3475](https://github.com/buefy/buefy/issues/3475) attributes duplication on navbar (thanks @GMartigny)
* Fix [#3490](https://github.com/buefy/buefy/issues/3490) duplicate tags on select with enter and allow-new
* Fix [#3543](https://github.com/buefy/buefy/issues/3543) focused date when is range
* Fix [#3277](https://github.com/buefy/buefy/issues/3277) avoid to emit event when ``clear-on-select``
* Fix [#3418](https://github.com/buefy/buefy/issues/3418) timepicker hour 12 displayed as 0 (thanks @cain)

## 0.9.10

### Fixes

* Fix double ``select`` event when ``clear-on-select``
* Fix event prevent on "Tab" key of autocomplete

## 0.9.9

### New features

* Add ``tag`` prop to navbar dropdown (thanks @GMartigny)
* Add ``select-on-click-outside`` prop to autocomplete (thanks @elisamuelps)
* Add ``aria-labelledby`` prop to checkbox and switch (thanks @milad-mirkarimi)
* Add ``icon-right`` and ``icon-right-clickable`` props to datepicker and datetimepicker (thanks @rubjo)
* Add ``caption`` prop to table (thanks @eveenendaal)
* Add ``pause-on-hover`` prop to toast (thanks @milad-mirkarimi)
* Improve number input validation (thanks @fabiofdsantos)
* Enable click event to notification (thanks @franciscoh017)
* Show switch control label if slot exists (thanks @cain)
* Prevent emitting the prompt value when inputted text is compositing (thanks @soudai-s)

### Fixes

* Fix autocomplete using `keep first` (thanks @dauriata)
* Fix combination of filters with custom searches (AND operator) (thanks @massimozappino)
* Fix avoid reading undefined range on datepicker (thanks @apauly)
* Fix sidebar delay on hover leave (thanks @holtolee)
* Fix [#3431](https://github.com/buefy/buefy/issues/3431) disable sort when column is not sortable (multisort)
* Fix [#3438](https://github.com/buefy/buefy/issues/3438) reset current tag when duplicated
* Fix [#3442](https://github.com/buefy/buefy/issues/3442) wrong prop on timepicker
* Fix [#3461](https://github.com/buefy/buefy/issues/3461) check if a detail row is visible before trying to close it (thanks @GMartigny)
* Fix [#3473](https://github.com/buefy/buefy/issues/3473) emit typing to force reload items on tagsinput

## 0.9.8

### New features

* Shipped with Bulma 0.9.3 ([release note](https://github.com/jgthms/bulma/releases/tag/0.9.3))
* Support `keep first` on taginput elements (thanks @fabiofdsantos)
* Add missing typehints for the notification component (thanks @maartenvanasperen)
* Improve accessibility to dropdown and autocomplete (thanks @eveenendaal)
* Add `detail-icon` prop to Table component (thanks @holtolee)
* Add `delay` prop to Sidebar component (thanks @holtolee)

### Fixes

* Fix [#3329](https://github.com/buefy/buefy/issues/3329) checkbox autocompletion (thanks @markovejnovic)
* Fix datepicker tab navigation with `nearby-selectable-month-days` prop (thanks @Raljuk)
* Fix [#3342](https://github.com/buefy/buefy/issues/3342) iPad detection (thanks @lboecker)
* Fix [#3333](https://github.com/buefy/buefy/issues/3333) multiple datepicker stay on month on date removal (thanks @mateusbw)
* Fix [#3366](https://github.com/buefy/buefy/issues/3366) notification animation effect on close (thanks @LeoMouyna)

## 0.9.7

### New features

* Add transition appear to tabs/steps (thanks @jermel)
* Add ``draggable-column`` prop to table  (thanks @T0RAT0RA)

### Fixes

* Resotre tzOffeset on datetimepicker
* Fix [#3224](https://github.com/buefy/buefy/issues/3224) datepicker on select a date in the next month when multiple (thanks @markokos01)
* Fix [#3278](https://github.com/buefy/buefy/issues/3278) weekdays off by one day (thanks @waldeck-dev)
* Fix [#3280](https://github.com/buefy/buefy/issues/3280) controls on number-input when disabled (thanks @service-paradis)

## 0.9.6

### Fixes

* Fix datetimepicker timezone
* Fix datepicker when append-to-body and auto open when value change (thanks @service-paradis)
* Fix [#3258](https://github.com/buefy/buefy/issues/3258) remove outline from step-item and tab-item on focus (thanks @service-paradis)
* Fix [#3262](https://github.com/buefy/buefy/issues/3262) first option selected on taginput when autocomplete (thanks @fabiofdsantos)

## 0.9.5

### New features

* Shipped with Bulma 0.9.2 ([release note](https://github.com/jgthms/bulma/releases/tag/0.9.2))
* Add ``rounded`` prop to Upload (thanks @major-mayer)
* Add ``icon-right-type`` prop to Input (thanks @Propaganistas)
* Add ``icon-right`` prop to Datepicker (thanks @darotar)
* Add ``cancel-text`` prop to Snackbar (thanks @adamgreenhall)
* Add ``indefinite`` prop to Toast (thanks @service-paradis)
* Automatically select hovered option on blur for Autocomplete (thanks @fabiofdsantos)
* Add ``aria-label`` prop to Modal (thanks @crowdcow-shae)
* Add ``alt`` attribute to placeholder image (thanks @chazmcgarvey )
* Add ``caption`` slot to Image (thanks @chazmcgarvey )
* Add ``defaultSwitchRounded`` default configuration option (thanks @service-paradis)
* Add ``detail-transition`` prop to Table (thanks @service-paradis)
* Accept Date as values for Select (thanks @service-paradis)
* Display events on unselectable Datepicker cell (thanks @service-paradis)
* Add ``aria-minus-label`` and ``aria-plus-label`` functions for ``b-numberinput`` (thanks @service-paradis)
* Add ``th-attrs`` and ``td-attrs`` functions for ``b-table``
* Improve a11y on tab component (thanks @service-paradis)

### Fixes

* Fix [#2678](https://github.com/buefy/buefy/issues/2678): tab navigation with ``boxed`` navbar dropdown (thanks @yuwu9145)
* Fix [#2848](https://github.com/buefy/buefy/issues/2848): incorrect inset shadow for ``b-radio-button`` (thanks @service-paradis)
* Fix [#2879](https://github.com/buefy/buefy/issues/2879): open DatetimePicker using the enter key (thanks @service-paradis)
* Fix [#2990](https://github.com/buefy/buefy/issues/2990): table sorting on multiple column (thanks @yuwu9145)
* Fix [#2994](https://github.com/buefy/buefy/issues/2994): table striped style with sticky columns (thanks @service-paradis)
* Fix [#3011](https://github.com/buefy/buefy/issues/3011): blur events for ClockPicker (thanks @yuwu9145)
* Fix [#3022](https://github.com/buefy/buefy/issues/3022): use aria labels on table pagination buttons (thanks @service-paradis)
* Fix [#3028](https://github.com/buefy/buefy/issues/3028): use aria labels on pagination next/previous buttons (thanks @service-paradis)
* Fix [#3035](https://github.com/buefy/buefy/issues/3035): autocomplete default content width in modal
* Fix [#3040](https://github.com/buefy/buefy/issues/3040): fix mutation of value in multiple dropdown (thanks @VictorCazanave)
* Fix [#3056](https://github.com/buefy/buefy/issues/3056): reset time on carousel when using arrows (thanks @harryJst)
* Fix [#3104](https://github.com/buefy/buefy/issues/3104): ``defaultDialogConfirmText`` not working
* Fix [#3107](https://github.com/buefy/buefy/issues/3107): keyboard usage with Datepicker date range (thanks @service-paradis)
* Fix [#3109](https://github.com/buefy/buefy/issues/3109): handle number values as expected for NumberInput (thanks @yuwu9145)
* Fix [#3113](https://github.com/buefy/buefy/issues/3113): dropdown with ``append-to-body`` ``z-index`` when inactive (thanks @Dragoncall)
* Fix [#3119](https://github.com/buefy/buefy/issues/3119): duplicated ``hovered`` event with Autocomplete (thanks @fabiofdsantos)
* Fix [#3124](https://github.com/buefy/buefy/issues/3124): restore tree shaking functionnality with default config (thanks @MartinodF)
* Fix [#3135](https://github.com/buefy/buefy/issues/3135): multiple ``fixed`` Navbar on the same page (thanks @WTDuck)
* Fix [#3161](https://github.com/buefy/buefy/issues/3161): display close button when Modal is displayed at start (thanks @aglio)
* Fix [#3168](https://github.com/buefy/buefy/issues/3168): wrong DatetimePicker behavior with empty value
* Fix [#3177](https://github.com/buefy/buefy/issues/3177): navigate to Datepicker footer using Tab (thanks @service-paradis)
* Fix [#3195](https://github.com/buefy/buefy/issues/3195): Tooltip ``auto-close`` with ``inside`` and ``outside`` (thanks @elC0mpa)
* Fix [#3216](https://github.com/buefy/buefy/issues/3216): unexpected form submit on enter in Autocomplete
* Fix [#3226](https://github.com/buefy/buefy/issues/3226): reactive Datepicker dates when using ``multiple`` (thanks @service-paradis)
* Fix [#3235](https://github.com/buefy/buefy/issues/3235): emit event on Table listeners (thanks @service-paradis)
* Fix [#3247](https://github.com/buefy/buefy/issues/3247): Remove extraneous a element in tag (thanks @service-paradis)


## 0.9.4

### New features

* Shipped with Bulma 0.9.1
* Add ``is-light`` variant to tooltip (thanks @service-paradis)
* Add support for multiple progress bars (thanks @service-paradis)
* Add ``cellclick`` event to b-table (thanks @dauriata)
* Add ``controls-alignment`` prop to Numberinput (thanks @jonagoldman)
* Add ``left-label`` prop to switch component (thanks @kaangokdemir)
* Add ``indicator`` prop to show Slider value inside thumb (thanks @re2005)
* Add ``autoFocus`` prop to Modal (thanks @mateuswetah)
* Add ``aria-close-label`` prop to Taginput (thanks @service-paradis)
* Support ``locale`` in Slider (thanks @service-paradis)
* Add ``sticky-checkbox`` option to b-table (thanks @Numenorian)
* Add ``rounded`` prop to table pagination (thanks @nastiaKuzanastasia.kuznetsova)
* Add ``tooltip-always`` prop for Slider component (thanks @kaangokdemir)
* Add ``#header`` slot inside of b-message to place a custom header (thanks @m4st3rm4tz3)
* Add ``week-number-click`` event to Datepicker
* Add toggleDetails to default Table slot
* Add ``invalid`` event to Upload (thanks @adamgreenhall)
* Add ``custom-search`` prop to table column


### Fixes

* Fix [#2858](https://github.com/buefy/buefy/issues/2858): Too much events fired by BNavbar component (thanks @service-paradis)
* Fix problem using ``lazy`` prop for Image component (thanks @service-paradis)
* Fix [#2862](https://github.com/buefy/buefy/issues/2862): setSelect null when clear button is triggered (thanks @re2005)
* Fix [#2851](https://github.com/buefy/buefy/issues/2851): table current page update parent value (thanks @re2005)
* Fix [#2865](https://github.com/buefy/buefy/issues/2865): table visible column count (thanks @service-paradis)
* Fix [#2893](https://github.com/buefy/buefy/issues/2893): select height in Datepicker when using ``label-position="inside"`` (thanks @service-paradis)
* Fix [#2904](https://github.com/buefy/buefy/issues/2904): check for null/undefined and not any false for Numberinput (thanks @damian-bal)
* Use ``$slider-track-background`` for Slider track background (thanks @service-paradis)
* Fix [#2853](https://github.com/buefy/buefy/issues/2853): Sidebar closes when clicking on dynamically visible elements (thanks @service-paradis)
* Fix [#2916](https://github.com/buefy/buefy/issues/2916): select inside carousel (thanks @Tofandel)
* Fix [#2683](https://github.com/buefy/buefy/issues/2683): Datepicker focus when using arrow keys (thanks @service-paradis)
* Fix Datepicker initial value fullYear when v-model is present (thanks @re2005)
* Fix [#2914](https://github.com/buefy/buefy/issues/2914): Label overlapping input text (thanks @service-paradis)
* Fix [#2933](https://github.com/buefy/buefy/issues/2933): sidebar ``can-cancel`` docs
* Fix [#2909](https://github.com/buefy/buefy/issues/2909): ``rounded prop`` to datetimepicker
* Fix [#2938](https://github.com/buefy/buefy/issues/2938): border-right missing in timepicker select (thanks @service-paradis)
* Fix [#2949](https://github.com/buefy/buefy/issues/2949): Do not emit drag/drop events if table is not ``draggable`` (thanks @service-paradis)
* Fix [#2945](https://github.com/buefy/buefy/issues/2945): Checking if ``minNumber`` is undefined before assigning it in NumberInput (thanks @elC0mpa)
* Fix dropdown when expanded and ``append-to-body``
* Fix [#2940](https://github.com/buefy/buefy/issues/2940): trigger tooltip when ``append-to-body``
* Fix MenuItem expanded prop update (thanks @aquaminer)
* Fix [#2944](https://github.com/buefy/buefy/issues/2944): header slot on tabs (thanks @yuchaosydney)
* Fix [#2871](https://github.com/buefy/buefy/issues/2871): Improve tabbing with autocompleted taginputs (thanks @rubjo)
* Fix [#3003](https://github.com/buefy/buefy/issues/3003): close tooltip when triggers is focus
* Fix [#2918](https://github.com/buefy/buefy/issues/2918): columns prop when individual import
* Fix sidebar z-index
* Fix [#2977](https://github.com/buefy/buefy/issues/2977): disable scroll when sidebar is overlay


## 0.9.3

### New features

* Add ``animation`` prop to steps and tabs
* Add ``range`` to datepicker when type is ``month`` (thanks @ryo-gk)
* Add ``after-enter`` and ``after-leave`` events tp modal (thanks @aglio)
* Add ``min-step`` prop to number input (thanks @abroekhof)
* Add ``lazy`` prop to input (thanks @304NotModified)
* Add ``centered`` propt to navbar (thanks @holtolee)
* Add new progress bar text color (thanks @service-paradis)

### Fixes

* Fix [#2830](https://github.com/buefy/buefy/issues/2830) carousel animation refresh (thanks @Tofandel)
* Fix [#2824](https://github.com/buefy/buefy/issues/2824) background color marging when table cards (thanks @holtolee)
* Fix empty slot check in autocomplete
* Fix empty slot name in taginput (thanks @rubjo)
* Fix contextmenu event always being prevented on tooltips (thanks @adriaanmeuris)
* Fix use correct sidebar breakpoint variable (thanks @btkostner)
* Fix focused date when max date < current date (thanks @re2005)

## 0.9.2

### New features

* Add ``group-label`` and ``group-options`` prop to autocomplete and taginput
* Add support to vnode array on programmatic component using ``message`` prop
* Add ``defaultTooltipDelay`` constructor option
* Add ``contextmenu`` event to tooltip triggers
* Add ``alt``, ``src-fallback`` and ``error`` prop to image (thanks @service-paradis)
* Add append staticClass to tooltip when ``append-to-body``

### Fixes

* Fix [#2759](https://github.com/buefy/buefy/issues/2759) overlay on table when loading
* Fix [#2767](https://github.com/buefy/buefy/issues/2767) restore v-html on programmatic component (dialog, snackbar, toast, modal, loading, notification)
* Fix [#2773](https://github.com/buefy/buefy/issues/2773) remove ``select-arrow-color`` in order to use Bulma ``input-arrow`` sass variable
* Fix [#2774](https://github.com/buefy/buefy/issues/2774) datepicker weekday names by locale
* Fix [#2778](https://github.com/buefy/buefy/issues/2778) tooltip using `append-to-body` and `always` (thanks @jacenre)
* Fix [#2783](https://github.com/buefy/buefy/issues/2783) unclickable content on tooltip
* Fix [#2789](https://github.com/buefy/buefy/issues/2789) space on menu-item
* Fix [#2791](https://github.com/buefy/buefy/issues/2791) right margin on number input (thanks @user501254)
* Fix taginput default height in order to be compliant with Bulma 0.8.x breaking changes

## 0.9.1

### New features

* Add ``is-expanded`` class to menu item (thanks @btkostner)

### Fixes

* Fix [#2750](https://github.com/buefy/buefy/issues/2750) internal html to vdom using programmatic components
* Fix [#2751](https://github.com/buefy/buefy/issues/2751) table props index value
* Fix [#2752](https://github.com/buefy/buefy/issues/2752) incorrect base css
* Fix [#2753](https://github.com/buefy/buefy/issues/2753) field type when addons
* Fix [#2761](https://github.com/buefy/buefy/issues/2761) close tooltip when delay
* Fix indeterminate watcher in progress (thanks @service-paradis)

## 0.9.0

### Breaking changes

* **Vue.js** 2.6+ is now the minimum required version
* **Bulma** [0.8.0](https://github.com/jgthms/bulma/blob/master/CHANGELOG.md#big-update) and [0.9.0](https://github.com/jgthms/bulma/blob/master/CHANGELOG.md#090)

* **Table**, new default slot and table column syntax

From

```html
<b-table :data="myData">
    <template slot-scope="props">
        <b-table-column field="name" label="Name">
            {{ props.row.name }}
        </b-table-column>
        <b-table-column field="age" numeric label="Age">
            {{ props.row.age }}
        </b-table-column>
    </template>
</b-table>
```

To

```html
<b-table :data="myData">
    <b-table-column field="name" label="Name" v-slot="props">
        {{ props.row.name }}
    </b-table-column>
    <b-table-column field="age" label="Age">
        <template v-slot:default="props">
            {{ props.row.age }}
        </template>
    </b-table-column>
</b-table>
```

* Add ``triggers`` prop and remove ``hoverable`` prop to dropdown
* Add placeholder option to number inputs removing default value 0 (thanks @rcoundon)
* Show ``check-all`` checkbox when table cards
* Refactor carousel and carousel list and removing ``config`` prop too  (thanks @Tofandel)
* Add ``position`` prop and default alignment to skeleton (thanks @EmmanuelVlad)
* Replace ``is-active`` with ``active`` prop to navbar
* Replace default value of ``defaultDatepickerYearsRange`` constructor option from ``[-100, 3]`` to ``[-100, 10]``
* Build with ``condense`` option to avoid leading/trailing whitespaces
* Remove support to ``.sync`` modifier on ``current-page`` prop of table component (you have to use ``page-change`` event)
* SVG:
    * ``$icon-svg-width: auto !default``;
    * ``$icon-svg-height: auto !default``;

* **Internationalization**, Buefy is now using Intl package to format dates and numbers A prop named `locale` which accept a BCP 47 language tag have been added to some components. The default value for this prop is `undefined` which will use the browser locale. It can affect the following components:
  * Progress:
    * Intl is used to format the displayed value
  * Rate
    * Intl is used to format the displayed score
  * Datepicker and Datetimepicker:
    * Intl is used to get month names
    * Intl is used to get week day names
    * Intl is used to format the displayed date(s)
    * Intl is used to parse the given date when `editable`
  * Timepicker, Clockpicker and Datetimepicker
    * Intl is used to get separators
    * Intl is used to format the displayed time
    * Intl is used to parse the given date when `editable`

* **Configuration**
  * `defaultTrapFocus` is now `true`. It can affect the following components:
    * Datepicker
    * Dialog
    * Dropdown
    * Modal
  * `defaultLocale`
    * Default value is `undefined`, which means it will use the user browser locale
    * It accept a string with a BCP 47 language tag, or an array of such strings (see [Unicode BCP 47 locale identifier](https://www.unicode.org/reports/tr35/tr35.html#BCP_47_Conformance)).
  * `monthNames`
    * Default value is now undefined. It will use the given locale (default to browser locale) to get localized month names
  * `dayNames`
    * Default value is now undefined. It will use the given locale (default to browser locale) to get localized day names

* Use KeyboardEvent.key instead of keyCode. It can affect the following component:
  * Taginput:
    * `remove-on-keys` default is now `["Backspace"]` instead of `[8]`
    * `confirm-key-codes` is now called `confirm-keys` and the default is `[",", "Enter"]` instead of `[13, 188]`

### New features

* **New component: Image**, [see docs](https://buefy.org/documentation/image)
* **.sync deprecated** (except of selected and checked-rows), use ``v-model`` but you can use ``.sync`` until next breaking version
* [#1953](https://github.com/buefy/buefy/issues/1953) Add promise support to dialog using ``defaultPromiseProgrammatically`` constructor options
* [#2553](https://github.com/buefy/buefy/issues/2553) Add trigger slot to datepicker, timepicker and datetimepicker
* [#2568](https://github.com/buefy/buefy/issues/2568) Hide content message when empty slot
* [#2577](https://github.com/buefy/buefy/issues/2577) Add ``defaultStatusIcon`` constructor option and ``status-icon`` prop to field
* Add ``icon-size`` prop to menu item (thanks @cyberShaw)
* Add ``debounce-search`` prop to table (thanks @sc0ra)
* Add ``reset-on-meridian-change`` to timepicker (thanks @taverasady)
* Add ``close-icon `` to tag (thanks @kaangokdemir)
* Add ``close-type `` to tag input (thanks @kaangokdemir)
* Add ``header-class`` prop to tab item and step item (thanks @Tofandel)
* Add ``exponential`` prop to number input (thanks @Tofandel)
* Add ``defaultTabsType`` and ``defaultTabsExpanded`` constructor options (thanks @wrabit)
* Add ``create-tag`` prop to taginput
* Improve handle events for customElement components (thanks @vvkk77)
* Refactor components (table, tabs, steps, carousel, etc) using provide/inject

### Fixes

* Fix XSS on programmatic components
* Fix [#1226](https://github.com/buefy/buefy/issues/1226) and [#2658](https://github.com/buefy/buefy/issues/2658) using message with fields addons and groups
* Fix [#2196](https://github.com/buefy/buefy/issues/2196) carousel v-model sync using arrow navigation buttons (thanks @Tofandel)
* Fix [#2518](https://github.com/buefy/buefy/issues/2518) set Autocomplete focus on clear
* Fix [#2584](https://github.com/buefy/buefy/issues/2584) default table sort when backend
* Fix [#2591](https://github.com/buefy/buefy/issues/2591) carousel does not continue to slide even ``pause-hover`` is false (thanks @Tofandel)
* Fix [#2599](https://github.com/buefy/buefy/issues/2599) disabled select and input have different colors
* Fix [#2608](https://github.com/buefy/buefy/issues/2608) taginput wrong value when ``allow-duplicates`` is false (thanks @nithesh247)
* Fix [#2631](https://github.com/buefy/buefy/issues/2631) table with sticky searchable column
* Fix [#2647](https://github.com/buefy/buefy/issues/2647) progress bar truncate whole number zeroes
* Fix [#2683](https://github.com/buefy/buefy/issues/2683) datepicker lost focus using arrow keys
* Fix [#2684](https://github.com/buefy/buefy/issues/2684) timepicker hour check using ``unselectable-dates``
* Fix [#2639](https://github.com/buefy/buefy/issues/2639) datepicker clone before formatter
* Fix [#2706](https://github.com/buefy/buefy/issues/2706) number input steps (thanks @rcoundon)
* Fix [#2707](https://github.com/buefy/buefy/issues/2707) autocomplete index error using arrow keys
* Fix [#2725](https://github.com/buefy/buefy/issues/2725) open autocomplete when focused
* Fix [#2732](https://github.com/buefy/buefy/issues/2732) upload emit ``input`` when same file
* Fix [#2738](https://github.com/buefy/buefy/issues/2738) regex check when ``searchable`` table
* Improve datepicker a11y on older browsers ([#2641](https://github.com/buefy/buefy/issues/2641))

## 0.8.20

### New features

* Add ``close-on-confirm`` prop to dialog (thanks @kaangokdemir)
* Add bulma-css-vars extension to docs (thanks @wtho)

### Fixes

* Fix typo activeStep variable (thanks @speedpro)
* Fix [#2518](https://github.com/buefy/buefy/issues/2518) open autocomplete on clearable icon when ``open-on-focus``

## 0.8.19

### New features

* Add ``value`` prop to tabs-item and steps-item
* Add ``size`` prop to skeleton
* Add ``passive-type`` prop for switch (thanks @kaangokdemir)
* [#2507](https://github.com/buefy/buefy/issues/2507) ``icon-right`` get higher priority than status icon on input
* [#2513](https://github.com/buefy/buefy/issues/2513) add cursor pointer to pickers when not editable

### Fixes

* Fix [#2499](https://github.com/buefy/buefy/issues/2499) remove prevent click on carousel slide
* Fix [#2501](https://github.com/buefy/buefy/issues/2501) set ``type`` when ``vertical`` on steps (thanks @service-paradis)
* Fix [#2503](https://github.com/buefy/buefy/issues/2503) searchable table column slot
* Fix [#2504](https://github.com/buefy/buefy/issues/2504) display on skeletons (thanks @EmmanuelVlad)
* Fix [#2509](https://github.com/buefy/buefy/issues/2509) keep table search filtering when data are updated (thanks @VictorCazanave)
* Fix [#2514](https://github.com/buefy/buefy/issues/2514) radio-button and checkbox-button style

## 0.8.18

### New features

* Add ``message`` slot to field
* Add ``scrollable`` and ``max-height`` to dropdown (thanks @franciscoh017)
* Add ``rounded`` prop to skeleton
* Add ``mobile-mode`` prop and ``$steps-mobile-max-width`` SCSS variable to step
* Add ``expand-on-hover-fixed`` prop to sidebar
* Add ``expanded`` prop to upload (thanks @kaangokdemir)
* Add ``close-type`` prop to tag (thanks @kaangokdemir)
* Add ``defaultTabsAnimated`` constructor options
* [#2474](https://github.com/buefy/buefy/issues/2474) Add ``icon-click`` event to autcomplete
* [#2487](https://github.com/buefy/buefy/issues/2487) Add native event as second parameter of ``select`` event on autocomplete

### Fixes

* Fix security (XSS) on message field
* Fix taginput shallow copy in watcher (thanks @lunfel)
* Fix [#2456](https://github.com/buefy/buefy/issues/2456) double message when field horizontal and multiple fields
* Fix [#2459](https://github.com/buefy/buefy/issues/2459) checkbox, radio, switch group on mobile
* Fix [#2469](https://github.com/buefy/buefy/issues/2469) keep sort during search
* Fix [#2485](https://github.com/buefy/buefy/issues/2485) datepicker and timepicker default shadow when not editable
* Fix [#2489](https://github.com/buefy/buefy/issues/2489) dropdown item padding on mobile when ``has-link``
* Fix [#2493](https://github.com/buefy/buefy/issues/2493) clean hovered on select option (autocomplete and taginput)

## 0.8.17

### New features

* Add types to ConfigProgrammatic

### Fixes

* Fix [#2438](https://github.com/buefy/buefy/issues/2438) create modal content only when is active

## 0.8.16

### New features

* **New component: Skeleton**, [see docs](https://buefy.org/documentation/skeleton)
* Add ``destroy-on-hide`` prop to modal
* Add ``searchable`` slot to table (thanks @service-paradis)
* Add ``icon-right`` prop to autocomplete
* Add ``vertical`` and ``rounded`` props to steps (thanks @service-paradis)
* Add ``step`` prop to step item (thanks @service-paradis)
* Add ``card-layout`` prop to table
* Add ``is-row-selectable`` prop to table

### Fixes

* Fix icon type to account for colors that are hyphenated (thanks @BrauBeast)
* Fix width of options menu when autocomplete on taginput
* Fix [#2156](https://github.com/buefy/buefy/issues/2156) focus on tag remove
* Fix [#2211](https://github.com/buefy/buefy/issues/2211) check only one tab selected at once (thanks @service-paradis)
* Fix [#2328](https://github.com/buefy/buefy/issues/2328), [#2358](https://github.com/buefy/buefy/issues/2358) slider resize (thanks @service-paradis)
* Fix [#2364](https://github.com/buefy/buefy/issues/2364) close sidebar when is not overlay
* Fix [#2371](https://github.com/buefy/buefy/issues/2371) clean hovered after select
* Fix [#2381](https://github.com/buefy/buefy/issues/2381) label-position when position is right
* Fix [#2425](https://github.com/buefy/buefy/issues/2425) reactive data on carousel list

## 0.8.15

### Fixes

* Fix check whitelist on fixed sidebar
* Fix static sidebar on esc key

## 0.8.14

### New features

* **New component: Sidebar**, [see docs](https://buefy.org/documentation/sidebar)
* Add ``append-to-body`` prop to dropdown, autocomplete, datepicker, timepicker and datetimepicker
* Add ``dropdown-position`` prop to dropdown
* Add ``collapsible`` prop to navbar dropdown

### Fixes

* Fix switch elastic animation for non-rounded (thanks @service-paradis)
* Fix [#1666](https://github.com/buefy/buefy/issues/1666) native validation on datepicker
* Fix [#2317](https://github.com/buefy/buefy/issues/2317) default icon prev and next (thanks @service-paradis)
* Fix [#2325](https://github.com/buefy/buefy/issues/2325) native validation on autocomplete
* Fix [#2336](https://github.com/buefy/buefy/issues/2336) animation on tabs when vertical (top - bottom)

## 0.8.13

### New features

* Add ``selected`` slot to taginput
* Add ``scrollable`` prop to table
* Add ``sticky`` prop to table column
* Add ``cell-class`` and ``header-class`` prop to table column
* Add ``height`` prop to table
* Add ``filters-event`` prop to table
* Add slide animation to menu item and in the core code
* Improve accessibility to datepicker (thanks @service-paradis)
* [#2269](https://github.com/buefy/buefy/issues/2269) Add ``bigger-slider-focus`` prop to slider (thanks @melogustavo)
* [#2290](https://github.com/buefy/buefy/issues/2290) Add ``activable`` prop to menu
* [#2308](https://github.com/buefy/buefy/issues/2308) Add ``max-height`` prop to autocomplete

### Fixes

* Fix datepicker clearing selected array in the first selection when ``multiple``
* Fix [#2195](https://github.com/buefy/buefy/issues/2195) switch transition on Safari (thanks @bender-a)
* Fix [#2205](https://github.com/buefy/buefy/issues/2205) datepicker table rendering on Safari (thanks @bender-a)
* Fix [#2236](https://github.com/buefy/buefy/issues/2236) table performance on destroy
* Fix [#2257](https://github.com/buefy/buefy/issues/2257) button with ``icon`` and without default slot
* Fix [#2262](https://github.com/buefy/buefy/issues/2262) numberinput custom icons
* Fix [#2270](https://github.com/buefy/buefy/issues/2270) taginput when remove a tag on mobile
* Fix [#2272](https://github.com/buefy/buefy/issues/2272) check input ref before to focus (thanks @bender-a)
* Fix [#2273](https://github.com/buefy/buefy/issues/2273) end animation on dropdown
* Fix [#2292](https://github.com/buefy/buefy/issues/2292) sticky header using subheading
* Fix [#2293](https://github.com/buefy/buefy/issues/2293) focus on icon click when type "textarea"

## 0.8.12

### New features

* Add ``sticky-header`` prop to table

### Fixes

* Fix [#2254](https://github.com/buefy/buefy/issues/2254) button with icon in the default slot
* Fix [#2250](https://github.com/buefy/buefy/issues/2250) taginput option item when autocomplete without slot

## 0.8.11

### New features

* Add multi column sorting to table (thanks @suneab)
* Add ``clearable`` prop to autocomplete (thanks @melogustavo)
* Add ``icon-right`` prop to input (thanks @melogustavo)
* Add ``tag`` slot to taginput (thanks @jacobgoh101)
* Add ``tz-offset`` prop to datepicker (thanks @zedrdave)
* Add ``repeat`` prop to carousel (thanks @GerryWilko)
* Add ``icon`` prop to nofitication and message (thanks @service-paradis)
* Add ``multiline`` prop to tabs
* Add aria attributes to dropdown (thanks @mariusj)

### Fixes

* Fix missing export taginput component
* Fix prevent table thead jumping when sorting is changed
* Fix [#2152](https://github.com/buefy/buefy/issues/2152) tab-item rendering using header slot (thanks @service-paradis)
* Fix [#2153](https://github.com/buefy/buefy/issues/2153) text overflow to progress bar (thanks @service-paradis)
* Fix [#2157](https://github.com/buefy/buefy/issues/2157) carousel when ``autoplay`` and no pause
* Fix [#2160](https://github.com/buefy/buefy/issues/2160) remove body classes of navbar on destroy
* Fix [#2185](https://github.com/buefy/buefy/issues/2185) taginput when over maxtags
* Fix [#2187](https://github.com/buefy/buefy/issues/2187) taginput rendering when ``attached`` and over maxtags
* Fix [#2189](https://github.com/buefy/buefy/issues/2189) 'undefined' on carousel (thanks @service-paradis)
* Fix [#2190](https://github.com/buefy/buefy/issues/2190) remove margin when not exists text on button
* Fix [#2191](https://github.com/buefy/buefy/issues/2191) navbar dropdown close on click when hoverable
* Fix [#2216](https://github.com/buefy/buefy/issues/2216) menu item warning
* Fix [#2217](https://github.com/buefy/buefy/issues/2217) percentage calc on progress bar (thanks @service-paradis)
* Fix [#2219](https://github.com/buefy/buefy/issues/2219) field label when position is ``inside`` and add-on
* Fix [#2227](https://github.com/buefy/buefy/issues/2227) double blur event emitted by pickers
* Fix [#2228](https://github.com/buefy/buefy/issues/2228) check if the row is checkable before unchecking it (thanks @service-paradis)
* Fix [#2240](https://github.com/buefy/buefy/issues/2240) check ref datetimepicker on mount when ``mobile``

## 0.8.10

### New features

* Improve rendering performance on table
* Add ``focus``and ``blur`` event on datetimepicker
* Add ``animation`` prop to notification (thanks @service-paradis)
* Add ``trap-focus`` prop to datepicker (thanks @service-paradis)
* Add ``hour-increment`` prop to timepicker (thanks @LeoMouyna)
* Add ``backend-filtering`` prop and ``filters-change`` event to table (thanks @zeljkokalezic)

### Fixes

* Fix [#1473](https://github.com/buefy/buefy/issues/1473) tooltip z-index (lower than modal) (thanks @rolandschuetz)
* Fix [#1889](https://github.com/buefy/buefy/issues/1889) add body padding for fixed spaced navbar (thanks @a-kriya)
* Fix [#2109](https://github.com/buefy/buefy/issues/2109) disabled button (thanks @service-paradis)
* Fix [#2114](https://github.com/buefy/buefy/issues/2114) limit the select options of month in Datepicker with ``min-date`` and ``max-date`` (thanks @service-paradis)
* Fix [#2121](https://github.com/buefy/buefy/issues/2121) fix tabs warning when items aren't already visible (thanks @service-paradis)
* Fix [#2133](https://github.com/buefy/buefy/issues/2133) table colspan when ``detailed`` and hidden icon (thanks @rolandschuetz)
* Fix [#2135](https://github.com/buefy/buefy/issues/2135) keep open taginput on add/remove when ``open-on-focus``
* Fix [#2141](https://github.com/buefy/buefy/issues/2141) taginput using sortablejs

## 0.8.9

### New features

* Add ``infinite-scroll`` prop to autocomplete and taginput (thanks @mateuswetah)
* Add scss variables to loading and snackbar (thanks @service-paradis)
* Add range start and end events to datepicker (thanks @lunfel)
* Add ``close`` event to notification, snackbar and toast (thanks @service-paradis)
* Add new props to carousel and ``carousel-list`` (thanks @apolokaklab)
* Add ``aria-role`` prop to snackbar (thanks @service-paradis)
* Remove Vue import and registration of Vue instance (thanks @afwn90cj93201nixr2e1re)
* [#2075](https://github.com/buefy/buefy/issues/2075) Add ``focusable`` prop to datepicker
* [#2085](https://github.com/buefy/buefy/issues/2085) Add ``blur`` event on picker close

### Fixes

* Fix taginput when autocomplete without template
* Fix default modal background color (thanks @francoism90)
* Fix [#1387](https://github.com/buefy/buefy/issues/1387) maintain tabitems/stepitems order (thanks @service-paradis)
* Fix [#2023](https://github.com/buefy/buefy/issues/2023) ``increment-minutes`` and ``increment-seconds`` props to timepicker (thanks @GerryWilko)
* Fix [#2037](https://github.com/buefy/buefy/issues/2037) datepicker selection when multiple
* Fix [#2049](https://github.com/buefy/buefy/issues/2049) indicator style name 'is-boxs' -> 'is-boxes' (thanks @apolokaklab)
* Fix [#2062](https://github.com/buefy/buefy/issues/2062) align last tag on taginput with maxtags (thanks @andrei-dracea)
* Fix [#2093](https://github.com/buefy/buefy/issues/2093) ``trap-focus`` on programmatic modal (thanks @service-paradis)

## 0.8.8

### New features

* Add ``subheadings`` prop/slot to table (thanks @arambert)
* Add ``container`` prop to dialog (thanks @service-paradis)
* Add touch events to carousel on mobile

### Fixes

* Fix custom icon pack improving merge internal function (thanks @service-paradis)
* Fix [#2006](https://github.com/buefy/buefy/issues/2006) tabs when nested each other (thanks @service-paradis)

## 0.8.7

### New features

* **New component: Carousel**, [see docs](https://buefy.org/documentation/carousel) (thanks @apolokaklab)
* Add ``controls`` prop to number input (thanks @afwn90cj93201nixr2e1re)
* Add ``accordion`` prop to menu
* Add ``icon-click`` event to input (thanks @service-paradis)
* Add multiple support to Datepicker when type is ``month``
* Add more customization variables for dropdown and loading (thanks @HugoHeneault)
* Add more customization variables for datepicker (thanks @service-paradis)
* Add ``defaultDatepickerMobileModal`` constructor option (thanks @ievhen-soloviov)
* [#2000](https://github.com/buefy/buefy/issues/2000) Add ``time-creator`` prop to timepicker

### Fixes

* Fix IE compatibility using multiple datepicker
* Fix datetimepicker ignores expanded prop (thanks @cypressious)
* Fix disabled checkbox in table (thanks @yxngl)
* Fix page number count when filtering data (thanks @yxngl)
* Fix placeholder to datetimepicker (thanks @yxngl)
* Fix [#1812](https://github.com/buefy/buefy/issues/1812) extending a component
* Fix [#1909](https://github.com/buefy/buefy/issues/1909), [#1902](https://github.com/buefy/buefy/issues/1902), [#1898](https://github.com/buefy/buefy/issues/1898) issues on searchable table column (thanks @dauriata and @service-paradis)
* Fix [#1951](https://github.com/buefy/buefy/issues/1951) modal a11y improvements (thanks @service-paradis)
* Fix [#1963](https://github.com/buefy/buefy/issues/1963) erase numberinput value
* Fix [#1972](https://github.com/buefy/buefy/issues/1972) using min and max native datepicker and timepicker props
* Fix [#1986](https://github.com/buefy/buefy/issues/1986) setting 00:00 on datetimepicker

## 0.8.6

### New features

* **New component: Datetimepicker**, [see docs](https://buefy.org/documentation/datetimepicker)
* Add ``searchable`` prop to table column (thanks @robertmarney, @tonystonee, @quadra-diffusion)
* Add ``expanded`` prop to radio button (thanks @saaso)
* Add ``expanded`` prop to checkbox button (thanks @saaso)
* Add ``multiple`` prop to datepicker (thanks @jamenamcinteer)
* Add ``vertical`` prop to tabs (thanks @service-paradis)
* Add ``defaultButtonRounded`` constructor option (thanks @bohdan-prylutskyi)
* Add ``mobile-burger`` prop to navbar (thanks @service-paradis)
* Add ``v-on:listeners`` to navbar item
* Add ``expanded`` prop to button (thanks @service-paradis)
* Add a slot for overriding navigation to steps (thanks @service-paradis)
* Add more customization variables to checkbox (thanks @HugoHeneault)
* Add new SCSS variables to toast, snackbar and icon (thanks @service-paradis)
* Improve accessibility to modal (thanks @service-paradis)
* Enable to set a custom width (%, ...) to table column (thanks @druppy)

### Fixes

* Fix [#1834](https://github.com/buefy/buefy/issues/1834) datepicker on ios mobile (thanks @bohdan-prylutskyi)
* Fix [#1875](https://github.com/buefy/buefy/issues/1875) datepicker disabled style
* Fix [#1883](https://github.com/buefy/buefy/issues/1883) ``date-parser`` function when range
* Fix taginput style when maxtags and using ``label-position`` prop on field

## 0.8.5

### New features

* **New component: Rate**, [see docs](https://buefy.org/documentation/rate) (thanks @apolokaklab)
* [#1706](https://github.com/buefy/buefy/issues/1706) Add ``trap-focus`` prop to modal, dialog and dropdown (thanks @service-paradis)
* [#1775](https://github.com/buefy/buefy/issues/1775) Add ``expanded`` prop to dropdown
* Add ``custom-formatter`` prop to slider (thanks @yxngl)
* Add ``position`` prop to collapse

### Fixes

* Fix [#1286](https://github.com/buefy/buefy/issues/1286) taginput close when autocomplete (thanks @wrabit)
* Fix [#1784](https://github.com/buefy/buefy/issues/1784) navbar navigation on mobile reverting [#1743](https://github.com/buefy/buefy/issues/1743)
* Fix [#1780](https://github.com/buefy/buefy/issues/1780) alignment using h1 tag on steps (thanks @service-paradis)
* Fix [#1786](https://github.com/buefy/buefy/issues/1786) icons warning for vue-fontawesome (thanks @service-paradis)
* Fix [#1814](https://github.com/buefy/buefy/issues/1814) set ``icon-pack`` pagination using table (thanks @service-paradis)
* Fix [#1821](https://github.com/buefy/buefy/issues/1821) datepicker reset using empty array when ``range``

## 0.8.4

### New features

* Add style props (``is-boxed``, etc) to navbar and navbarcomponent
* Add pagination buttons customization (thanks @service-paradis)
* Improve accessibility for menu (thanks @mateuswetah)

### Fixes

* Fix build using import individual components
* Fix [#1717](https://github.com/buefy/buefy/issues/1717) notification margin when ``queue`` is false and ``position`` is bottom-(right/left) (thanks @service-paradis)
* Fix [#1741](https://github.com/buefy/buefy/issues/1741) toggle on navbar dropdown
* Fix [#1743](https://github.com/buefy/buefy/issues/1743) add check outside click on navbar brand (thanks @wanxe)
* Fix [#1744](https://github.com/buefy/buefy/issues/1744) icon component using vue-fontawesome
* Fix [#1748](https://github.com/buefy/buefy/issues/1748) progressbar style on IE when indeterminate (thanks @service-paradis)
* Fix [#1761](https://github.com/buefy/buefy/issues/1761) grouped/addons size with ``inside`` position label (thanks @service-paradis)
* Fix [#1773](https://github.com/buefy/buefy/issues/1773) numberinput issues with groups and addons (thanks @service-paradis)

## 0.8.3

### New features

* Add ``customIconPacks`` constructor option to use custom icon packs (thanks @service-paradis)
* Add ``can-close`` prop to dropdown (thanks @service-paradis)
* Add ``close-on-click`` prop to form navbar (thanks @wanxe)
* Add ``icon-prev`` and ``icon-next`` props to datepicker, steps and pagination  (thanks @service-paradis)
* Add ``lazy`` prop to slider (thanks @yxngl)
* Add ``dragging``, ``dragstart`` and ``dragend`` events to slider (thanks @yxngl)
* Add ``setValidity`` method to form components (thanks @GerryWilko)
* Add ``hours-label`` and ``minutes-label`` props to clockpicker
* Improve steps look on mobile (thanks @service-paradis)
* [#1677](https://github.com/buefy/buefy/issues/1677) Add ``wrapper-class`` prop to navbar (thanks @wanxe)
* [#1712](https://github.com/buefy/buefy/issues/1712) Add navbardropdown component

### Fixes

* Fix selection UI to datepicker when empty range
* Fix slider style for IE 11 (thanks @yxngl)
* Fix ``default-minutes`` and ``default-seconds`` props when value is 0
* Fix pagination compatibility using IE 11 (thanks @service-paradis)
* Fix set active menu item on click when tag is ``router-link``
* Fix navbar adding incorrect class to body when fixed at top/bottom (thanks @Silvea12)
* Fix datepicker height using different size, it'll show always 6 weeks for each month
* Fix [#1646](https://github.com/buefy/buefy/issues/1646) navbar item when tag prop is ``router-link`` (thanks @wanxe)
* Fix [#1648](https://github.com/buefy/buefy/issues/1648) modal becomes clipped using switch (thanks @yxngl)
* Fix [#1670](https://github.com/buefy/buefy/issues/1670) simple upload on IE 11
* Fix [#1678](https://github.com/buefy/buefy/issues/1678) show autocomplete option when value is 0
* Fix [#1679](https://github.com/buefy/buefy/issues/1679) hide navbar on click when mobile (thanks @wanxe)
* Fix [#1686](https://github.com/buefy/buefy/issues/1686) disable timepicker hour if no enabled minutes available (thanks @philnee)

## 0.8.2

* Add range selection using ``range`` prop to datepicker (thanks @afifsohaili)

### Fixes

* Fix [#1624](https://github.com/buefy/buefy/issues/1624) autosizing slider into container (thanks @yxngl)
* Fix [#1625](https://github.com/buefy/buefy/issues/1625) Buefy global name in UMD format
* Fix [#1626](https://github.com/buefy/buefy/issues/1626) include CSS files as side effects (thanks @modularcoder)

## 0.8.1

### New features

Add ``show-week-number`` prop to datepicker (thanks @quadra-diffusion)

### Fixes

* Fix navbar internal implementation (thanks @wanxe)
* Fix field component when slot is empty
* Revert breaking change ``v-on:$listeners`` to internal native select of select
* Fix [#1616](https://github.com/buefy/buefy/issues/1616) upload check on change when single (thanks @yxngl)
* Fix [#1619](https://github.com/buefy/buefy/issues/1619) incorrect minute display format for 12 hour using timepicker
* Fix [#1620](https://github.com/buefy/buefy/issues/1620) navbar SSR support

## 0.8.0

### Breaking changes

* Change path to import individual components, like:
```javascript
import { Table } from 'buefy'
Vue.use(Table)
```
* Change path to import components to use outside main vue instance, like:
```javascript
// see Toast, Snackbar, Modal, Dialog, Loading and Notification doc pages for more examples
import { ToastProgrammatic as Toast } from 'buefy'
Toast.open('Toasty!')
```
* Fix [#1268](https://github.com/buefy/buefy/issues/1268) add ``$buefy`` namespace for each programmatic components
```javascript
// see Toast, Snackbar, Modal, Dialog, Loading and Notification doc pages for more examples
this.$buefy.toast.open('Toasty!')
```
* Fix [#1137](https://github.com/buefy/buefy/issues/1137) hide hoverable dropdown menu after click
* Fix [#1529](https://github.com/buefy/buefy/issues/1529) pagination ellipsis behavior (thanks @service-paradis)
* Fix [#1550](https://github.com/buefy/buefy/issues/1550) improve the default behavior for clickable steps (thanks @service-paradis)
* Fix [#1586](https://github.com/buefy/buefy/issues/1586) focus issue to radio, checkbox and switch (thanks @yxngl)
* Add ``v-on:$listeners`` to internal native select of select component
* Remove ``span`` around default b-table-column slot (thanks @service-paradis)

### New features

* **New component: Slider**, [see docs](https://buefy.org/documentation/slider) (thanks @yxngl)
* **New component: Navbar**, [see docs](https://buefy.org/documentation/navbar) (thanks @wanxe)
* **New component: Progress Bar**, [see docs](https://buefy.org/documentation/progress) (thanks @service-paradis)
* Improve to tree shaking using ESM format
* Add ``header`` slot to table column
* Add ``defaultTooltipDelay`` constructor option (thanks @service-paradis)
* Add ``sort-icon`` and ``sort-icon-size`` props to table (@modularcoder)
* Add ``default-minutes`` and ``default-seconds`` to timepicker
* Add ``focusable`` prop to dropdown (thanks @service-paradis)
* Add ``mouseenter `` and ``mouseleave`` events to table (thanks @afm-sayem)
* Add ``rounded`` and ``outlined`` prop to switch (thanks @service-paradis)
* Add ``aria-close-label`` prop to taginput (thanks @yxngl)
* Add ``has-counter`` prop to taginput (thanks @dejangeci)

### Fixes

* Fix [#1541](https://github.com/buefy/buefy/issues/1541) emit `input` event when change step (thanks @service-paradis)
* Fix [#1544](https://github.com/buefy/buefy/issues/1544) years select datepicker when max/min being passed
* Fix [#1565](https://github.com/buefy/buefy/issues/1565) datepicker programmatically on mobile
* Fix [#1576](https://github.com/buefy/buefy/issues/1576) label-position prop using numberinput component (thanks @service-paradis)
* Fix [#1591](https://github.com/buefy/buefy/issues/1591) datepicker on mobile using different timezone
* Fix issues on delete last selected element and on reset upload (thanks @it-fm)

## 0.7.10

* Fix [#1536](https://github.com/buefy/buefy/issues/1536) build error using Sass customization
* Fix menu component example on codepen and/or simple html page

## 0.7.9

### New features

* **New component: Menu**, [see docs](https://buefy.org/documentation/menu)
* Add ``custom-class`` prop to modal (thanks @CobraClutch)
* Add ``delay`` prop to tooltip (thanks @service-paradis)
* Add ``checkbox-position`` prop to table (thanks @service-paradis)
* Add ``pagination-position`` prop to table (thanks @service-paradis)

### Fixes

* Fix build errors using typescript and return type of snackbar and notification
* Fix upload on iOS
* Fix native timepicker when ``enable-seconds``
* Fix [#1515](https://github.com/buefy/buefy/issues/1515) toggle datepicker programmatically
* Fix [#1516](https://github.com/buefy/buefy/issues/1516) month picker on iOS
* Fix [#1526](https://github.com/buefy/buefy/issues/1526) timepicker default parser

## 0.7.8

### New features

* **New component: Steps**, [see docs](https://buefy.org/documentation/steps) (thanks @service-paradis)
* Add ``label-position`` prop to field
* Add ``full-screen`` prop to modal
* Add ``enable-seconds`` prop to timepicker
* Add ``years-range``, ``nearby-month-days``, ``nearby-selectable-month-days`` prop to datepicker

### Fixes

* Fix timepicker and clockpicker force new Date object on ``input`` event
* Fix [#1450](https://github.com/buefy/buefy/issues/1450) clockpicker rounded style (thanks @atinybeardedman)
* Fix [#1455](https://github.com/buefy/buefy/issues/1455) margins to taginput (thanks @francoism90)
* Fix [#1460](https://github.com/buefy/buefy/issues/1460) long press click on plus/minus buttons to numberinput
* Fix [#1462](https://github.com/buefy/buefy/issues/1462) table column width when a column is toggled invisible and visible again (thanks @service-paradis)
* Fix [#1469](https://github.com/buefy/buefy/issues/1469) ``use-html5-validation`` prop to numberinput
* Fix [#1470](https://github.com/buefy/buefy/issues/1470) override ``label-weight`` Bulma variable
* Fix [#1480](https://github.com/buefy/buefy/issues/1480) cancelling long press on Chromium (thanks @yxngl)

## 0.7.7

### New features

* **Update Bulma to 0.7.5**
* **Datepicker improved**: add month picker, [see docs](https://buefy.org/documentation/datepicker)
* Add ``header-checkable`` prop to table
* Add ``toggle`` method to datepicker
* Add ``defaultDropdownMobileModal`` constructor option
* Add ``validation-message`` prop to input (thanks @jankeesvw)
* [#1424](https://github.com/buefy/buefy/issues/1424) Prevent close on click when ``multiple`` dropdown

### Fixes

* Fix [#1150](https://github.com/buefy/buefy/issues/1150) dropdown z-index on mobile
* Fix [#1418](https://github.com/buefy/buefy/issues/1418) timepicker and clockpicker `input` event emit
* Fix [#1429](https://github.com/buefy/buefy/issues/1429) datepicker and timepicker exclusive opening
* Fix [#1433](https://github.com/buefy/buefy/issues/1433) timepicker default formatter and parser

## 0.7.6

### New features

* Add ``label`` slot to field (thanks @yxngl)
* Add ``footer`` slot to autocomplete (thanks @LeoMouyna)
* Add ``open-on-focus`` prop and improved accessibility for timepicker and clockpicker
* Add ``multiple`` prop to dropdown

### Fixes

* Fix [#817](https://github.com/buefy/buefy/issues/817) radio button off-center issue
* Fix [#1347](https://github.com/buefy/buefy/issues/1347), [#1361](https://github.com/buefy/buefy/issues/1361) datepicker v-model and initial toggle
* Fix [#1351](https://github.com/buefy/buefy/issues/1351) tabs `is-disabled` css rule
* Fix [#1352](https://github.com/buefy/buefy/issues/1352) numberinput when empty string
* Fix [#1382](https://github.com/buefy/buefy/issues/1382) numberinput layout
* Fix [#1390](https://github.com/buefy/buefy/issues/1390) missing prop to dialog type
* Fix [#1402](https://github.com/buefy/buefy/issues/1402) radio button on IE11 (thanks @timEulitz)

## 0.7.5

### New features

* **New component: Numberinput**, [see docs](https://buefy.org/documentation/numberinput)
* **Loading improved**: can show a custom content, [see docs](https://buefy.org/documentation/loading)
* Add ``destroy-on-hide`` prop to tabs
* Add ``custom-detail-row`` prop to table (thanks @EvanBarbour3)
* Add ``open-on-focus`` prop and improved accessibility for datepicker (thanks @imfaber)

### Fixes

* Fix [#1320](https://github.com/buefy/buefy/issues/1320) space keydown on Firefox to checkbox and switch
* Fix [#1325](https://github.com/buefy/buefy/issues/1325) input emit to upload
* Enable native timepicker to clockpicker when ``mobile-native``  (default ``true``)
* Fix clockpicker docs and input size
* Fix upload opening in IE 11

## 0.7.4

### New features

* **New component: Button**, [see docs](https://buefy.org/documentation/button)
* **New component: Clockpicker**, [see docs](https://buefy.org/documentation/clockpicker) (thanks @SharpSeeEr)
* **Notification improved**: can show a notification programmatically, [see docs](https://buefy.org/documentation/notification)
* Add ``custom-formatter`` prop to autocomplete
* Add ``draggable`` prop to table (thanks @suneab)
* Improve accessibility for notification, message and pagination (thanks @mateuswetah)

### Fixes

* [#956](https://github.com/buefy/buefy/issues/956) Fix hidden overflow on tabs (thanks @Baggs)
* [#1246](https://github.com/buefy/buefy/issues/1246) Fix Cleave.js example using Vue 2.6.x (thanks @yxngl)
* [#1251](https://github.com/buefy/buefy/issues/1251) Fix Datepicker closing when page back to ``min-date`` month
* [#1257](https://github.com/buefy/buefy/issues/1257) Fix Datepicker slow/freeze on big year input
* [#1282](https://github.com/buefy/buefy/issues/1282) Fix Datepicker event display wich have a time set (thanks @DonNicoJs)
* [#1290](https://github.com/buefy/buefy/issues/1290) Fix double click event for CheckBox(Button) and Radio(Button) (thanks @yxngl)
* Fix tabindex on switch (thanks @yxngl), radio (thanks @Sacmanxman2) and checkbox

## 0.7.3

### New features

* **Update Bulma to 0.7.4**
* Add ``required`` prop to radio-button and checkbox-button
* Add ``defaultModalCanCancel`` constructor options (thanks @quimarche)
* Add ``typing`` event to autocomplete (thanks @adrlen)
* Add ``native-autocomplete`` prop to taginput
* Add support to [Font Awesome SVG component](https://www.npmjs.com/package/@fortawesome/vue-fontawesome) (thanks @rhwilr)
* Add ``custom-key-row`` prop to table
* Add ``defaultToastPosition`` and ``defaultSnackbarPosition`` constructor options
* Improve accessibility for collapse and dropdown (thanks @mateuswetah)
* Revert tab as confirm key code to taginput
* [#1233](https://github.com/buefy/buefy/issues/1233) Change left margin to right margin when spacing nested fields (thanks @yxngl)

### Fixes

* [#1177](https://github.com/buefy/buefy/issues/1177) Fix IE/Edge datepicker content size
* [#1216](https://github.com/buefy/buefy/issues/1216) Fix reset v-model when upload cancel
* [#1219](https://github.com/buefy/buefy/issues/1219) Fix modal ``width`` prop (thanks @yxngl)

## 0.7.2

### New features

* Add ``header`` autocomplete slot to taginput
* Add ``required`` prop to switch
* Add ``mobile-sort-placeholder`` prop to table
* Add ``contextmenu`` event to table (thanks @gps-dev)
* Add ``show-detail-icon`` prop to table and toggle row detail programmatically (thanks @omer2500)
* Add ``use-html5-validation`` prop to form components and ``defaultUseHtml5Validation`` constructor options (thanks @lukio3)
* [#1164](https://github.com/buefy/buefy/issues/1164) Disable selecting row on checkbox click when table is ``checkable``

### Fixes

* Fix taginput when ``allow-new`` is enabled
* Fix pagination order when simple
* [#1126](https://github.com/buefy/buefy/issues/1126) Fix init sort using columns table prop
* [#898](https://github.com/buefy/buefy/issues/898), [#1154](https://github.com/buefy/buefy/issues/1154) Fix browser autocomplete using multiple fields

## 0.7.1

### New features

* **Update Bulma to 0.7.2**
* Add ``indeterminate`` prop to checkbox (thanks @guanzo)
* [#1029](https://github.com/buefy/buefy/issues/1029) Upgrade vue-test-utils to latest version (thanks @lordfuoco)
* [#1065](https://github.com/buefy/buefy/issues/1065) Add tab as confirm key code to taginput (thanks @williamabbott)
* [#1083](https://github.com/buefy/buefy/issues/1083) Add ``date-creator`` prop to datepicker (thanks @jonagoldman)

### Fixes

* [#1024](https://github.com/buefy/buefy/issues/1024) Fix upload SSR support
* [#1027](https://github.com/buefy/buefy/issues/1027) Fix ``icon-pack`` prop when individual components
* [#1040](https://github.com/buefy/buefy/issues/1040) Fix prevent radio with multi-line text from shrinking (thanks @rhwilr)
* [#1067](https://github.com/buefy/buefy/issues/1067) Fix IE 11 UI switch (thanks @patrickabkarian)
* [#1072](https://github.com/buefy/buefy/issues/1072) Fix sorting boolean fields

## 0.7.0

### Breaking changes

* Change path to import components to use outside main vue instance, like:
```javascript
// see Toast, Snackbar, Modal and Dialog doc pages for more examples
import { Toast } from 'buefy/dist/components/toast'
Toast.open('Toasty!')
```
* Upload component accepts a single `File` and `Array<File>` when multiple as ``v-model``
* Rename ``readonly`` to ``editable`` on datepicker and timepicker (now just use the prop without false value)
* **Removed Panel component**, it was deprecated since 0.5.3

### New features

* Add ``closable`` prop to taginput (thanks @adrlen)
* [#970](https://github.com/buefy/buefy/issues/970) Add Object type to ``type`` prop of field and icon

### Fixes

* Updated timepicker style (it's a little smaller now)
* [#992](https://github.com/buefy/buefy/issues/992) Fix table header disappear with pagination
* [#999](https://github.com/buefy/buefy/issues/999) Fix ``size`` prop to datepicker and timepicker

## 0.6.7

### New features

* **Table improved**: can change columns dynamically
* Add ``auto-close`` and ``duration`` props to message and notification
* Add ``allow-duplicates`` prop to taginput
* Add ``required`` prop to radio and checkbox
* Add ``defaultInputHasCounter`` constructor options

### Fixes and changes

* [#839](https://github.com/buefy/buefy/issues/839) Fix ``icon-pack`` from icon to be reactive
* [#840](https://github.com/buefy/buefy/issues/840) Fix loading position to tagInput (thanks @adrlen)
* [#852](https://github.com/buefy/buefy/issues/852) Fix label class to field when horizontal
* [#872](https://github.com/buefy/buefy/issues/872) Fix datepicker default formatter
* [#895](https://github.com/buefy/buefy/issues/895) Fix loading overlay when not in full page (thanks @adrlen)
* [#927](https://github.com/buefy/buefy/issues/927) Fix autocomplete when option text is too long (thanks @8bu)
* [#948](https://github.com/buefy/buefy/issues/948) Fix switch when multi line text (thanks @rhwilr)

## 0.6.6

### New features

* **Update Bulma to 0.7.1**
* Add ``header`` slot to autocomplete
* Add ``type`` prop to checkbox and radio
* Add ``on-paste-separators`` and ``before-adding`` props to tagInput
* [#830](https://github.com/buefy/buefy/issues/830) Add ``ellipsis`` prop to tagInput and tag components

### Fixes and changes

* [#746](https://github.com/buefy/buefy/issues/746) Fix default ``dateFormatter`` function to datepicker
* [#755](https://github.com/buefy/buefy/issues/755) Fix arrow centered when table detail (thanks @wanxe)
* [#787](https://github.com/buefy/buefy/issues/787) Fix type in horizontal field when message is empty
* [#814](https://github.com/buefy/buefy/issues/814) Reset scroll to modal before destroy
* [#481](https://github.com/buefy/buefy/issues/481) Fix tagInput height to match other inputs

## 0.6.5

* Revert some changes on Checkbox, CheckboxButton, Radio, RadioButton, Select and Switch, working as before now
* [#711](https://github.com/buefy/buefy/issues/711) Fix click event to switch (thanks @adrlen)
* [#712](https://github.com/buefy/buefy/issues/712) Fix SSR support (thanks @anteriovieira)
* [#719](https://github.com/buefy/buefy/issues/719) Fix ``header`` slot to tabItem
* [#718](https://github.com/buefy/buefy/issues/718) Fix ``changeMonth`` and ``changeYear`` events to datepicker in ``change-month`` and ``change-year``
* [#727](https://github.com/buefy/buefy/issues/727) Fix upload check file
* [#730](https://github.com/buefy/buefy/issues/730) Fix field with addons not updating on re-render (tanks @arlen)

## 0.6.4

### New features

* **Add nuxt-buefy on docs**, [see here](https://buefy.org/documentation/start) (thanks @anteriovieira)
* Add ``indefinite`` prop to snackbar
* Add ``header`` slot to datepicker
* Add ``header`` slot to tabItem
* [#485](https://github.com/buefy/buefy/issues/485) Add ``custom-class`` prop to field (thanks @docnoe)
* [#509](https://github.com/buefy/buefy/issues/509) Add autocomplete slot support to taginput (thanks @gkinsman)
* [#581](https://github.com/buefy/buefy/issues/581) Add ``is-row-checkable`` prop to table (thanks @jvmonjo)
* [#602](https://github.com/buefy/buefy/issues/602) Add ``changeMonth`` and ``changeYear`` events to datepicker
* [#604](https://github.com/buefy/buefy/issues/604) Add ``remove-on-keys`` prop to taginput, allowing to remove last tag (thanks @adrlen)
* [#609](https://github.com/buefy/buefy/issues/609) Add ``is-full-page`` prop to loading, to limit it to its container (thanks @adrlen)
* [#610](https://github.com/buefy/buefy/issues/610) Add ``visible`` prop to tabItem
* [#644](https://github.com/buefy/buefy/issues/644) Add ``clear-on-select`` prop to autocomplete (thanks @raniesantos)
* [#645](https://github.com/buefy/buefy/issues/645) Add ``selectable-dates`` prop to datepicker (thanks @pip63)
* [#682](https://github.com/buefy/buefy/issues/682) Add ``has-detailed-visible`` prop to table (thanks @wanxe)
* [#687](https://github.com/buefy/buefy/issues/687) Add ``focus-on`` prop to dialog

### Fixes and changes

* [#576](https://github.com/buefy/buefy/issues/576) Fix upload check file type
* [#586](https://github.com/buefy/buefy/issues/586) Fix dropdown change event
* [#593](https://github.com/buefy/buefy/issues/593) Fix timepicker update only time of Date object
* [#599](https://github.com/buefy/buefy/issues/599) Fix ``on-cancel`` prop to dialog, get called when clicking confirm
* [#648](https://github.com/buefy/buefy/issues/648) Fix dropdown emit change event (thanks @adrlen)
* [#670](https://github.com/buefy/buefy/issues/670) Fix tabs emit change event (thanks @adrlen)
* [#686](https://github.com/buefy/buefy/issues/686) Remove 'is-light' color to cancel button of dialog

## 0.6.3

### New features

* **New extension: Sortable.js**, [see here](https://buefy.org/extensions/sortablejs)
* **Update Bulma to 0.6.2**
* **Add Font Awesome 5 support** (http://fontawesome.com/)
* Add ``columns`` prop to table, you can now pass an array instead of adding scoped slots (for simple tables)
* Add ``rounded`` prop to Input, Select, Autocomplete, Datepicker and Timepicker, Pagination
* Add "is-toggle-rounded" type to Tabs
* Add ``open`` prop to collapse ``trigger`` slot
* Add ``native`` prop to upload
* [#222](https://github.com/buefy/buefy/issues/222) Add ``open-on-focus`` prop to autocomplete (good to simulate a select element)
* [#482](https://github.com/buefy/buefy/issues/482) Add ``allow-new`` prop to taginput
* [#483](https://github.com/buefy/buefy/issues/483) Add ``unselectable-days-of-week`` prop to datepicker
* [#487](https://github.com/buefy/buefy/issues/487) Add ``icon-size`` prop to message
* [#492](https://github.com/buefy/buefy/issues/492) Add isAsc parameter to ``custom-sort`` function of table (thanks @frantic1048)
* [#494](https://github.com/buefy/buefy/issues/494) Add ``unselectable-times`` prop to timepicker
* [#525](https://github.com/buefy/buefy/issues/525) Add ``pagination-size`` prop to table (thanks @nateleavitt)
* [#531](https://github.com/buefy/buefy/issues/531) Add ``confirm-key-codes`` prop to taginput

### Fixes and changes

* Remove ``max-results`` prop from autocomplete, it now has a scrollbar with all results
* [#493](https://github.com/buefy/buefy/issues/493) Fix ``keep-first`` autocomplete prop with async data
* [#498](https://github.com/buefy/buefy/issues/498) Fix horizontal field on mobile
* [#500](https://github.com/buefy/buefy/issues/500) Fix message position for horizontal field (thanks @electrolinux)
* [#543](https://github.com/buefy/buefy/issues/543) Fix dropdown toggle programmatic

## 0.6.2

### New features

* **New component: Tag Input**, [see docs](https://buefy.org/documentation/taginput) (thanks @jgerbes)
* [#125](https://github.com/buefy/buefy/issues/125) Add ``queue`` prop to toast/snackbar and ``defaultNoticeQueue`` constructor option
    * Note that the animations aren't perfect right now
* [#432](https://github.com/buefy/buefy/issues/432) **Datepicker improved**: can add event indicators on it (thanks @chasegiunta)
* [#439](https://github.com/buefy/buefy/issues/439) Add support to horizontal field, with the ``horizontal`` prop (thanks @electrolinux)
* Add ``mobile-native`` prop to datepicker and timepicker
* Add ``defaultDatepickerMobileNative`` and ``defaultTimepickerMobileNative`` constructor options
* Add ``events`` prop to modal (to bind events programmatically)
* Add ``position`` prop to datepicker and timepicker
* Add ``size`` prop to dialog
* Add ``tabstop`` and ``disabled`` props to tag
* Add ``.sync`` option to table ``current-page``

### Fixes and changes

* Maxlength counter for input only shows on focus
* Add padding to tab content
* Fix autocomplete with ``keep-first`` selecting on blur when nothing is shown
* Fix tabs buttons size sometimes flickering
* [#416](https://github.com/buefy/buefy/issues/416) Fix pagination color
* [#419](https://github.com/buefy/buefy/issues/419) Fix input icon size
* [#428](https://github.com/buefy/buefy/issues/428) Fix ``current-page`` from table to be reactive
* [#440](https://github.com/buefy/buefy/issues/440) Fix upload input file width (thanks @frantic1048)

## 0.6.1

* [#409](https://github.com/buefy/buefy/issues/409) Fix notification delete button
* [#410](https://github.com/buefy/buefy/issues/410) Fix alert triggering on upload

## 0.6.0

### Breaking changes

* Vue 2.5+ is now the minimum required version
* Bulma breaking changes, [see changelog](https://github.com/jgthms/bulma/blob/master/CHANGELOG.md#breaking-changes)
* **Removed** the deprecated prompt dialog ``inputPlaceholder``, ``inputName`` and ``inputMaxlength`` props
* Buefy now uses [MDI icons from community](https://materialdesignicons.com/) instead, you'll have to change icon names and if you use a CDN you should change:

```html
<link rel="stylesheet" href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css">
```

### New features

* **New component: Timepicker**, [see docs](https://buefy.org/documentation/timepicker)
* **New component: Checkbox Button**, [see docs](https://buefy.org/documentation/checkbox)
* **New docs section: Extensions**, [see here](https://buefy.org/extensions/cleavejs)
* Support for Bulma 0.6.1
* Add ``disabled`` prop to tabItem
* Add ``focusable`` prop to table
* Add ``focus()`` method to table
* Add ``hoverable`` prop to table
* Add ``custom-size`` prop to icon
* Add ``custom-class`` prop to icon
* Add ``detail-key`` and ``opened-detailed`` props to table (thanks @wanxe)
* Add ``scroll`` prop to modal/dialog (changes what to do with ``<body>`` scrollbar)
* Add ``parent`` prop to modal, pass a Vue object to it to open component modal programmatically
* [#359](https://github.com/buefy/buefy/issues/359) Add ``mobile-modal`` prop to dropdown to enable/disable modal on mobile
* [#365](https://github.com/buefy/buefy/issues/365) Add ``src/scss/utils/_all.scss`` for easier modular importing (thanks @gwvt)
* [#377](https://github.com/buefy/buefy/issues/377) Add support to MDI icons from community
* [#387](https://github.com/buefy/buefy/issues/387) Add ``current-page`` prop to table (thanks @frantic1048)
* [#388](https://github.com/buefy/buefy/issues/388) Add ``size`` prop to radio and checkbox
* [#398](https://github.com/buefy/buefy/issues/398) Add ``unselectable-dates`` prop to datepicker to disable an array of dates
* [#399](https://github.com/buefy/buefy/issues/399) Add configurable closing options for dialog (like modal)

### Fixes

* Update tooltip font size and padding, it's a bit bigger now
* Update table keyboard navigation, now doesn't require pressing enter and only works when ``focusable``
* [#288](https://github.com/buefy/buefy/issues/288) Fix input message from parent field (thanks @yarbshk)
* [#358](https://github.com/buefy/buefy/issues/358) Fix modal/dialog shifting content (``scroll`` prop)
* [#380](https://github.com/buefy/buefy/issues/380) Fix clearing autocomplete input
* [#395](https://github.com/buefy/buefy/issues/395) Fix ref dropdown availability (thanks @frantic1048)

## 0.5.4

* **Deprecated** prompt dialog ``inputPlaceholder``, ``inputName`` and ``inputMaxlength`` props, use new ``inputAttrs`` prop, [see docs](https://buefy.org/documentation/dialog)
* Fix ``focus`` method on select
* Table with ``selected`` prop can now be natigated with keyboard
* [#251](https://github.com/buefy/buefy/issues/251), [#345](https://github.com/buefy/buefy/issues/345) Add ``bottom-left`` slot to table
* [#334](https://github.com/buefy/buefy/issues/334) Add ``defaultDialogConfirmText`` and ``defaultDialogCancelText`` constructor options
* [#335](https://github.com/buefy/buefy/issues/335) Add ``icon`` and ``iconPack`` prop to dialog
* [#350](https://github.com/buefy/buefy/issues/350) Add Function type to ``component`` prop of modal (thanks @ivalkenburg)
* [#354](https://github.com/buefy/buefy/issues/354) Add tab key press to autocomplete (thanks @tmepple)
* [#356](https://github.com/buefy/buefy/issues/356) Fix table header alignment

## 0.5.3

* **New component: Collapse**, [see docs](https://buefy.org/documentation/collapse)
* **Panel deprecated**, use new Collapse component, [old docs here](https://buefy.org/documentation/panel)
* Update Bulma to v0.5.3
* [#223](https://github.com/buefy/buefy/issues/223) Add ``footer`` slot to table
* [#246](https://github.com/buefy/buefy/issues/246) Remove ``key`` on detailed rows of table component (thanks @Tirke)
* [#301](https://github.com/buefy/buefy/issues/301) Fix Bulma style override for radio and checkbox
* [#303](https://github.com/buefy/buefy/issues/303) Fix dropdown close on custom item when is replaced or changed
* [#305](https://github.com/buefy/buefy/issues/305) Fix datepicker calendar display when disabled and inline
* [#309](https://github.com/buefy/buefy/issues/309) Add ``labelFor`` prop to field component, to set native ``for`` attribute to the label tag (thanks @tmepple)
* [#314](https://github.com/buefy/buefy/issues/314) Set pack prop to next/prev icon buttons for datepicker
* [#315](https://github.com/buefy/buefy/issues/315) Fix escape regexp characters to autocomplete
* [#316](https://github.com/buefy/buefy/issues/316) Fix checkbox shrinking when text is very long (thanks @Tirke)
* [#317](https://github.com/buefy/buefy/issues/317) Add default datepicker constructor options
* [#324](https://github.com/buefy/buefy/issues/324) Fix table broken sort state
* [#330](https://github.com/buefy/buefy/issues/330) Fix table empty and detail disposition
* [#339](https://github.com/buefy/buefy/issues/339) Fix upload warning when is required
* [#340](https://github.com/buefy/buefy/issues/340) Add ``size`` prop to radio button

## 0.5.2

* [#262](https://github.com/buefy/buefy/issues/262) Add ``empty`` slot to autocomplete (empty message)
* [#264](https://github.com/buefy/buefy/issues/264) Add ``has-counter`` prop to input, add it when you want show or hide character counter when maxlength prop is passed
* [#265](https://github.com/buefy/buefy/issues/265) Fix disabled pagination (thanks @YassinOuider)
* [#272](https://github.com/buefy/buefy/issues/272) Add ``readonly`` prop to allow typing a date on datepicker
* [#273](https://github.com/buefy/buefy/issues/273) Fix autocomplete for SSR (thanks @LANSELOT)
* [#276](https://github.com/buefy/buefy/issues/276) Add ``first-day-of-week`` prop to datepicker
* [#279](https://github.com/buefy/buefy/issues/279) Fix table not default sorting async data
* [#289](https://github.com/buefy/buefy/issues/289) Fix dropdown-trigger container html tag
* [#291](https://github.com/buefy/buefy/issues/291) Add configurable closing options for Modal (thanks @jwahdatehagh)
* [#298](https://github.com/buefy/buefy/issues/298) Fix mobile detection datepicker for SSR
* [#302](https://github.com/buefy/buefy/issues/302) Fix datepicker calendar display when disabled

## 0.5.1

* **New component: Datepicker**, [see docs](https://buefy.org/documentation/datepicker) (thanks @bartboy011)
* **New component: Tag**, [see docs](https://buefy.org/documentation/tag)
* [#195](https://github.com/buefy/buefy/issues/195) Add ``custom-key`` prop to table column, add it when you want a column without label
* [#221](https://github.com/buefy/buefy/issues/221) Add backend pagination support to table (thanks @cappuc)
* [#214](https://github.com/buefy/buefy/issues/214) Add ``active`` prop to tooltip
* [#215](https://github.com/buefy/buefy/issues/215) Add ``header`` slot to table (custom headers)
* [#228](https://github.com/buefy/buefy/issues/228) Fix table checked rows not working on mobile
* [#235](https://github.com/buefy/buefy/issues/235) Add ``custom-is-checked`` prop to table column, add it when you want a custom compare function when is checkable
* [#237](https://github.com/buefy/buefy/issues/237) Fix emit blur event for input
* [#239](https://github.com/buefy/buefy/issues/239) Fix table columns on v-for loop
* [#241](https://github.com/buefy/buefy/issues/241) Fix remove tabItem when it's bounded to array
* [#242](https://github.com/buefy/buefy/issues/242) Update required Vue.js version (2.4+) (thanks @iwan-wijaya)
* [#243](https://github.com/buefy/buefy/issues/243) Add ``default-sort-direction`` prop to table, add it when you want change default sort direction on the first click
* [#260](https://github.com/buefy/buefy/issues/260) Fix radio/radio button emitting ``input`` multiple times (thanks @frantic1048)
* Add ``meta`` prop to table column, useful for custom headers
* Add ``type`` prop to switch (thanks @Tirke)
* Add ``multiple`` support to select
* Add ``inline`` prop to dropdown, items are shown inline and trigger removed
* Remove ``has-custom-template`` prop from autocomplete, just use scoped slot to have the same feature

## 0.5.0

### Breaking changes

* **Update Bulma to v0.5.1**, changes on Sass variables naming, [see docs](https://github.com/jgthms/bulma/blob/master/CHANGELOG.md#050)
    * Buefy Sass variables are also following the new convention
* **Removed Menu component**, it was experimental and wasn't good enough, needed too much to work and can easily be replaced with pure HTML
* Constructor option ``defaultContentElement`` renamed to ``defaultContainerElement``
* ``b-dropdown-option`` renamed to ``b-dropdown-item``
    * ``subheader`` prop renamed to ``custom``
* Any attributes on Input, Select and Autocomplete will be added directly to ``<input>`` or ``<select>`` itself instead of the root element
* ``change`` events for all form controls (Input, Select Autocomplete, Checkbox, RadioGroup, Switch) that returned pure value will now return ``$event`` (and require ``.native`` modifier), use ``input`` instead
* Checkbox ``custom-value`` prop renamed to ``native-value``
    * ``checked`` prop removed
* **Removed CheckboxGroup**, just add the same ``v-model`` to multiple Checkboxes and set a ``native-value``, [see docs](https://buefy.org/documentation/checkbox)
* Radio and Radio Button ``value`` prop renamed to ``native-value``
    * Add ``v-model`` support
    * Radio Buttons have to be wrapped on a field
* **Removed RadioGroup**, just add the same ``v-model`` to multiple Radios/RadioButtons and set a ``native-value`` [see docs](https://buefy.org/documentation/radio)
* Remove switch ``checked`` prop

### New stuff

* **New component: Upload**, [see docs](https://buefy.org/documentation/upload) (thanks @jtommy)
* Field ``position`` prop works for ``grouped`` fields
* Add ``group-multiline`` prop to field
* Add ``size`` prop to message
* [#191](https://github.com/buefy/buefy/issues/191) Add detail option (collapse) to table row, [see docs](https://buefy.org/documentation/table) (thanks @wanxe)
* [#201](https://github.com/buefy/buefy/issues/201) Add support to array on Field ``message`` prop (thanks @jtommy)
* [#207](https://github.com/buefy/buefy/issues/207) Add ``centered`` prop to table column
* Add ``native-value``, ``true-value`` and ``false-value`` props to switch

### Bug fixes

* [#206](https://github.com/buefy/buefy/issues/206) Fix radio and checkbox within ``v-for``

## 0.4.6

* **New component: Menu**, [see docs](https://buefy.org/documentation/menu) (thanks @tsctao)
* **New component: Panel**, [see docs](https://buefy.org/documentation/panel) (thanks @jtommy)
* **New component: Loading**, [see docs](https://buefy.org/documentation/loading) (thanks @jtommy)
* **Dropdown improved**: can add any content on it, can be triggered by hover, [see docs](https://buefy.org/documentation/dropdown)
* Remove ``narrowed`` prop from dropdown
* Update Bulma to v0.4.4
* Add CDN install method and JSFiddle examples
* Add boolean ``addons`` prop to field
* Fix message and notification inside ``.media`` element
* Fix pagination current page to not be clickable (thanks @jtommy)
* [#118](https://github.com/buefy/buefy/issues/118) Add Nuxt.js installation on docs
* [#171](https://github.com/buefy/buefy/issues/171) Fix modal not taking full width on mobile
* [#182](https://github.com/buefy/buefy/issues/182) Fix table not default sorting async data (thanks @jtommy)
* [#184](https://github.com/buefy/buefy/issues/184) Add ``input`` event on docs (input/autocomplete)
* [#190](https://github.com/buefy/buefy/issues/190) Add Vue.js required version on docs
* [#197](https://github.com/buefy/buefy/issues/197) Fix autocomplete ``expanded`` prop not working correctly

## 0.4.5

* Update Bulma to v0.4.3
* Page is now clipped when a modal/dialog is active (to avoid weird scroll behavior)
* Update modal docs example to not use the ``component`` prop, works better for events and is more common — Old way is not deprecated
* Remove programmatic component modal from docs since isn't a good practice and was causing too many issues
* Fix autocomplete ``focus()`` method
* [#106](https://github.com/buefy/buefy/issues/106) Fix prompt dialog vue-warning
* [#144](https://github.com/buefy/buefy/issues/144) Add ``rows`` prop to input (textarea)
* [#145](https://github.com/buefy/buefy/issues/145) Fix autocomplete not preventing form from submitting (thanks @jtommy)
* [#153](https://github.com/buefy/buefy/issues/153) Add return for ``checkHtml5Validity()`` method
* [#155](https://github.com/buefy/buefy/issues/155) Fix input/autocomplete ``change`` event (thanks @jtommy)
* [#157](https://github.com/buefy/buefy/issues/157) Fix table redundant level element generating extra padding
* [#159](https://github.com/buefy/buefy/issues/159) Fix modal with ``.modal-card`` responsiveness, added a ``has-modal-card`` prop
* [#165](https://github.com/buefy/buefy/issues/165) Fix safari button alignment on dialog (thanks @jtommy)
* [#154](https://github.com/buefy/buefy/issues/154) Add prop for when table data is empty (thanks @jtommy)
* [#170](https://github.com/buefy/buefy/issues/170) Fix dialogs min-width mobile

## 0.4.4

* [#139](https://github.com/buefy/buefy/issues/139) Fix notices durations and constructor options

## 0.4.3

* Update switch animation (it was laggy) and causing weird behavior within ``<keep-alive>`` components, [see updated animation](https://buefy.org/documentation/switch)
* Add tons of props to Autocomplete, [see here](https://buefy.org/documentation/autocomplete)
* **Dropdown button as addon now needs a ``.control`` element wrapping**
* Add some useful methods on docs for Input, Select, Autocomplete and Table
* Fix autocomplete list width
* [#38](https://github.com/buefy/buefy/issues/38) Add ``animation`` prop for dialog and modal, for custom animation (transition name)
* [#115](https://github.com/buefy/buefy/issues/115) Add ``row-class`` property to table to style row status, e.g.:

```html
    <b-table :data="tableData" :row-class="row => row.amount < 10 && 'is-warning'">[...]</b-table>
```

* [#117](https://github.com/buefy/buefy/issues/117) Fix table row loop missing ``key`` prop
* [#122](https://github.com/buefy/buefy/issues/122) Fix async tab-items
* [#124](https://github.com/buefy/buefy/issues/124) Toast, Dialog, Snackbar and Programmatic Modal exposed
* [#128](https://github.com/buefy/buefy/issues/128) Add default notices duration constructor options (thanks @quimarche)
* [#130](https://github.com/buefy/buefy/issues/130) Fix checkbox/switch not emitting change event when using keyboard (thanks @gongzza)
* [#132](https://github.com/buefy/buefy/issues/132) Add dropdown ``active-change`` event to know when it's dropdown list is active/visible (thanks @bartboy011)
* [#134](https://github.com/buefy/buefy/issues/134) Add ``true-value`` and ``false-value`` props to checkbox

## 0.4.2

* Fix Buefy installation

## 0.4.1

* Fix table sorting null values
* Table null values always come last when sorting
* Add icon support to select
* Fix dropdown to not stay on top of trigger
* Fix switch disable state
* Add click events for dropdown option
* Fix dropdown disable state
* Fix table columns not being reactive
* [#90](https://github.com/buefy/buefy/issues/90) Fix tabs with long elements (thanks @mirshko)
* [#91](https://github.com/buefy/buefy/issues/91) Update Bulma to v0.4.2
* [#96](https://github.com/buefy/buefy/issues/96) Add ``visible`` prop to table column
* [#102](https://github.com/buefy/buefy/issues/102) Fix anchor tag / router-link on dropdown
* [#104](https://github.com/buefy/buefy/issues/104) Fix numeric zero values on input's maxlength (thanks @iwan-wijaya)

## 0.4.0

### I've broke some stuff...

* Remove ``label``, ``icon`` and ``icon-pack`` properties from **DropdownOption** thanks to the new syntax, [see docs](https://buefy.org/documentation/dropdown)
* Remove ``content`` property from **TableColumn**, use ``v-html`` on an element inside TableColumn instead
* **Field**, **Snackbar** and **Toast** ``position`` property now needs the ``is-`` prefix (eg. ``is-top-left`` or ``is-centered``) — *Gotta fix these inconsistencies while it's still in beta*
* Remove ``on-off`` prop from Switch

### Additions and fixes

* **New component: Autocomplete**, [see docs](https://buefy.org/documentation/autocomplete)
* **Switch design overhaul**, [see new style](https://buefy.org/documentation/switch)
* Fix Tabs dynamic height
* Add one more Sass variable: ``$speed-slower: 250ms !default``
* Add ``size`` prop to Switch
* Add ``.sync`` modifier to Pagination ``current`` prop
* Add ``active`` property and changed animations of Notification and Message
* Add Dropdown within nav example
* All selections control (Checkbox, Radio, RadioButton and Switch) can now be focused and changed by keyboard
* [#69](https://github.com/buefy/buefy/issues/69) Add loading state to Table
* [#71](https://github.com/buefy/buefy/issues/71) Add background for checked rows on Table (thanks @mikejavier)
* [#72](https://github.com/buefy/buefy/issues/72) Fix Table overflow
* [#74](https://github.com/buefy/buefy/issues/74) Fix DropdownOption slots, can customize with HTML now
* [#76](https://github.com/buefy/buefy/issues/76) Modal close event accepts parameters (thanks @gongzza)
* [#77](https://github.com/buefy/buefy/issues/77) Add index to Table scoped slot (thanks @UrVerySpecial)
* [#78](https://github.com/buefy/buefy/issues/78) Fix Table sorting zero values (thanks @gwvt)
* [#82](https://github.com/buefy/buefy/issues/82) Fix Select with numeric zero value

## 0.3.2

* **New component: Tabs**, [see docs](https://buefy.org/documentation/tabs)
* Add ``content`` prop to TableColumn, use this instead of ``v-html`` or it might break on tables with ``mobile-cards`` (collapsed rows)
* Alert Dialog accepts string as well
* Dialog open with focus on confirm button (easier to just hit enter)
* Modal can be used in template as well (non programmatic)
* Table automatically scrolls if overflowed
* [#62](https://github.com/buefy/buefy/issues/62) Add sort direction with Table ``mobile-cards``
* [#67](https://github.com/buefy/buefy/issues/67) Fix Table sort null values

## 0.3.1

* Field ``grouped`` now also works on nested Fields
* Add Modal props
* Fix all animations
* Fix row click error
* Fix ``.sync`` modifier
* [#56](https://github.com/buefy/buefy/issues/56) Fix selection controls initial state always false
* [#58](https://github.com/buefy/buefy/issues/58) Fix Table ``checked-rows`` prop not updating on Chrome

## 0.3.0

### Modal

Show any content you want in a modal programatically, like an image:

```javascript
this.$modal.open(
    `<p class="image is-4by3">
        <img src="./static/placeholder-1280x960.png">
    </p>`
)
```

or a component:

```javascript
import CustomComponent from './components/CustomComponent'

this.$modal.open({
    component: CustomComponent
})
```

### Table

**Breakable changes on it**, now requires a scoped slot to wrap the columns, and a slot inside the column. You have now full control over the content of cells:

```html
<b-table :data="data">
    <template scope="props">
        <b-table-column field="id" label="ID" sortable numeric>
            {{ props.row.id }}
        </b-table-column>

        <b-table-column field="user.first_name" label="First Name" sortable>
            {{ props.row.user.first_name }}
        </b-table-column>

        <b-table-column field="date" label="Date" sortable
            v-html="formatDate(props.row.date)">
        </b-table-column>

        <b-table-column field="gender" label="Gender">
            <b-icon
                pack="fa"
                :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
            </b-icon>
            {{ props.row.gender }}
        </b-table-column>
    </template>
</b-table>
```
* Prop ``selectable`` renamed to ``selected`` and expects an Object, if you have Vuejs v2.3+ you can use the ``.sync`` modifier to make it two-way binding:

```html
<b-table :data="data" :selected.sync="selectedRow">
```

is the same as:

```html
<b-table :data="data" :selected="selectedRow" @select="row => selectedRow = row">
```

* Table new prop ``checked-rows`` that expects an Array, if you have Vuejs v2.3+ you can use the ``.sync`` modifier to make it two-way binding
* Table ``render-html`` prop removed thanks to the new syntax
* Column ``component`` prop removed thanks to the new syntax
* Column ``field`` prop now accepts nested object keys

### Other

* **Breaking:** Select ``b-option`` is now only ``option``
* **Breaking:** Dropdown ``b-option`` is now ``b-dropdown-option``
* Fix Dropdown background overlay index
* [#43](https://github.com/buefy/buefy/issues/43) Fix Dialog cancel button focus state
* [#50](https://github.com/buefy/buefy/issues/50) Add ``page-change`` event on Table
* [#52](https://github.com/buefy/buefy/issues/52) Fix Select option
* [#53](https://github.com/buefy/buefy/issues/53) Add ``type=button`` to notifications

## 0.2.2

* Update Vue to 2.2.6
* Update Bulma to 0.4.1
* [#35](https://github.com/buefy/buefy/issues/35) Fix Dropdown TypeError
* [#29](https://github.com/buefy/buefy/issues/29), [#39](https://github.com/buefy/buefy/issues/39) Fix SSR
* [#42](https://github.com/buefy/buefy/issues/42) Fix Table ``default-sort`` prop
* [#40](https://github.com/buefy/buefy/issues/40) Select now use native select, removed ``searchable`` property

## 0.2.1

* Add ``loading`` property to Select
* Fix Checkbox disabled style
* Fix Input not being validated when v-model is updated
* Fix Input ``loading`` overlapping other icons
* Fix Input ``password-reveal`` icon being overlapped by Field ``type`` icon
* [#23](https://github.com/buefy/buefy/issues/23) Fix Select with addons overflowing
* [#30](https://github.com/buefy/buefy/issues/30) Fix Table ``backend-sorting`` resetting sorted column
* [#33](https://github.com/buefy/buefy/issues/33) Fix Input and Select on-blur listener removing user-defined Field ``type`` and ``message``

## 0.2.0

* **New component: Select**
* **New component: Dropdown**
* **Breaking:** Rename Table property ``html`` to ``render-html``
* Fix Pagination buttons messing up at pages 3 and 4
* Fix Dialog keeping keyup event
* Fix prompt Dialog not validating before confirming
* [#6](https://github.com/buefy/buefy/issues/6) Fix docs not working on IE. Thanks to [AngelMunoz](https://github.com/AngelMunoz)!
* [#9](https://github.com/buefy/buefy/issues/9) Fix Table ``bordered`` sorted column
* [#10](https://github.com/buefy/buefy/issues/10) Add Table ``backend-sorting`` property and ``sort`` event
* [#14](https://github.com/buefy/buefy/issues/14) Add ``component`` property on Table. Thanks to [korpa](https://github.com/korpa)!

## 0.1.5

* Fix [#12](https://github.com/buefy/buefy/issues/12)
* Refactored Notification and Message
* Add animation when closing Notification and Message

## 0.1.4

* Fix [#5](https://github.com/buefy/buefy/issues/5) — now serving compiled files
* Fix [#6](https://github.com/buefy/buefy/issues/6) (partially) — docs now working on Edge
* Add "UI Elements" on docs to specify that the user can use anything from Bulma
* Redone the construtor options structure to work with the compiled build

## 0.1.2

* Fix Switch two-way data binding not working correctly
* Fix Radio animation not working properly
* Fix [#2](https://github.com/buefy/buefy/issues/2) — select arrow misplaced
* Fix Input's help message overlapping maxlength's counter
* Fix Table column sorting — should start with ASC
* Fix Table mobile sorting not working

## 0.1.1

* Fix [#1](https://github.com/buefy/buefy/issues/1) — ``lib`` folder not published

## 0.1.0

* **New component: Input**
* **New component: Field**
* Documentation done

## 0.0.3

* **New component: Message**
* **New component: Tooltip**
* **New component: Dialog**
* Add size option to Pagination
* Notification slightly modified to keep original Bulma style
* Toasts and Snackbars now queue between each other
* Toast duration reduced to 2s

## 0.0.2

* **New component: Pagination**
* **Component rework: Notify is now Snackbar**
* Table now uses the Pagination component
* Toasts are now queued
* Option to load components individually
