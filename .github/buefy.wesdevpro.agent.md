# Agent Playbook

## Instruction Source

Treat `.github/copilot-instructions.md` as the canonical repository instruction set.
This agent playbook extends that file and must remain consistent with it.

## Mission

Implement high-quality changes in this repository with minimal risk, strong test coverage, and consistent Vue 3 + Node.js practices.

## Operating Workflow

1. Read the relevant files first and mirror existing conventions.
2. Make the smallest viable code change.
3. Update or add tests for changed behavior.
4. Run validation commands.
5. Report exactly what was changed and verified.

## WSL Terminal Rule (Strict)

When using terminal commands, run in WSL using line-by-line commands only.

Required pattern:

1. First command: `wsl`
2. Then run commands directly in that WSL shell (one command per line).
3. Do not wrap every command with `wsl.exe -e ...`.
4. Keep command flow simple and explicit.

Example:

- `wsl`
- `npm i`
- `npm -w buefy run build`

## Required Quality Gates

### Documentation Impact Rule (Strict)

- For every change, determine whether `packages/docs` must be updated.
- Documentation updates are required for user-visible API, behavior, styling/theming, installation/configuration, or feature-surface changes.
- If docs are not updated, explicitly justify why in the final report.
- If docs are updated, validate that examples and API/variables tables stay aligned with implementation.

### Component Change Rule (Strict)

- Every component change must be accompanied by test updates.
- If related tests do not exist, create new tests.
- If behavior changed, add assertions that validate the new behavior directly.
- If a bug was fixed, include a regression test.

### Pre-Commit / Pre-Review Rule (Strict)

Before proposing commit or review, run and pass in this order:

1. Build the package
2. Lint checks
3. Full test suite

**Build Step:**

- `npm run build` — Full build (JS, SCSS, types)
- Or individual targets: `npm run build:js`, `npm run build:scss`, `npm run build:dts`

**Lint Step:**
For npm lint commands, prefer auto-fix first when available, then verify with the non-fix command:

- `npm run lint -- --fix` (or `npm run lint:fix`)
- `npm run lint`

**Test Step:**

- `npm run unit` — Full test suite after build completes

If environment limits prevent full execution, clearly state:

- which commands were run
- which commands were not run
- the blocker and its impact

## Validation Command Guidance

Run commands from the appropriate package root(s):

- `packages/buefy`: lint, type-check, unit tests
- `packages/docs`: relevant lint/type-check/tests if docs code changed

Prefer repository scripts over custom ad hoc commands.

## Docs Update Playbook (`packages/docs`)

When docs changes are required, use these repository patterns:

- `src/pages/components/<component>/<Component>.vue`: Main component docs page.
- `src/pages/components/<component>/examples/`: Interactive examples used in docs.
- `src/pages/components/<component>/api/<component>.ts`: API table definitions.
- `src/pages/components/<component>/variables/<component>.ts`: Variables table definitions.
- `src/pages/installation/`: Installation and configuration guides.
- `src/pages/extensions/<extension>/`: Extension-specific docs.

For new/renamed/removed docs pages, keep routing and navigation in sync:

1. `src/router/index.ts`
2. `src/data/routes.json`
3. `src/data/menu.json`

Metadata conventions:

- Keep `githubPath` aligned to the docs source file for "Improve this page" links.
- Keep `breadcrumb` chains valid.
- Use `isNew` and `isUpdated` flags intentionally.

## Vue 3 Implementation Rules

- Keep existing component APIs and plugin registration stable.
- Respect established patterns (Options API + `defineComponent` where used).
- Preserve accessibility and event contracts.
- Keep browser/SSR edge-case handling explicit.

## Node.js and Build Rules

- Preserve deterministic builds.
- Do not alter output artifacts/formats unless explicitly requested.
- Keep rollup/sass/typegen workflows consistent with current scripts.

## Comment Policy

Reference: https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments/

Use comments intentionally:

- Explain rationale and trade-offs.
- Add reference links for non-obvious external logic.
- Mark unfinished work with actionable TODO/FIXME and issue references.

Avoid comments that simply restate code.

## Reporting Format for Completed Work

When done, include:

1. Files changed
2. Behavior changes
3. Test updates added/modified
4. Validation commands executed and outcomes
5. Any remaining risks or follow-ups

## Commit Message Standards

Follow the canonical [Conventional Commits](https://www.conventionalcommits.org/) format defined in `.github/copilot-instructions.md`.

**Key constraint:** Subject line must be <=50 characters to comply with GitHub's practical limits.
