# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Buefy is a Vue 3 UI component library built on [Bulma CSS](https://bulma.io/documentation/). It is organized as an npm workspaces monorepo:

- `packages/buefy/` — the component library
- `packages/docs/` — the Vite-based docs/demo site

## Commands

All library commands run from `packages/buefy/`. All docs commands run from `packages/docs/`.

### Library (`packages/buefy/`)

```bash
npm run build           # Full build: JS bundles + SCSS + TypeScript declarations
npm run build:js        # JS/TS only (Rollup)
npm run build:scss      # SCSS → CSS only
npm run build:dts       # TypeScript declarations only
npm run lint:fix        # Auto-fix ESLint issues
npm run lint            # Verify lint (run after lint:fix)
npm run type-check      # TypeScript type check (no emit)
npm run unit            # Full test suite
npm run unit -- src/components/button/   # Tests for a single component
npm run unit:update     # Re-run tests and update snapshots
```

### Docs (`packages/docs/`)

```bash
npm run dev             # Vite dev server (hot-reloads against library source directly)
npm run build           # Type-check + Vite production build
npm run preview         # Serve the production build locally
```

### Required order before committing

Build **must** run before tests because tests depend on compiled artifacts:

1. `npm run build` (from `packages/buefy/`)
2. `npm run lint:fix && npm run lint`
3. `npm run unit`

## Architecture

### Component structure

Each component lives in its own folder under `src/components/`:

```
src/components/button/
├── Button.vue           # Main component (Options API + defineComponent)
├── Button.spec.ts       # Unit tests — colocated with component
├── __snapshots__/
└── index.ts             # Plugin registration + named exports
```

Related variants (e.g., `CheckboxButton.vue`) share the same folder as their primary component.

SCSS is **not** colocated — it lives in `src/scss/components/_componentname.scss`.

### Component implementation conventions

- Use `defineComponent()` with Options API (not Composition API).
- Import shared behavior from mixins in `src/utils/` (e.g., `CheckRadioMixin`, `FormElementMixin`).
- Export with the `B` prefix: `export { Button as BButton }`.

Plugin registration pattern (`index.ts`):

```typescript
import type { App } from "vue";
import Button from "./Button.vue";
import { registerComponent } from "../../utils/plugins";

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Button);
    },
};

export default Plugin;
export { Button as BButton };
```

### Shared utilities (`src/utils/`)

| File | Purpose |
|------|---------|
| `CheckRadioMixin.ts` | Shared checkbox/radio behavior |
| `FormElementMixin.ts` | Shared form input behavior |
| `MessageMixin.ts` / `NoticeMixin.ts` | Alert/notification base |
| `TabbedMixin.ts` / `TabbedChildMixin.ts` | Tab container behavior |
| `ProviderParentMixin.ts` / `InjectedChildMixin.ts` | Parent-child injection |
| `config.ts` | Global Buefy configuration |
| `helpers.ts`, `color.ts`, `icons.ts` | Utilities |
| `ssr.ts` | SSR guards |

### SCSS conventions

- Files: `src/scss/components/_componentname.scss` (lowercase, underscore prefix)
- Use Bulma CSS variables: `cv.getVar('primary')`, `cv.getVar('primary-invert')`
- Three CSS output variants are built: full (with Bulma reset), standalone, no-reset

### Docs app structure (`packages/docs/src/`)

Component documentation follows a fixed module pattern:

```
src/pages/components/<component>/
├── Component.vue          # Doc page, imports examples + API data
├── examples/              # Runnable code snippets shown inline
├── api/<component>.ts     # Props/events/slots/methods table data
└── variables/<component>.ts  # CSS variables table data
```

When adding or renaming a docs page, update all three navigation sources together:

1. `src/router/index.ts` — route definition
2. `src/data/routes.json` — page metadata (title, breadcrumbs, `githubPath`, `isNew`/`isUpdated` flags)
3. `src/data/menu.json` — sidebar placement

The docs dev server uses a custom Vite plugin (`link-buefy-src`) that redirects `import 'buefy'` to `packages/buefy/src/index.ts`, so the library does not need to be rebuilt while editing docs.

## Testing conventions

- Use `shallowMount` for component isolation.
- Include snapshot tests for rendered HTML.
- For bug fixes, add a regression test that fails before the fix and passes after.
- Mixin tests are colocated alongside the mixin file in `src/utils/`.

## Docs update requirement

Update `packages/docs` whenever a change is user-visible: props, events, slots, defaults, emitted values, CSS variables, new/removed/deprecated features, or install/config changes.

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>
```

- Types: `fix`, `feat`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`
- Scope: component or module name (e.g., `checkbox`, `button`)
- Subject: imperative mood, no capital first letter, no trailing period, max 50 characters
- Footer: `Fixes #4251` or `Related to #1234`

Examples:
- `fix(checkbox): generate checkmark SVG with concrete colors (#4251)`
- `feat(dialog): add promise-based API for async workflows`
