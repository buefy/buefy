# Buefy

Buefy is a lightweight library of responsive UI components for [Vue.js](https://vuejs.org/) based on [Bulma](http://bulma.io/) framework and design.

## Features

* Keep your current Bulma theme / variables easily

* Supports both [Material Design Icons](https://material.io/icons/) and [FontAwesome](http://fontawesome.io/)

* Very lightweight with minimum internal dependencies

* Semantic code output

* Follows Bulma design and some of the Material Design UX

## Documentation and Demo

The documentation is in the docs directory, and it's built using only Buefy — so it's serves as the demo as well.

Browse the [online documentation here](https://buefy.github.io).

## Install

Not public yet.

## Quick Start

**Note:** Already includes Bulma — the Buefy purple theme — if you want to use your own theme / variables go to the [customization section on the online documentation](soon).

Import and use Buefy. You can also enable individual components:
```
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/lib/css/buefy.css'

Vue.use(Buefy)

// OR

Vue.component(Buefy.Checkbox.name, Buefy.Checkbox)
Vue.component(Buefy.Table.name, Table.Checkbox)
...
```

## Dependencies

Basically the essential:

* [Vue.js](https://vuejs.org/) 2+
* [Material Design Icons](https://material.io/icons/) or [FontAwesome](http://fontawesome.io/) — Your call

## Browser Support

JavaScript depends on your building. CSS is from [Bulma Browser Support](https://github.com/jgthms/bulma#browser-support).

## License

MIT

## Credits and Thanks

* [Vue.js](https://vuejs.org/) for the great reactive js framework
* [Bulma](http://bulma.io/) for the best flexbox css framework out there
* The original idea from [vue-admin](https://github.com/vue-bulma/vue-admin)
* Some code structure and ideas from [vue-blu](https://github.com/chenz24/vue-blu) and [vue-material](https://vuematerial.github.io/)

---

> Twitter [@rafaelpimpa](https://twitter.com/rafaelpimpa)
