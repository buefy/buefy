# Buefy Changelog

## 0.2.3

* Fix Dropdown background overlay index
* #43 Fix Dialog cancel button focus state
* #50 Add ``page-change`` event on Table
* #52 Fix Select option

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
* **BREAKING:** Rename Table property ``html`` to ``render-html``
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
