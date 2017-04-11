# Buefy

[![npm](https://img.shields.io/npm/v/buefy.svg)]()
[![npm](https://img.shields.io/npm/dt/buefy.svg)]()
[![npm](https://img.shields.io/npm/l/buefy.svg)]()

Buefy is a lightweight library of responsive UI components for [Vue.js](https://vuejs.org/) based on [Bulma](http://bulma.io/) framework and design.

[![Buefy](https://github.com/rafaelpimpa/buefy/blob/master/static/buefy-banner.png)](https://buefy.github.io)

## Features

* Keep your current Bulma theme / variables easily

* Supports both [Material Design Icons](https://material.io/icons/) and [FontAwesome](http://fontawesome.io/)

* Very lightweight with none internal dependencies aside from Vue & Bulma

* Semantic code output

* Follows Bulma design and some of the [Material Design UX](https://material.io/)

* Focus on usability and performance without *over-animations*

## Documentation and Demo

The documentation is in the docs directory, it serves as the demo as well.

Browse the [online documentation here](https://buefy.github.io).

## Quick Start

### Install via npm

```bash
npm install buefy
```

### Import and use Buefy. You can also enable individual components:

```javascript
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)

// OR

Vue.component(Buefy.Checkbox.name, Buefy.Checkbox)
Vue.component(Buefy.Table.name, Buefy.Table)
...
```

### Include Material Design Icons

```html
<link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">
```

**Note:** If you want to customize the icons or the theme, access the [customization section on the online documentation](https://buefy.github.io/#/documentation/customization).

## Browser Support

[x] Firefox 52+
[x] Chrome 57+
[x] Edge 38+
[x] Opera 44+
[ ] Safari (needs testing)
[ ] Internet Explorer (not working)

## Credits and Thanks

* [Vue.js](https://vuejs.org/) for the great reactive js framework
* [Bulma](http://bulma.io/) for the best flexbox css framework out there
* The original idea from [vue-admin](https://github.com/vue-bulma/vue-admin)
* Some code structure and ideas from:
    * [vue-blu](https://github.com/chenz24/vue-blu)
    * [vue-material](https://vuematerial.github.io/)
    * [element-ui](http://element.eleme.io/)

## Copyright and License

Copyright (c) 2017 Rafael Beraldo. Code released under the [MIT]((https://github.com/rafaelpimpa/buefy/blob/master/LICENSE)) license.

---

> Twitter [@rafaelpimpa](https://twitter.com/rafaelpimpa)
