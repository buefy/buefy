# Copilot Instructions

Monorepo: `packages/buefy` (library) · `packages/docs` (Vite docs site). Stack: Vue 3, TypeScript, Bulma CSS.

## Core Principles

- Preserve public API behavior unless a breaking change is explicitly requested.
- Make the smallest viable change; follow existing patterns before introducing new ones.
- Keep SSR/browser/mobile compatibility checks explicit when touching platform-specific code.

## Build → Lint → Test (Required Order)

Run from `packages/buefy/` before any commit or review:

1. `npm run build` — full build (JS, SCSS, types); tests depend on compiled output
2. `npm run lint:fix && npm run lint`
3. `npm run unit` — or `npm run unit -- src/components/<name>/` for a focused run

If full execution is blocked, report which steps were skipped and why.

## Component Conventions

- `defineComponent()` + Options API (not Composition API).
- Shared behavior via mixins in `src/utils/` (`CheckRadioMixin`, `FormElementMixin`, etc.).
- Exports use `B` prefix: `export { Button as BButton }`.
- SCSS lives in `src/scss/components/_componentname.scss` — not colocated.
- Each component folder: `Component.vue`, `Component.spec.ts`, `__snapshots__/`, `index.ts`.

## Test Requirements

- Update or create tests for every component change.
- Bug fixes require a regression test that fails before the fix and passes after.
- Use `shallowMount`; include snapshot tests for rendered HTML.

## Docs Updates (`packages/docs`)

Update docs for any user-visible change: props, events, slots, defaults, CSS variables, behavior, or install/config changes. If no update is needed, state why explicitly.

Per-component docs structure:
- `src/pages/components/<component>/<Component>.vue` — docs page
- `src/pages/components/<component>/examples/` — runnable snippets
- `src/pages/components/<component>/api/<component>.ts` — API table
- `src/pages/components/<component>/variables/<component>.ts` — CSS vars table

When adding/renaming/removing a docs page, update all three navigation sources together:
1. `src/router/index.ts`
2. `src/data/routes.json` (title, breadcrumbs, `githubPath`, flags)
3. `src/data/menu.json`

## Typing and Safety

- Avoid new `any` types without justification.
- `@ts-expect-error` requires a short inline reason; link to an issue when possible.
- Keep `eslint-disable` scoped as narrowly as possible.

## Comments

Explain *why*, not *what*. Use `TODO(#issue)` / `FIXME(#issue)` for incomplete work. Remove stale comments.

## Change Hygiene

- Touch only files relevant to the task; do not reformat unrelated code.

## Commit Messages

[Conventional Commits](https://www.conventionalcommits.org/) — subject line ≤ 50 chars, imperative mood, no trailing period.

```
<type>(<scope>): <subject>

<body — what and why, not how>

<footer — Fixes #N or Related to #N>
```

Types: `fix` `feat` `docs` `style` `refactor` `perf` `test` `build` `ci` `chore`

Examples:
- `fix(checkbox): generate checkmark SVG with concrete colors`
- `feat(dialog): add promise-based API for async workflows`

## References

- Bulma CSS: https://bulma.io/documentation/
- Conventional Commits: https://www.conventionalcommits.org/
