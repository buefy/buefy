<template>
    <div class="content">
        <p>
            Buefy is open source and welcomes contributions of all kinds — bug reports,
            documentation improvements, new components, and code fixes.
        </p>

        <p>
            <a
                class="button is-primary"
                href="https://github.com/buefy/buefy/blob/dev/.github/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
            >
                Read the contributing guide on GitHub
            </a>
        </p>

        <h2>Quick start</h2>
        <ol>
            <li>
                <strong>Fork</strong> the repository on GitHub and clone your fork locally.
            </li>
            <li>
                Install dependencies: <code>npm install</code> (requires Node 18+, run via WSL on Windows).
            </li>
            <li>
                Create a feature branch: <code>git checkout -b fix/my-bug</code>.
            </li>
            <li>
                Make your changes in <code>packages/buefy/src/</code> and add or update
                tests in the matching <code>.spec.ts</code> file.
            </li>
            <li>
                Run <code>npm run build &amp;&amp; npm run lint &amp;&amp; npm run unit</code>
                from <code>packages/buefy/</code> — all must pass.
            </li>
            <li>
                Update docs in <code>packages/docs/</code> if your change is user-visible.
            </li>
            <li>
                Open a pull request against the <strong>dev</strong> branch with a
                <a href="https://www.conventionalcommits.org/" target="_blank" rel="noopener noreferrer">
                    Conventional Commit
                </a>
                title (e.g. <code>fix(button): correct focus ring in dark mode</code>).
            </li>
        </ol>

        <h2>Code style</h2>
        <ul>
            <li>Components use <code>defineComponent()</code> with Options API (not Composition API).</li>
            <li>Export public components with the <code>B</code> prefix: <code>BButton</code>.</li>
            <li>SCSS lives in <code>src/scss/components/</code>, not colocated with the component.</li>
            <li>Run <code>npm run lint:fix</code> before pushing.</li>
        </ul>

        <h2>Reporting bugs</h2>
        <p>
            Please
            <a
                href="https://github.com/buefy/buefy/issues/new?template=BUG_REPORT.md"
                target="_blank"
                rel="noopener noreferrer"
            >
                open an issue
            </a>
            and include a minimal reproduction (StackBlitz or CodeSandbox link).
        </p>
    </div>
</template>
