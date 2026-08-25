# packages/docs

## Docs app structure (`src/`)

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
