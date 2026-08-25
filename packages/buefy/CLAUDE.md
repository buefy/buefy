# packages/buefy

## Component structure

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

## Component implementation conventions

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

## Shared utilities (`src/utils/`)

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

## SCSS conventions

- Files: `src/scss/components/_componentname.scss` (lowercase, underscore prefix)
- Use Bulma CSS variables: `cv.getVar('primary')`, `cv.getVar('primary-invert')`
- Three CSS output variants are built: full (with Bulma reset), standalone, no-reset

## Testing conventions

- Use `shallowMount` for component isolation.
- Include snapshot tests for rendered HTML.
- For bug fixes, add a regression test that fails before the fix and passes after.
- Mixin tests are colocated alongside the mixin file in `src/utils/`.
