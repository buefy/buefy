# Buefy Changelog

## 0.1.6

* BREAKING: Rename Table property ``html`` to ``render-html``
* Fix #6 — Docs working on IE
* Fix #10 — Add Table ``backend-sorting`` property and ``sort`` event
* Fix #9 — Table ``bordered`` sorted column
* Fix Pagination buttons messing up at pages 3 and 4
* Fix Dialog keeping keyup event

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
