> Thanks for contributing!

# Raising an Issue

* Make sure the issue hasn't been raised yet
* Include **screenshots** or animated GIFs in your issue whenever needed (if visual issue)

# Submitting a Pull Request

* The ``master`` branch is a snapshot of the latest release. **Submit your PR in the ``dev`` branch**
* Include **screenshots** or animated GIFs in your pull request whenever needed (if visual changes)
* It's OK to have multiple small commits as you work on the PR - we will let GitHub automatically squash it before merging
* **DO NOT** commit the ``lib`` and ``dist`` folder, use it only for testing on your end
* If adding new feature:
    * Provide convincing reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it

## Principles

### 1. Desktop and Mobile support

It has to work, **and** have great UX on both platforms.

### 2. Lightweight and simple

* Keep it simple.
* Performance is UX, keep it lightweight.
* Avoid HTML-only components, if it doesn't need JavaScript, then it doesn't need Vue (with a few exceptions).

### 3. Keep Bulma design

Buefy is based on Bulma, let's keep its design.

### 4. Transitions / Animations GPU-based only

The only properties that uses hardware acceleration are:

* transform
* opacity
* filter

These are two great articles about it: https://medium.com/outsystems-experts/how-to-achieve-60-fps-animations-with-css3-db7b98610108 and https://www.sitepoint.com/introduction-to-hardware-acceleration-css-animations/.

And here is one about the FLIP technique (which ``<transition-group>`` uses internally): https://aerotwist.com/blog/flip-your-animations/.

## Buefy Javascript styleguide

Add comments if method is too complex and/or whenever you judge necessary.

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
