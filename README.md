<p align="center">
    <a href="https://buefy.org">
        <img src="https://github.com/buefy/buefy/blob/dev/static/img/buefy-banner.png" />
    </a>
    <a href="https://www.npmjs.com/package/buefy"><img src="https://img.shields.io/npm/v/buefy.svg" /></a>
    <a href="https://www.npmjs.com/package/buefy"><img src="https://img.shields.io/npm/dt/buefy.svg" /></a>
    <a href="https://circleci.com/gh/buefy/buefy"><img src="https://img.shields.io/circleci/project/github/buefy/buefy.svg?style=flat-square" /></a>
    <a href="https://codecov.io/gh/buefy/buefy"><img src="https://img.shields.io/codecov/c/github/buefy/buefy.svg?style=flat-square" /></a>
    <a href="https://www.npmjs.com/package/buefy"><img src="https://img.shields.io/npm/l/buefy.svg" /></a>
    <a href="https://discordapp.com/invite/ZkdFJMr"><img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" /></a>
    <a href="https://buefy.org"><img src="https://img.shields.io/badge/code_style-buefy-7957d5.svg?style=flat-square" /></a>
</p>

> Buefy is a lightweight library of responsive UI components for [Vue.js](https://vuejs.org/) based on [Bulma](http://bulma.io/) framework and design.

## Features

* Keep your current Bulma theme / variables easily
* Supports both [Material Design Icons](https://materialdesignicons.com/) and [FontAwesome](http://fontawesome.io/)
* Very lightweight with none internal dependencies aside from Vue & Bulma
* About 60KB min+gzip (with Bulma included)
* Semantic code output
* Follows Bulma design and some of the [Material Design UX](https://material.io/)
* Focus on usability and performance without *over-animating* stuff

## Documentation

The documentation is in the docs directory, it serves as the demo as well.

Browse [online documentation here](https://buefy.org/).

## Quick start

You need [Vue.js](https://vuejs.org/) **version 2.5+**.

### 1 Install via npm

```bash
npm install buefy
```

### 2 Import and use Buefy

Bundle
```javascript
import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.use(Buefy);

```
or Individual Components
```javascript

import Vue from 'vue'
import { Field, Input } from 'buefy/dist/components'
import 'buefy/dist/buefy.css'

Vue.use(Field)
Vue.use(Input)

or

import Vue from 'vue'
import Field from 'buefy/dist/components/field'
import Input from 'buefy/dist/components/input'
import 'buefy/dist/buefy.css'

Vue.use(Field)
Vue.use(Input)
```

### 3 Include Material Design Icons

```html
<link rel="stylesheet" href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css">
```

If you want to customize the icons or the theme, refer to the [customization section on the documentation](https://buefy.org/#/documentation/customization).

### Alternatively, you can use a CDN or even download

```html
<!-- Buefy CSS -->
<link rel="stylesheet" href="https://unpkg.com/buefy/dist/buefy.min.css">

<!-- Buefy JavaScript -->
<script src="https://unpkg.com/buefy/dist/buefy.min.js"></script>
```

## Browser support

Recent versions of Firefox, Chrome, Edge, Opera and Safari. IE10+ is only partially supported.

## Versioning

While it's still in beta, version will follow **v0.Y.Z**, where:

* **Y**: Major (breaking changes)
* **Z**: Minor or patch

## Maintainers

* [Walter Tommasi](https://twitter.com/walter_tommasi)

## Supporting through Patreon

Buefy is an open source MIT project if you are interested in supporting this project, please consider becoming a patron.
<p align="center">
  <a href="https://www.patreon.com/jtommy">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patron" />
  </a>
</p>

## License

Code released under [MIT](https://github.com/buefy/buefy/blob/master/LICENSE) license.

Copyright (c), [Rafael Beraldo](https://twitter.com/rafaelpimpa).
