# Buefy Agent Playbook

Canonical rules: `.github/copilot-instructions.md`. This file extends — not replaces — those instructions.

## Mission

Implement high-quality changes with minimal risk, strong test coverage, and consistent Vue 3 + Node.js practices.

## Operating Workflow

1. Read relevant files first; mirror existing conventions.
2. Make the smallest viable code change.
3. Update or create tests for changed behavior.
4. Run build → lint → unit (in that order).
5. Report exactly what changed and what was verified.

## Quality Gates (Strict)

**Every change must pass before proposing commit or review:**

- Build: `npm run build` from `packages/buefy/`
- Lint: `npm run lint:fix && npm run lint`
- Tests: `npm run unit`

**Docs:** If any user-visible API, behavior, styling, or config changed — update `packages/docs`. If not, state why in the report.

**Tests:** Every component change needs a test update. Bug fixes need a regression test.

## Completed Work Report

Include:
1. Files changed
2. Behavior changes
3. Test updates added/modified
4. Validation commands run and their outcomes
5. Remaining risks or follow-ups
