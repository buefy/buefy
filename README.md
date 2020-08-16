<p align="center">
    <a href="https://buefy.org">
        <img src="https://raw.githubusercontent.com/buefy/buefy/master/static/img/buefy-banner.png" />
    </a>
    <a href="https://github.com/buefy/buefy/releases"><img src="https://img.shields.io/github/v/release/buefy/buefy?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUxpcXpW1npW1npW1npW1npW1npW1npW1npW1npW1npW1npW1npW1npW1npW1npW1opGJjYAAAAPdFJOUwAKxPTjm0FusSKBFTBX1eRe1+UAAAEzSURBVCjPdZKxSgNBEIbnCk+CEaIgSIhFtAmobKXYXSecKHcQxDInvkBAsbA59bSyyCE+gr2xt9InsPAV1MYme3JB0N/Z292LFvmLYedndvab3SUaJ2fmX9p4OW/tpaN84QKsrb7N3UQCqwmu7Paj7AQI5/BljLr3OgF0q8GP2XOYRbOQkSNkpDsEOd0gS0tjHj4dYFCrBJk++AmnFOOTpjGsFUaMkDrI6RqbumcHZ47AuitkV1MI+JUAawl2DJbYeHa9Al33dHb3aRJ4XwI+dMk9kQJttJFFdjoFSnVg2RoKlKYEvq2hQInumM4oLpZxYRu2nFSFNRQoxx6GpoBBfb4Gr7wyXjaJh8O2MRg0pGpPRS0F+nALDNISFC0eBSsjUCX5Vj7U4yLr8rj/56FZ437BL2W5ltKCnKBjAAAAV3pUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHic4/IMCHFWKCjKT8vMSeVSAAMjCy5jCxMjE0uTFAMTIESANMNkAyOzVCDL2NTIxMzEHMQHy4BIoEouAOoXEXTyQjWVAAAAAElFTkSuQmCC&color=7957d5&labelColor=lightgrey" /></a>
    <a href="https://www.npmjs.com/package/buefy"><img src="https://img.shields.io/npm/v/buefy.svg?logo=npm" /></a>
    <a href="https://www.npmjs.com/package/buefy"><img src="https://img.shields.io/npm/dt/buefy.svg" /></a>
    <a href="https://circleci.com/gh/buefy/buefy"><img src="https://img.shields.io/circleci/project/github/buefy/buefy.svg?style=flat-square" /></a>
    <a href="https://codecov.io/gh/buefy/buefy"><img src="https://img.shields.io/codecov/c/github/buefy/buefy.svg?style=flat-square" /></a>
    <a href="https://discordapp.com/invite/ZkdFJMr"><img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg?logo=discord" /></a>
    <a href="https://buefy.org"><img src="https://img.shields.io/badge/code_style-buefy-7957d5.svg?style=flat-square" /></a>
</p>

> Buefy is a lightweight library of responsive UI components for [Vue.js](https://vuejs.org/) based on [Bulma](http://bulma.io/) framework and design.

## Features

* Keep your current Bulma theme / variables easily
* Supports both [Material Design Icons](https://materialdesignicons.com/) and [FontAwesome](http://fontawesome.io/)
* Very lightweight with none internal dependencies aside from Vue & Bulma
* About 88KB min+gzip (with Bulma included)
* Semantic code output
* Follows Bulma design and some of the [Material Design UX](https://material.io/)
* Focus on usability and performance without *over-animating* stuff

## Documentation

The documentation is in the docs directory, it serves as the demo as well.

Browse [online documentation here](https://buefy.org/).

## Quick start

You need [Vue.js](https://vuejs.org/) **version 2.6+**.

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
import { Field, Input } from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Field)
Vue.use(Input)

```

### 3 Include Material Design Icons

```html
<link rel="stylesheet" href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css">
```

If you want to customize the icons or the theme, refer to the [customization section on the documentation](https://buefy.org/documentation/customization).

### Alternatively, you can use a CDN or even download

```html
<!-- Buefy CSS -->
<link rel="stylesheet" href="https://unpkg.com/buefy/dist/buefy.min.css">

<!-- Buefy JavaScript -->
<script src="https://unpkg.com/buefy/dist/buefy.min.js"></script>
```

## Browser support

Recent versions of Firefox, Chrome, Edge, Opera and Safari. IE10+ is only partially supported.

## Contributing

Please see the [contributing guidelines](./.github/CONTRIBUTING.md)

## Versioning

While it's still in beta, version will follow **v0.Y.Z**, where:

* **Y**: Major (breaking changes)
* **Z**: Minor or patch

## Core Team

<table>
  <tr>
    <td align="center"><a href="https://twitter.com/walter_tommasi"><img src="https://avatars0.githubusercontent.com/u/8029488?v=4" width="80px;" alt=""/><br /><sub><b>Walter Tommasi</b></sub></a><br /></td>
  </tr>
</table>

Special thanks to <a href="http://twitter.com/rafaelpimpa">Rafael Beraldo</a>, the original author.

## Supporting through Patreon

Buefy is an open source MIT project if you are interested in supporting this project, please consider becoming a patron.
<p align="center">
  <a href="https://www.patreon.com/jtommy">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patron" />
  </a>
</p>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://twitter.com/rafaelpimpa"><img src="https://avatars2.githubusercontent.com/u/18370605?v=4" width="80px;" alt=""/><br /><sub><b>Rafael Beraldo</b></sub></a><br /><a href="https://github.com/buefy/buefy/commits?author=rafaelpimpa" title="Code">💻</a></td>
    <td align="center"><a href="https://edutechno.ca"><img src="https://avatars1.githubusercontent.com/u/12817388?v=4" width="80px;" alt=""/><br /><sub><b>Alexandre Paradis</b></sub></a><br /><a href="https://github.com/buefy/buefy/commits?author=service-paradis" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/yxngl"><img src="https://avatars0.githubusercontent.com/u/1696853?v=4" width="80px;" alt=""/><br /><sub><b>Yuxing Liao</b></sub></a><br /><a href="https://github.com/buefy/buefy/commits?author=yxngl" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/adrlen"><img src="https://avatars2.githubusercontent.com/u/1764097?v=4" width="80px;" alt=""/><br /><sub><b>Adrien</b></sub></a><br /><a href="https://github.com/buefy/buefy/commits?author=adrlen" title="Code">💻</a></td>
    <td align="center"><a href="http://paypal.me/apolokak"><img src="https://avatars2.githubusercontent.com/u/30395693?v=4" width="80px;" alt=""/><br /><sub><b>Apolokak Lab</b></sub></a><br /><a href="https://github.com/buefy/buefy/commits?author=apolokaklab" title="Code">💻</a></td>
    <td align="center"><a href="http://owen.com.br"><img src="https://avatars1.githubusercontent.com/u/1490347?v=4" width="80px;" alt=""/><br /><sub><b>Antério Vieira</b></sub></a><br /><a href="https://github.com/buefy/buefy/commits?author=anteriovieira" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/wanxe"><img src="https://avatars3.githubusercontent.com/u/10264065?v=4" width="80px;" alt=""/><br /><sub><b>Jorge Nieto</b></sub></a><br /><a href="https://github.com/buefy/buefy/commits?author=wanxe" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mateuswetah"><img src="https://avatars0.githubusercontent.com/u/1184874?v=4" width="80px;" alt=""/><br /><sub><b>Mateus Machado Luna</b></sub></a><br /><a href="https://github.com/buefy/buefy/commits?author=mateuswetah" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/buefy/buefy/graphs/contributors"><br /><sub><b>All contributors</b></sub></a><br /></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License <a href="https://github.com/buefy/buefy/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/buefy.svg?logo=github" /></a>

Code released under [MIT](https://github.com/buefy/buefy/blob/master/LICENSE) license.
