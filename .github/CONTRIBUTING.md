> Thanks for contributing!

# Use of AI

We're fine with contributors using AI tools (Copilot, ChatGPT, Claude, etc.) to help write code, draft issues, or debug problems — used well, they lower the barrier to contributing. In return, we ask for honesty and accountability, in line with what most other open source projects now expect:

- **Disclose it.** If AI materially helped produce a PR's code or an issue's content, say so — check the corresponding box in the issue/PR template. This isn't about shaming AI use, it just helps maintainers calibrate how closely to review.
- **You are responsible for it.** Submitting a contribution means you've read, understood, and verified it yourself. "The AI wrote it" is not an excuse for bugs, style violations, made-up APIs, or failing tests. Review AI output as critically as you would a stranger's patch.
- **No fabricated or unverified bug reports.** Don't file issues describing behavior you haven't actually reproduced. Hallucinated stack traces, invented reproduction steps, or "plausible sounding" bugs waste maintainer time and will be closed.
- **No unreviewed bulk/"slop" PRs.** Large AI-generated changes that weren't meaningfully reviewed by a human, or that exist mainly to pad a contribution history, will be closed without much discussion.
- **Respect licensing.** Only submit AI-generated code you have the right to contribute under Buefy's license — don't paste in output you know reproduces copyrighted/licensed source without permission.
- **Everything else still applies.** AI-assisted contributions go through the same bar as any other: tests must pass, lint must be clean, and the guidelines below still hold.

# Raising an Issue

- Make sure the issue hasn't been raised yet
- Include **screenshots** or animated GIFs in your issue whenever needed (if visual issue)

# Submitting a Pull Request

- The `master` branch is a snapshot of the latest release. **Submit your PR in the `dev` branch**
- Include **screenshots** or animated GIFs in your pull request whenever needed (if visual changes)
- It's OK to have multiple small commits as you work on the PR - we will let GitHub automatically squash it before merging
- Make sure all the unit tests pass by running `npm test` both in the library and documentation
- Make sure your code style is consistent by running `npm run lint:fix` both in the library and documentation
- **DO NOT** commit the `lib` and `dist` folder, use it only for testing on your end
- If adding new feature:
    - Provide convincing reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it

## Principles

### 1. Desktop and Mobile support

It has to work, **and** have great UX on both platforms.

### 2. Lightweight and simple

- Keep it simple.
- Performance is UX, keep it lightweight.
- Avoid HTML-only components, if it doesn't need JavaScript, then it doesn't need Vue (with a few exceptions).

### 3. Keep Bulma design

Buefy is based on Bulma, let's keep its design.

### 4. Transitions / Animations GPU-based only

The only properties that uses hardware acceleration are:

- transform
- opacity
- filter

These are two great articles about it: https://medium.com/outsystems-experts/how-to-achieve-60-fps-animations-with-css3-db7b98610108 and https://www.sitepoint.com/introduction-to-hardware-acceleration-css-animations/.

And here is one about the FLIP technique (which `<transition-group>` uses internally): https://aerotwist.com/blog/flip-your-animations/.

## Buefy Javascript styleguide

- Follow the [ESLint](https://eslint.vuejs.org) rules: `npm run lint`
- Add comments if method is too complex and/or whenever you judge necessary.

## Buefy Sass styleguide

- **Always on a separated file** in `/src/scss/components`
- **Use .scss extension**
- **Use kebab-case**
- Use only **classes**
- Use only **double quotes** `"`
- Use only **rem** or **em** for `padding`, `margin` and `font-size`
- **No trailing space**
- End files with a **new line**
- Order the CSS rule by:
    - direct styles
    - nested tags
    - pseudo-classes
    - modifiers
    - responsive styles

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

You need [Node.js](https://nodejs.org/) **version >= 20**.

Node 18 is intentionally excluded because current build-tool engine and security requirements are aligned to Node 20+.

After cloning the repo, run:

```bash
npm install
```

## Buefy core library

The core source files of Buefy are in the [`packages/buefy`](../packages/buefy/) folder.

```bash
cd packages/buefy
```

### Checking types

```bash
npm run type-check
```

### Running unit tests

```bash
npm test
```

### Checking the code style and formatting

```bash
npm run lint
```

You can apply the automatic fixes by running:

```bash
npm run lint:fix
```

### Bundling the library

```bash
npm run build
```

You can find the bundled files in the `dist` folder.

## Buefy documentation

The source files of the Buefy documentation are in the [`packages/docs`](../packages/docs/) folder.

```bash
cd packages/docs
```

### Starting a development server

```bash
npm run dev
```

The documentation will be served at <https://localhost:5173/>.

### Checking types

```bash
npm run type-check
```

### Checking the code style and formatting

```bash
npm run lint
```

You can apply the automatic fixes by running:

```bash
npm run lint:fix
```

### Bundling the documentation

Prerequisite: [Bundling the library](#bundling-the-library)

```bash
npm run build
```

You can preview the production build by running:

```bash
npm run preview
```

As some type errors may be detected only in the production build, you should also perform type checking for the production build:

```bash
npm run build:type-check
```

# Releasing

Publishing to npm happens automatically via the `Publish buefy to NPM` GitHub Actions workflow ([`.github/workflows/npm_deploy.yml`](workflows/npm_deploy.yml)), which runs when a **GitHub Release is published from the `main` branch**. Pushing commits or tags on their own does not trigger a publish.

To cut a release:

1. Bump the `version` field in the root `package.json`, `packages/buefy/package.json`, and `packages/docs/package.json` to the same value.
2. Add a new entry to [`CHANGELOG.md`](../CHANGELOG.md) summarizing the changes.
3. Merge these changes into `main`.
4. On GitHub, [draft a new Release](https://github.com/buefy/buefy/releases/new) targeting `main`, tagged `vX.Y.Z` to match the bumped version, and publish it.

Publishing to npm uses [Trusted Publishing](https://docs.npmjs.com/trusted-publishers) (OIDC) — there is no long-lived `NPM_TOKEN` secret to manage. The `buefy` package's Trusted Publisher configuration on npmjs.com must reference this repository and the `npm_deploy.yml` workflow for publishes to succeed.
