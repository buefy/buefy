<p align="center">
    <a href="https://buefy.org">
        <img src="https://raw.githubusercontent.com/buefy/buefy/master/static/img/buefy-banner.png" />
    </a>
    <a href="https://github.com/buefy/buefy/releases"><img src="https://img.shields.io/github/v/release/buefy/buefy?logo=buefy&color=7957d5&labelColor=lightgrey" /></a>
    <a href="https://www.npmjs.com/package/buefy"><img src="https://img.shields.io/npm/v/buefy.svg?logo=npm" /></a>
    <a href="https://www.npmjs.com/package/buefy"><img src="https://img.shields.io/npm/dt/buefy.svg" /></a>
    <a href="https://circleci.com/gh/buefy/buefy"><img src="https://img.shields.io/circleci/project/github/buefy/buefy.svg?style=flat-square" /></a>
    <a href="https://codecov.io/gh/buefy/buefy"><img src="https://img.shields.io/codecov/c/github/buefy/buefy.svg?style=flat-square" /></a>
    <a href="https://discordapp.com/invite/ZkdFJMr"><img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg?logo=discord" /></a>
    <a href="https://buefy.org"><img src="https://img.shields.io/badge/code_style-buefy-7957d5.svg?style=flat-square" /></a>
</p>

> Buefy is a lightweight library of responsive UI components for [Vue.js](https://vuejs.org/) based on [Bulma](http://bulma.io/) framework and design.

## About this branch

This branch `buefy-next` aims at being Buefy for [Vue 3](https://vuejs.org).
The branch departed from the latest commit [#b6233b9c335d99cf688ee2a3b9c61fd26a92a182](https://github.com/buefy/buefy/commit/b6233b9c335d99cf688ee2a3b9c61fd26a92a182) on the [`dev`](https://github.com/buefy/buefy/tree/dev) branch as of July 4, 2023.

### Initial migration goal

The initial migration goal was to make the documentation page of every component work, and it was achieved.
Some features not used in the documentation pages may not work.
Please refer to [MIGRATION-NOTE.md](/MIGRATION-NOTE.md) for more details about what challenges we faced.

Due to focusing on the documentation pages:
- **Unit tests have not been updated at all**.
- **Extensions have not migrated**.
- **Server-side-rendering has neither been tested**.

### Breaking changes

Because not all of Vue 2 features could be reproduced with Vue 3, there are some breaking changes.
Please refer to [CHANGELOG.md](/CHANGELOG.md) for more details.
The biggest breaking change is obviously, **this does not work with Vue 2**.

### How to install

To install this fork, please run the following command,

```sh
npm install buefy@npm:@ntohq/buefy-next
```

The above command will install `@ntohq/buefy-next` under the `buefy` alias.
This is recommended because `@ntohq/buefy-next` will replace `buefy` when it becomes stable.

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

You need [Vue.js](https://vuejs.org/) **version 3.0+**. (Vue 2 is not supported)

### 1 Install via npm

```bash
npm install buefy@npm:@ntohq/buefy-next
```

### 2 Import and use Buefy

Bundle
```javascript
import { createApp } from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

const app = createApp();

app.use(Buefy);

```
or Individual Components
```javascript

import { createApp } from 'vue'
import { Field, Input } from 'buefy'
import 'buefy/dist/buefy.css'

const app = createApp();

app.use(Field)
app.use(Input)

```

### 3 Include Material Design Icons

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css">
```

If you want to customize the icons or the theme, refer to the [customization section on the documentation](https://buefy.org/documentation/customization).

### Alternatively, you can use a CDN or even download

```html
<!-- Buefy CSS -->
<link rel="stylesheet" href="https://unpkg.com/@ntohq/buefy-next/dist/buefy.min.css">

<!-- Buefy JavaScript -->
<script src="https://unpkg.com/@ntohq/buefy-next/dist/buefy.min.js"></script>
```

**Currently, including `buefy-next` via `<script>` is not working.**
Please see the issue [#221](https://github.com/ntohq/buefy-next/issues/221).

### Installing Developer Release(s) from GitHub npm Registry to Access the Latest Features
To incorporate the latest changes from the development branch of buefy-next, you can install developer releases from the GitHub npm registry. However, proceed with caution as these packages may be deleted or retracted without notice.

Steps:
1. Generate a Personal Access Token:

   Create a personal access token on GitHub with read access to the GitHub Packages registry.

2. Configure npm:

   In your terminal, execute the following commands:

    ```bash
    npm login --auth-type=legacy --registry=https://npm.pkg.github.com
     USERNAME: <their GitHub username>
     PASSWORD: <personal access token issued at Step 1>
    echo "@ntohq:registry=https://npm.pkg.github.com" > .npmrc
    ```

3. Select a Developer Release:

   Visit the Buefy-next package registry: https://github.com/ntohq/buefy-next/pkgs/npm/buefy-next on GitHub.

   Choose any developer release that suits your needs.
   - Consider the features and bug fixes introduced in each release.
   - Choose a more recent release if you need the latest features, but be aware of potential instabilities.
   - Opt for a slightly older release if stability is a higher priority.

   **Package Naming Conventions:**

   Buefy-next developer releases follow a specific naming format:

    ```
    @ntohq/buefy-next@<package version>-<dev commit hash>
    ```

   `<package version>`: This represents the intended stable release version that the developer release will eventually be included in.

   `<dev commit hash>`: This part indicates that it's a developer release and includes a unique commit hash that identifies the specific code changes in that release.


4. Install the Package:

   Copy the provided command from GitHub, which will resemble this:

    ```bash
    npm install buefy@npm:@ntohq/buefy-next@<package version>-<dev commit hash>
    ```

   Alternatively, to fetch the latest release from the developer snapshot registry, run:

    ```bash
    npm install buefy@npm:@ntohq/buefy-next@latest
    ```

   **However, note it is not recommended to use the latest version of our developer snapshot, as its stability fluctuates.**

Congratulations! You've successfully installed a Buefy-next developer package.

For further details on the GitHub npm registry refer to the [official GitHub documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package)

## Start On Cloud IDE

[https://github.com/buefy/buefy](https://github.com/buefy/buefy)

## Browser support

Recent versions of Firefox, Chrome, Edge, Opera and Safari. IE10+ is only partially supported.

## Contributing

Please see the [contributing guidelines](/.github/CONTRIBUTING.md)

## Versioning

Version will follow **v0.Y.Z**, where:

* **Y**: Major (breaking changes)
* **Z**: Minor or patch

## Core Team

<table>
  <tr>
    <td align="center"><a href="https://github.com/kikuomax"><img src="https://avatars.githubusercontent.com/u/3257531?v=4" width="80px;" alt=""/><br /><sub><b>Kikuo Emoto</b></sub></a><br /></td>
    <td align="center"><a href="https://twitter.com/wesdevpro"><img src="https://avatars.githubusercontent.com/u/11604664?v=4" width="80px;" alt=""/><br /><sub><b>Wesley Ford</b></sub></a><br /></td>
  </tr>
</table>

Special thanks to <a href="http://twitter.com/rafaelpimpa">Rafael Beraldo</a>, the original author, and <a href="https://twitter.com/walter_tommasi">Walter Tommasi</a>, a former core maintainter of Buefy.

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
