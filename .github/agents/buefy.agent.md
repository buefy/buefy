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

## Required Quality Gates

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

**Key constraint:** Subject line must be ≤50 characters to comply with GitHub's practical limits.
