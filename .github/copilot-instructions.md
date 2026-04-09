# Copilot Instructions

## Purpose

These instructions guide AI-assisted contributions for the Buefy monorepo.

## Scope and Context

- Monorepo with npm workspaces.
- Main library package: `packages/buefy`.
- Docs/demo package: `packages/docs`.
- Primary stack: Vue 3, TypeScript, Node.js tooling.

## Core Principles

- Preserve existing public API behavior unless the task explicitly requests a breaking change.
- Prefer small, targeted edits over broad refactors.
- Follow existing repository patterns before introducing new ones.
- Prioritize readability and maintainability over cleverness.

## External References

- **Bulma CSS Framework:** https://bulma.io/documentation/ — Reference for design system variables, utilities, and component styling conventions.
- **Conventional Commits:** https://www.conventionalcommits.org/ — Commit message format standard used in this project.

## Vue 3 and Component Development

- Follow the established component style used in this repo (Options API with `defineComponent` where applicable).
- Respect existing naming, plugin registration, and export conventions.
- Keep SSR/browser/mobile compatibility checks explicit when touching platform-specific code.
- Do not change install semantics for `Buefy` or individual component plugins unless requested.

## Test Requirements (Mandatory)

- After every change to a component, update any related test files.
- If no related test exists, create a new focused test that covers the changed behavior.
- For bug fixes, add or update a regression test that fails before and passes after the fix.
- Do not submit component changes without corresponding test coverage updates.

## Lint and Validation Requirements (Mandatory)

Before preparing code for commit or review, run and pass in this order:

1. **Build** — Build the package first (required before testing)
2. **Linter** — Run ESLint with auto-fix, then verify
3. **Full test suite** — Run unit tests

### Build Step

From `packages/buefy/`:

- `npm run build` — Full build (JS, SCSS, types)

Or individual build targets:

- `npm run build:js` — JavaScript/TypeScript compilation
- `npm run build:scss` — SCSS compilation to CSS
- `npm run build:dts` — TypeScript declaration generation

The build step is **required before testing** because tests depend on compiled artifacts and type definitions.

### Lint Step

When running npm lint-related scripts, prefer auto-fix first when available, then verify with the non-fix command:

- `npm run lint -- --fix` (or `npm run lint:fix` if present)
- `npm run lint`

### Test Step

After build and lint pass, run tests:

- `npm run unit` — Full test suite
- `npm run unit -- src/components/component-name/` — Focused component tests

Use workspace/package scripts as appropriate. At minimum:

- Library package build, lint, and tests in `packages/buefy`
- Any additional package checks relevant to touched files

If a full run is not possible, explicitly report what was run, what was skipped, and why.

## Node.js and Build Practices

- Keep build behavior deterministic.
- Do not silently alter build outputs, artifact paths, or module format contracts.
- Keep TypeScript declaration generation and build scripts aligned with existing pipeline expectations.

## Commenting Standards (Stack Overflow Aligned)

Reference: https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments/

- Comments explain why, not what the code obviously does.
- Do not use comments to excuse unclear code; rewrite code when clarity is possible.
- Explain non-obvious or unidiomatic behavior.
- Add links for external references and copied/adapted approaches.
- Add comments when fixing bugs if context is not obvious from code alone.
- Use clear markers for incomplete work:
    - `TODO(#issue)` for planned work
    - `FIXME(#issue)` for known defects/workarounds
- Remove stale comments when no longer accurate.

## Typing and Safety

- Avoid introducing new broad `any` types unless justified.
- If using `@ts-expect-error`, include a short reason and prefer linking an issue when relevant.
- Minimize `eslint-disable` scope and keep suppressions local.

## Change Hygiene

- Keep unrelated files untouched.
- Do not reformat unrelated code.
- Update docs/examples when behavior or API changes are user-visible.

## Commit Message Standards

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Subject line rules:**

- Use imperative mood: "add" not "added" or "adds".
- Do not capitalize first letter.
- No period (.) at the end.
- **Limit to 50 characters** (GitHub practical limit; soft limit 72 characters).
- Type: `fix`, `feat`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.
- Scope: component or module name in parentheses (e.g., `checkbox`, `button`).

**Body and Footer:**

- Body explains what and why, not how.
- Footer references issues: `Fixes #4251` or `Related to #1234`.

**Examples:**

- `fix(checkbox): generate checkmark SVG with concrete colors (#4251)` (50 chars)
- `feat(dialog): add promise-based API for async workflows` (52 chars)

## Codebase Structure and Patterns

### Folder Organization

- **`src/components/`** — All Vue components organized in subfolders by component name.
- **`src/scss/components/`** — Centralized SCSS styles for components (one file per component).
- **`src/utils/`** — Shared utilities: mixins, helpers, types, and configuration.
- **`src/directives/`** — Custom Vue directives (e.g., `clickOutside`, `trapFocus`).

### Component Folder Pattern

Each component has a dedicated folder following this structure:

```
src/components/ComponentName/
├── ComponentName.vue          (main component)
├── ComponentName.spec.ts      (unit tests — colocated with component)
├── __snapshots__/
│   └── ComponentName.spec.ts.snap
├── index.ts                   (plugin registration + exports)
└── RelatedComponent.vue       (optional: related variants, e.g., CheckboxButton.vue in checkbox/)
```

**Example:** `src/components/checkbox/` contains `Checkbox.vue`, `CheckboxButton.vue`, both test files, and `index.ts`.

### Component Implementation Pattern

```typescript
// Checkbox.vue example
import { defineComponent } from 'vue'
import CheckRadioMixin from '../../utils/CheckRadioMixin'

export default defineComponent({
    name: 'BCheckbox',
    mixins: [CheckRadioMixin],
    props: { ... },
    // Options API structure
})
```

**Key patterns:**

- Use `defineComponent()` for component definitions.
- Use Options API (not Composition API at this time).
- Import mixins from `../../utils/` for shared behavior.
- Export with `B` prefix: `export { Checkbox as BCheckbox }`.
- Keep related components (variants) in the same folder.

### Plugin Registration Pattern

Each component folder includes an `index.ts` that registers the plugin:

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

### Test File Pattern

Test files are **colocated in the component folder** and follow this pattern:

```typescript
import { shallowMount } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import BComponent from "@components/component/Component.vue";

let wrapper: VueWrapper<InstanceType<typeof BComponent>>;

describe("BComponent", () => {
    beforeEach(() => {
        wrapper = shallowMount(BComponent);
    });

    it("basic behavior", () => {
        expect(wrapper.vm).toBeTruthy();
    });

    // Regression test for specific bug fixes
    it("handles specific edge case from issue #XXXX", () => {
        // Test that validates the fix, not just behavior
    });
});
```

**Test conventions:**

- Use `shallowMount` for component isolation.
- Snapshot testing for rendered HTML.
- Regression tests should validate the specific fix (e.g., file content patterns, computed values, edge case handling).
- All test files must pass before changes are submitted.

### SCSS Pattern

SCSS files are centralized in `src/scss/components/`:

```
src/scss/components/
├── _checkbox.scss    (matches component name, lowercase)
├── _button.scss
├── _radio.scss
└── ...
```

**Key patterns:**

- File naming: `_componentname.scss` (lowercase, underscore prefix).
- Each file is self-contained with component-specific styles.
- Use Bulma CSS variables (e.g., `cv.getVar('primary')`, `cv.getVar('primary-invert')`).
- Register custom CSS variables in component styles for runtime overrides where appropriate.

### Shared Utilities and Mixins

Reusable logic lives in `src/utils/`:

- **Mixins:** `CheckRadioMixin.ts`, `FormElementMixin.ts`, `MessageMixin.ts`, `NoticeMixin.ts`, `TabbedMixin.ts`, `TimepickerMixin.ts` — provide shared component behavior.
- **Test support:** Mixin tests are colocated: `CheckRadioMixin.spec.ts` alongside `CheckRadioMixin.ts`.
- **Helpers:** `color.ts`, `helpers.ts`, `icons.ts`, `config.ts` — utilities and configuration.
- **Types:** `ProvideInjectTypes.ts`, `TabbedTypes.ts` — type definitions for shared inject/provide patterns.
- **SSR:** `ssr.ts` — server-side rendering utilities.

### When to Update Tests

After **any** change to a component:

1. Update the component's `ComponentName.spec.ts` file (located in the component folder).
2. If behavior changed, add assertions validating the new behavior.
3. For bug fixes, include a **regression test** that locks in the specific fix (e.g., file content patterns, computed values).
4. Snapshot tests may auto-update; review changes carefully.
5. All related utility/mixin tests must also pass if shared code changed.

### Test Execution

Tests require the package to be built first. Execute in this order:

1. Build the package: `npm run build`
2. Run linter: `npm run lint -- --fix && npm run lint`
3. Run tests: `npm run unit`

Tests are located in component folders alongside component files:

- Run full test suite: `npm run unit`
- Run focused component tests: `npm run unit -- src/components/component-name/`
- Check types: `npm run type-check`
- Run linter: `npm run lint`
- Auto-fix lint issues: `npm run lint -- --fix`
