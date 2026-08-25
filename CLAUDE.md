# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Buefy is a Vue 3 UI component library built on [Bulma CSS](https://bulma.io/documentation/). It is organized as an npm workspaces monorepo:

- `packages/buefy/` — the component library
- `packages/docs/` — the Vite-based docs/demo site

## Commands

All library commands run from `packages/buefy/`. All docs commands run from `packages/docs/`.

### Required order before committing

Build **must** run before tests because tests depend on compiled artifacts:

1. `npm run build` (from `packages/buefy/`)
2. `npm run lint:fix && npm run lint`
3. `npm run unit`

Architecture, component conventions, and testing conventions for the library live in [packages/buefy/CLAUDE.md](packages/buefy/CLAUDE.md). Docs app structure lives in [packages/docs/CLAUDE.md](packages/docs/CLAUDE.md).

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
