# Buefy Changelog

## 0.4.6

* **New component: Menu**, [see docs](https://buefy.github.io/#/documentation/menu) (thanks @tsctao)
* **New component: Panel**, [see docs](https://buefy.github.io/#/documentation/panel) (thanks @jtommy)
* **New component: Loading**, [see docs](https://buefy.github.io/#/documentation/loading) (thanks @jtommy)
* **Dropdown improved**: can add any content on it, can be triggered by hover, [see docs](https://buefy.github.io/#/documentation/dropdown)
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

* Update switch animation (it was laggy) and causing weird behavior within ``<keep-alive>`` components, [see updated animation](https://buefy.github.io/#/documentation/switch)
* Add tons of props to Autocomplete, [see here](https://buefy.github.io/#/documentation/autocomplete)
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

* Remove ``label``, ``icon`` and ``icon-pack`` properties from **DropdownOption** thanks to the new syntax, [see docs](https://buefy.github.io/#/documentation/dropdown)
* Remove ``content`` property from **TableColumn**, use ``v-html`` on an element inside TableColumn instead
* **Field**, **Snackbar** and **Toast** ``position`` property now needs the ``is-`` prefix (eg. ``is-top-left`` or ``is-centered``) — *Gotta fix these inconsistencies while it's still in beta*
* Remove ``on-off`` prop from Switch

### Additions and fixes

* **New component: Autocomplete**, [see docs](https://buefy.github.io/#/documentation/autocomplete)
* **Switch design overhaul**, [see new style](https://buefy.github.io/#/documentation/switch)
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

* **New component: Tabs**, [see docs](https://buefy.github.io/#/documentation/tabs)
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
