> Thanks for contributing!

# Raising an Issue

* Make sure the issue hasn't been raised yet
* Include **screenshots** or animated GIFs in your issue whenever needed (if visual issue)

# Submitting a Pull Request

* Include **screenshots** or animated GIFs in your pull request whenever needed (if visual changes)
* Use the **present** tense ("Add feature" not "Added feature")
* Limit the first line to 72 characters or fewer
* Reference issues and pull requests liberally
* **DO NOT** commit the ``lib`` folder, use it only for testing on your end

## Buefy Javascript styleguide

* Follow the rules in ``.eslintrc.json``, general:
    * **Use camelCase**
    * **No semi-colons** `;`
    * **4 spaces indentation**
    * Use only ``const`` or ``let``
    * **No trailing space**
    * End files with a **new line**
* Keep lines with 120 characters or less
* Add a comment block before every **method**, **watcher** and **computed property** explaining what it does, with this template:
```javascript
/**
 * Calculates if the dropdown list is horizontally visible when activated,
 * otherwise it is openened upwards.
 */
```
* Add one-line comment inside any block whenever you judge necessary
* Order Vue instance by:
    * name
    * mixins
    * components
    * props
    * data properties
    * computed properties
    * watchers
    * methods
    * directives
    * filters
    * lifecycle hooks
        * beforeCreate
        * created
        * beforeMount
        * mounted
        * beforeDestroy
        * destroyed

## Buefy Sass styleguide

* **Always on a separated file** in ``/src/scss/components``
* **Use .scss extension**
* **Use kebab-case**
* Use only **classes**
* Use only **double quotes** ``"``
* Use only **rem** or **em** for ``padding``, ``margin`` and ``font-size``
* **No trailing space**
* End files with a **new line**
* Order the CSS rule by:
    * direct styles
    * nested tags
    * pseudo-classes
    * modifiers
    * responsive styles

Sass example:
```scss
.element {
    // Direct styles
    @extend .something;
    @include mixin;
    property: value;
    // Nested tags
    span {
        // ...
    }
    .child {
        // ...
    }
    // Pseudo-classes
    &:before {
        // ...
    }
    // Modifiers
    &.is-active {
        // ...
    }
    &.has-icon {
        // ...
    }
    // Responsive styles
    @include mobile {
        // ...
    }
    @include tablet {
        // ...
    }
}
```

# Development Setup

You need [Node.js](http://nodejs.org/) **version 6+**.

After cloning the repo, run:

```bash
$ npm install
```

Common used NPM scripts:

```bash
# serve docs with hot reload at localhost:8080
$ npm run dev

# build lib in /lib folder
$ npm run build:lib

# build docs in /dist folder
$ npm run build:docs

# build docs and lib
$ npm run build
```
