# Buefy Changelog

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
* #1233 Change left margin to right margin when spacing nested fields (thanks @yxngl)

### Fixes

* #1177 Fix IE/Edge datepicker content size
* #1216 Fix reset v-model when upload cancel
* #1219 Fix modal ``width`` prop (thanks @yxngl)

## 0.7.2

### New features

* Add ``header`` autocomplete slot to taginput
* Add ``required`` prop to switch
* Add ``mobile-sort-placeholder`` prop to table
* Add ``contextmenu`` event to table (thanks @gps-dev)
* Add ``show-detail-icon`` prop to table and toggle row detail programmatically (thanks @omer2500)
* Add ``use-html5-validation`` prop to form components and ``defaultUseHtml5Validation`` constructor options (thanks @lukio3)
* #1164 Disable selecting row on checkbox click when table is ``checkable``

### Fixes

* Fix taginput when ``allow-new`` is enabled
* Fix pagination order when simple
* #1126 Fix init sort using columns table prop
* #898, #1154 Fix browser autocomplete using multiple fields

## 0.7.1

### New features

* **Update Bulma to 0.7.2**
* Add ``indeterminate`` prop to checkbox (thanks @guanzo)
* #1029 Upgrade vue-test-utils to latest version (thanks @lordfuoco)
* #1065 Add tab as confirm key code to taginput (thanks @williamabbott)
* #1083 Add ``date-creator`` prop to datepicker (thanks @jonagoldman)

### Fixes

* #1024 Fix upload SSR support
* #1027 Fix ``icon-pack`` prop when individual components
* #1040 Fix prevent radio with multi-line text from shrinking (thanks @rhwilr)
* #1067 Fix IE 11 UI switch (thanks @patrickabkarian)
* #1072 Fix sorting boolean fields

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
* #970 Add Object type to ``type`` prop of field and icon

### Fixes

* Updated timepicker style (it's a little smaller now)
* #992 Fix table header disappear with pagination
* #999 Fix ``size`` prop to datepicker and timepicker

## 0.6.7

### New features

* **Table improved**: can change columns dynamically
* Add ``auto-close`` and ``duration`` props to message and notification
* Add ``allow-duplicates`` prop to taginput
* Add ``required`` prop to radio and checkbox
* Add ``defaultInputHasCounter`` constructor options

### Fixes and changes

* #839 Fix ``icon-pack`` from icon to be reactive
* #840 Fix loading position to tagInput (thanks @adrlen)
* #852 Fix label class to field when horizontal
* #872 Fix datepicker default formatter
* #895 Fix loading overlay when not in full page (thanks @adrlen)
* #927 Fix autocomplete when option text is too long (thanks @8bu)
* #948 Fix switch when multi line text (thanks @rhwilr)

## 0.6.6

### New features

* **Update Bulma to 0.7.1**
* Add ``header`` slot to autocomplete
* Add ``type`` prop to checkbox and radio
* Add ``on-paste-separators`` and ``before-adding`` props to tagInput
* #830 Add ``ellipsis`` prop to tagInput and tag components

### Fixes and changes

* #746 Fix default ``dateFormatter`` function to datepicker
* #755 Fix arrow centered when table detail (thanks @wanxe)
* #787 Fix type in horizontal field when message is empty
* #814 Reset scroll to modal before destroy
* #481 Fix tagInput height to match other inputs

## 0.6.5

* Revert some changes on Checkbox, CheckboxButton, Radio, RadioButton, Select and Switch, working as before now
* #711 Fix click event to switch (thanks @adrlen)
* #712 Fix SSR support (thanks @anteriovieira)
* #719 Fix ``header`` slot to tabItem
* #718 Fix ``changeMonth`` and ``changeYear`` events to datepicker in ``change-month`` and ``change-year``
* #727 Fix upload check file
* #730 Fix field with addons not updating on re-render (tanks @arlen)

## 0.6.4

### New features

* **Add nuxt-buefy on docs**, [see here](https://buefy.org/#/documentation/start) (thanks @anteriovieira)
* Add ``indefinite`` prop to snackbar
* Add ``header`` slot to datepicker
* Add ``header`` slot to tabItem
* #485 Add ``custom-class`` prop to field (thanks @docnoe)
* #509 Add autocomplete slot support to taginput (thanks @gkinsman)
* #581 Add ``is-row-checkable`` prop to table (thanks @jvmonjo)
* #602 Add ``changeMonth`` and ``changeYear`` events to datepicker
* #604 Add ``remove-on-keys`` prop to taginput, allowing to remove last tag (thanks @adrlen)
* #609 Add ``is-full-page`` prop to loading, to limit it to its container (thanks @adrlen)
* #610 Add ``visible`` prop to tabItem
* #644 Add ``clear-on-select`` prop to autocomplete (thanks @raniesantos)
* #645 Add ``selectable-dates`` prop to datepicker (thanks @pip63)
* #682 Add ``has-detailed-visible`` prop to table (thanks @wanxe)
* #687 Add ``focus-on`` prop to dialog

### Fixes and changes

* #576 Fix upload check file type
* #586 Fix dropdown change event
* #593 Fix timepicker update only time of Date object
* #599 Fix ``on-cancel`` prop to dialog, get called when clicking confirm
* #648 Fix dropdown emit change event (thanks @adrlen)
* #670 Fix tabs emit change event (thanks @adrlen)
* #686 Remove 'is-light' color to cancel button of dialog

## 0.6.3

### New features

* **New extension: Sortable.js**, [see here](https://buefy.org/#/extensions/sortablejs)
* **Update Bulma to 0.6.2**
* **Add Font Awesome 5 support** (http://fontawesome.com/)
* Add ``columns`` prop to table, you can now pass an array instead of adding scoped slots (for simple tables)
* Add ``rounded`` prop to Input, Select, Autocomplete, Datepicker and Timepicker, Pagination
* Add "is-toggle-rounded" type to Tabs
* Add ``open`` prop to collapse ``trigger`` slot
* Add ``native`` prop to upload
* #222 Add ``open-on-focus`` prop to autocomplete (good to simulate a select element)
* #482 Add ``allow-new`` prop to taginput
* #483 Add ``unselectable-days-of-week`` prop to datepicker
* #487 Add ``icon-size`` prop to message
* #492 Add isAsc parameter to ``custom-sort`` function of table (thanks @frantic1048)
* #494 Add ``unselectable-times`` prop to timepicker
* #525 Add ``pagination-size`` prop to table (thanks @nateleavitt)
* #531 Add ``confirm-key-codes`` prop to taginput

### Fixes and changes

* Remove ``max-results`` prop from autocomplete, it now has a scrollbar with all results
* #493 Fix ``keep-first`` autocomplete prop with async data
* #498 Fix horizontal field on mobile
* #500 Fix message position for horizontal field (thanks @electrolinux)
* #543 Fix dropdown toggle programmatic

## 0.6.2

### New features

* **New component: Tag Input**, [see docs](https://buefy.org/#/documentation/taginput) (thanks @jgerbes)
* #125 Add ``queue`` prop to toast/snackbar and ``defaultNoticeQueue`` constructor option
    * Note that the animations aren't perfect right now
* #432 **Datepicker improved**: can add event indicators on it (thanks @chasegiunta)
* #439 Add support to horizontal field, with the ``horizontal`` prop (thanks @electrolinux)
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
* #416 Fix pagination color
* #419 Fix input icon size
* #428 Fix ``current-page`` from table to be reactive
* #440 Fix upload input file width (thanks @frantic1048)

## 0.6.1

* #409 Fix notification delete button
* #410 Fix alert triggering on upload

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

* **New component: Timepicker**, [see docs](https://buefy.org/#/documentation/timepicker)
* **New component: Checkbox Button**, [see docs](https://buefy.org/#/documentation/checkbox)
* **New docs section: Extensions**, [see here](https://buefy.org/#/extensions/cleavejs)
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
* #359 Add ``mobile-modal`` prop to dropdown to enable/disable modal on mobile
* #365 Add ``src/scss/utils/_all.scss`` for easier modular importing (thanks @gwvt)
* #377 Add support to MDI icons from community
* #387 Add ``current-page`` prop to table (thanks @frantic1048)
* #388 Add ``size`` prop to radio and checkbox
* #398 Add ``unselectable-dates`` prop to datepicker to disable an array of dates
* #399 Add configurable closing options for dialog (like modal)

### Fixes

* Update tooltip font size and padding, it's a bit bigger now
* Update table keyboard navigation, now doesn't require pressing enter and only works when ``focusable``
* #288 Fix input message from parent field (thanks @yarbshk)
* #358 Fix modal/dialog shifting content (``scroll`` prop)
* #380 Fix clearing autocomplete input
* #395 Fix ref dropdown availability (thanks @frantic1048)

## 0.5.4

* **Deprecated** prompt dialog ``inputPlaceholder``, ``inputName`` and ``inputMaxlength`` props, use new ``inputAttrs`` prop, [see docs](https://buefy.org/#/documentation/dialog)
* Fix ``focus`` method on select
* Table with ``selected`` prop can now be natigated with keyboard
* #251, #345 Add ``bottom-left`` slot to table
* #334 Add ``defaultDialogConfirmText`` and ``defaultDialogCancelText`` constructor options
* #335 Add ``icon`` and ``iconPack`` prop to dialog
* #350 Add Function type to ``component`` prop of modal (thanks @ivalkenburg)
* #354 Add tab key press to autocomplete (thanks @tmepple)
* #356 Fix table header alignment

## 0.5.3

* **New component: Collapse**, [see docs](https://buefy.org/#/documentation/collapse)
* **Panel deprecated**, use new Collapse component, [old docs here](https://buefy.org/#/documentation/panel)
* Update Bulma to v0.5.3
* #223 Add ``footer`` slot to table
* #246 Remove ``key`` on detailed rows of table component (thanks @Tirke)
* #301 Fix Bulma style override for radio and checkbox
* #303 Fix dropdown close on custom item when is replaced or changed
* #305 Fix datepicker calendar display when disabled and inline
* #309 Add ``labelFor`` prop to field component, to set native ``for`` attribute to the label tag (thanks @tmepple)
* #314 Set pack prop to next/prev icon buttons for datepicker
* #315 Fix escape regexp characters to autocomplete
* #316 Fix checkbox shrinking when text is very long (thanks @Tirke)
* #317 Add default datepicker constructor options
* #324 Fix table broken sort state
* #330 Fix table empty and detail disposition
* #339 Fix upload warning when is required
* #340 Add ``size`` prop to radio button

## 0.5.2

* #262 Add ``empty`` slot to autocomplete (empty message)
* #264 Add ``has-counter`` prop to input, add it when you want show or hide character counter when maxlength prop is passed
* #265 Fix disabled pagination (thanks @YassinOuider)
* #272 Add ``readonly`` prop to allow typing a date on datepicker
* #273 Fix autocomplete for SSR (thanks @LANSELOT)
* #276 Add ``first-day-of-week`` prop to datepicker
* #279 Fix table not default sorting async data
* #289 Fix dropdown-trigger container html tag
* #291 Add configurable closing options for Modal (thanks @jwahdatehagh)
* #298 Fix mobile detection datepicker for SSR
* #302 Fix datepicker calendar display when disabled

## 0.5.1

* **New component: Datepicker**, [see docs](https://buefy.org/#/documentation/datepicker) (thanks @bartboy011)
* **New component: Tag**, [see docs](https://buefy.org/#/documentation/tag)
* #195 Add ``custom-key`` prop to table column, add it when you want a column without label
* #221 Add backend pagination support to table (thanks @cappuc)
* #214 Add ``active`` prop to tooltip
* #215 Add ``header`` slot to table (custom headers)
* #228 Fix table checked rows not working on mobile
* #235 Add ``custom-is-checked`` prop to table column, add it when you want a custom compare function when is checkable
* #237 Fix emit blur event for input
* #239 Fix table columns on v-for loop
* #241 Fix remove tabItem when it's bounded to array
* #242 Update required Vue.js version (2.4+) (thanks @iwan-wijaya)
* #243 Add ``default-sort-direction`` prop to table, add it when you want change default sort direction on the first click
* #260 Fix radio/radio button emitting ``input`` multiple times (thanks @frantic1048)
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
* **Removed CheckboxGroup**, just add the same ``v-model`` to multiple Checkboxes and set a ``native-value``, [see docs](https://buefy.org/#/documentation/checkbox)
* Radio and Radio Button ``value`` prop renamed to ``native-value``
    * Add ``v-model`` support
    * Radio Buttons have to be wrapped on a field
* **Removed RadioGroup**, just add the same ``v-model`` to multiple Radios/RadioButtons and set a ``native-value`` [see docs](https://buefy.org/#/documentation/radio)
* Remove switch ``checked`` prop

### New stuff

* **New component: Upload**, [see docs](https://buefy.org/#/documentation/upload) (thanks @jtommy)
* Field ``position`` prop works for ``grouped`` fields
* Add ``group-multiline`` prop to field
* Add ``size`` prop to message
* #191 Add detail option (collapse) to table row, [see docs](https://buefy.org/#/documentation/table) (thanks @wanxe)
* #201 Add support to array on Field ``message`` prop (thanks @jtommy)
* #207 Add ``centered`` prop to table column
* Add ``native-value``, ``true-value`` and ``false-value`` props to switch

### Bug fixes

* #206 Fix radio and checkbox within ``v-for``

## 0.4.6

* **New component: Menu**, [see docs](https://buefy.org/#/documentation/menu) (thanks @tsctao)
* **New component: Panel**, [see docs](https://buefy.org/#/documentation/panel) (thanks @jtommy)
* **New component: Loading**, [see docs](https://buefy.org/#/documentation/loading) (thanks @jtommy)
* **Dropdown improved**: can add any content on it, can be triggered by hover, [see docs](https://buefy.org/#/documentation/dropdown)
* Remove ``narrowed`` prop from dropdown
* Update Bulma to v0.4.4
* Add CDN install method and JSFiddle examples
* Add boolean ``addons`` prop to field
* Fix message and notification inside ``.media`` element
* Fix pagination current page to not be clickable (thanks @jtommy)
* #118 Add Nuxt.js installation on docs
* #171 Fix modal not taking full width on mobile
* #182 Fix table not default sorting async data (thanks @jtommy)
* #184 Add ``input`` event on docs (input/autocomplete)
* #190 Add Vue.js required version on docs
* #197 Fix autocomplete ``expanded`` prop not working correctly

## 0.4.5

* Update Bulma to v0.4.3
* Page is now clipped when a modal/dialog is active (to avoid weird scroll behavior)
* Update modal docs example to not use the ``component`` prop, works better for events and is more common — Old way is not deprecated
* Remove programmatic component modal from docs since isn't a good practice and was causing too many issues
* Fix autocomplete ``focus()`` method
* #106 Fix prompt dialog vue-warning
* #144 Add ``rows`` prop to input (textarea)
* #145 Fix autocomplete not preventing form from submitting (thanks @jtommy)
* #153 Add return for ``checkHtml5Validity()`` method
* #155 Fix input/autocomplete ``change`` event (thanks @jtommy)
* #157 Fix table redundant level element generating extra padding
* #159 Fix modal with ``.modal-card`` responsiveness, added a ``has-modal-card`` prop
* #165 Fix safari button alignment on dialog (thanks @jtommy)
* #154 Add prop for when table data is empty (thanks @jtommy)
* #170 Fix dialogs min-width mobile

## 0.4.4

* #139 Fix notices durations and constructor options

## 0.4.3

* Update switch animation (it was laggy) and causing weird behavior within ``<keep-alive>`` components, [see updated animation](https://buefy.org/#/documentation/switch)
* Add tons of props to Autocomplete, [see here](https://buefy.org/#/documentation/autocomplete)
* **Dropdown button as addon now needs a ``.control`` element wrapping**
* Add some useful methods on docs for Input, Select, Autocomplete and Table
* Fix autocomplete list width
* #38 Add ``animation`` prop for dialog and modal, for custom animation (transition name)
* #115 Add ``row-class`` property to table to style row status, e.g.:

```html
    <b-table :data="tableData" :row-class="row => row.amount < 10 && 'is-warning'">[...]</b-table>
```

* #117 Fix table row loop missing ``key`` prop
* #122 Fix async tab-items
* #124 Toast, Dialog, Snackbar and Programmatic Modal exposed
* #128 Add default notices duration constructor options (thanks @quimarche)
* #130 Fix checkbox/switch not emitting change event when using keyboard (thanks @gongzza)
* #132 Add dropdown ``active-change`` event to know when it's dropdown list is active/visible (thanks @bartboy011)
* #134 Add ``true-value`` and ``false-value`` props to checkbox

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
* #90 Fix tabs with long elements (thanks @mirshko)
* #91 Update Bulma to v0.4.2
* #96 Add ``visible`` prop to table column
* #102 Fix anchor tag / router-link on dropdown
* #104 Fix numeric zero values on input's maxlength (thanks @iwan-wijaya)

## 0.4.0

### I've broke some stuff...

* Remove ``label``, ``icon`` and ``icon-pack`` properties from **DropdownOption** thanks to the new syntax, [see docs](https://buefy.org/#/documentation/dropdown)
* Remove ``content`` property from **TableColumn**, use ``v-html`` on an element inside TableColumn instead
* **Field**, **Snackbar** and **Toast** ``position`` property now needs the ``is-`` prefix (eg. ``is-top-left`` or ``is-centered``) — *Gotta fix these inconsistencies while it's still in beta*
* Remove ``on-off`` prop from Switch

### Additions and fixes

* **New component: Autocomplete**, [see docs](https://buefy.org/#/documentation/autocomplete)
* **Switch design overhaul**, [see new style](https://buefy.org/#/documentation/switch)
* Fix Tabs dynamic height
* Add one more Sass variable: ``$speed-slower: 250ms !default``
* Add ``size`` prop to Switch
* Add ``.sync`` modifier to Pagination ``current`` prop
* Add ``active`` property and changed animations of Notification and Message
* Add Dropdown within nav example
* All selections control (Checkbox, Radio, RadioButton and Switch) can now be focused and changed by keyboard
* #69 Add loading state to Table
* #71 Add background for checked rows on Table (thanks @mikejavier)
* #72 Fix Table overflow
* #74 Fix DropdownOption slots, can customize with HTML now
* #76 Modal close event accepts parameters (thanks @gongzza)
* #77 Add index to Table scoped slot (thanks @UrVerySpecial)
* #78 Fix Table sorting zero values (thanks @gwvt)
* #82 Fix Select with numeric zero value

## 0.3.2

* **New component: Tabs**, [see docs](https://buefy.org/#/documentation/tabs)
* Add ``content`` prop to TableColumn, use this instead of ``v-html`` or it might break on tables with ``mobile-cards`` (collapsed rows)
* Alert Dialog accepts string as well
* Dialog open with focus on confirm button (easier to just hit enter)
* Modal can be used in template as well (non programmatic)
* Table automatically scrolls if overflowed
* #62 Add sort direction with Table ``mobile-cards``
* #67 Fix Table sort null values

## 0.3.1

* Field ``grouped`` now also works on nested Fields
* Add Modal props
* Fix all animations
* Fix row click error
* Fix ``.sync`` modifier
* #56 Fix selection controls initial state always false
* #58 Fix Table ``checked-rows`` prop not updating on Chrome

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
* #43 Fix Dialog cancel button focus state
* #50 Add ``page-change`` event on Table
* #52 Fix Select option
* #53 Add ``type=button`` to notifications

## 0.2.2

* Update Vue to 2.2.6
* Update Bulma to 0.4.1
* #35 Fix Dropdown TypeError
* #29, #39 Fix SSR
* #42 Fix Table ``default-sort`` prop
* #40 Select now use native select, removed ``searchable`` property

## 0.2.1

* Add ``loading`` property to Select
* Fix Checkbox disabled style
* Fix Input not being validated when v-model is updated
* Fix Input ``loading`` overlapping other icons
* Fix Input ``password-reveal`` icon being overlapped by Field ``type`` icon
* #23 Fix Select with addons overflowing
* #30 Fix Table ``backend-sorting`` resetting sorted column
* #33 Fix Input and Select on-blur listener removing user-defined Field ``type`` and ``message``

## 0.2.0

* **New component: Select**
* **New component: Dropdown**
* **Breaking:** Rename Table property ``html`` to ``render-html``
* Fix Pagination buttons messing up at pages 3 and 4
* Fix Dialog keeping keyup event
* Fix prompt Dialog not validating before confirming
* #6 Fix docs not working on IE. Thanks to [AngelMunoz](https://github.com/AngelMunoz)!
* #9 Fix Table ``bordered`` sorted column
* #10 Add Table ``backend-sorting`` property and ``sort`` event
* #14 Add ``component`` property on Table. Thanks to [korpa](https://github.com/korpa)!

## 0.1.5

* Fix #12
* Refactored Notification and Message
* Add animation when closing Notification and Message

## 0.1.4

* Fix #5 — now serving compiled files
* Fix #6 (partially) — docs now working on Edge
* Add "UI Elements" on docs to specify that the user can use anything from Bulma
* Redone the construtor options structure to work with the compiled build

## 0.1.2

* Fix Switch two-way data binding not working correctly
* Fix Radio animation not working properly
* Fix #2 — select arrow misplaced
* Fix Input's help message overlapping maxlength's counter
* Fix Table column sorting — should start with ASC
* Fix Table mobile sorting not working

## 0.1.1

* Fix #1 — ``lib`` folder not published

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
