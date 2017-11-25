# Buefy

[![npm](https://img.shields.io/npm/v/buefy.svg)]()
[![npm](https://img.shields.io/npm/dt/buefy.svg)]()
[![npm](https://img.shields.io/npm/l/buefy.svg)]()

Buefy is a lightweight library of responsive UI components for [Vue.js](https://vuejs.org/) based on [Bulma](http://bulma.io/) framework and design.

[![Buefy](https://github.com/rafaelpimpa/buefy/blob/dev/static/img/buefy-banner.png)](https://buefy.github.io)

## Features

* Keep your current Bulma theme / variables easily
* Supports both [Material Design Icons](https://materialdesignicons.com/) and [FontAwesome](http://fontawesome.io/)
* Very lightweight with none internal dependencies aside from Vue & Bulma
* About 60KB min+gzip (with Bulma included)
* Semantic code output
* Follows Bulma design and some of the [Material Design UX](https://material.io/)
* Focus on usability and performance without *over-animations*

## Documentation

The documentation is in the docs directory, it serves as the demo as well.

Browse [online documentation here](https://buefy.github.io).

## Quick start

You need [Vue.js](https://vuejs.org/) **version 2.5+**.

### 1 Install via npm

```bash
npm install buefy
```

### 2 Import and use Buefy

```javascript
import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

Vue.use(Buefy);

// OR

Vue.component(Buefy.Checkbox.name, Buefy.Checkbox);
Vue.component(Buefy.Table.name, Buefy.Table);
Vue.component(Buefy.Switch.name, Buefy.Switch);
```

### 3 Include Material Design Icons

```html
<link rel="stylesheet" href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css">
```

If you want to customize the icons or the theme, refer to the [customization section on the documentation](https://buefy.github.io/#/documentation/customization).

### Alternatively, you can use a CDN or even download

```html
<!-- Buefy CSS -->
<link rel="stylesheet" href="https://unpkg.com/buefy/lib/buefy.min.css">

<!-- Buefy JavaScript -->
<script src="https://unpkg.com/buefy"></script>
```

```javascript
// Global variable
Vue.use(Buefy.default)
```

## Browser support

Recent versions of Firefox, Chrome, Edge, Opera and Safari. IE10+ is only partially supported.

## Versioning

While it's still in beta, version will follow **v0.Y.Z**, where:

* **Y**: Major (breaking changes)
* **Z**: Minor or patch

## Stay in touch

* [Twitter](https://twitter.com/rafaelpimpa)

## Collaborators

* Walter Tommasi — [@jtommy](https://github.com/jtommy)

## License

Code released under [MIT]((https://github.com/rafaelpimpa/buefy/blob/master/LICENSE)) license.

Copyright (c) 2017, Rafael Beraldo.
