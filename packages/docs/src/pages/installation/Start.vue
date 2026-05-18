<template>
    <div>
        <p :id="slugifyTitle('Installing Buefy')" class="title">
            <router-link :to="`#${slugifyTitle('Installing Buefy')}`">#</router-link>
            Installing Buefy
        </p>

        <b-message type="is-warning" size="is-medium">
            For all installation methods, you need
            <strong
                ><a href="https://vuejs.org" target="_blank">Vue.js</a> version
                3.4+</strong
            >.
        </b-message>

        <b-tabs v-model="activeTab" type="is-boxed">

            <!-- ── Tab 1: NPM ───────────────────────────────────────────── -->
            <b-tab-item label="NPM" icon="npm">
                <p class="subtitle is-spaced">
                    The recommended way — install from the
                    <a href="https://www.npmjs.com/package/buefy" target="_blank">npm registry</a>
                    and bundle with Vite or Webpack.
                </p>

                <p :id="slugifyTitle('Installation')" class="title is-4">
                    <router-link :to="`#${slugifyTitle('Installation')}`">#</router-link>
                    Installation
                </p>
                <CodeView code="npm install buefy" lang="bash" expanded />

                <hr />

                <p :id="slugifyTitle('Full bundle')" class="title is-4">
                    <router-link :to="`#${slugifyTitle('Full bundle')}`">#</router-link>
                    Full bundle
                </p>
                <b-message type="is-success">
                    <div class="content">
                        The full bundle is optimized and small:
                        <ul>
                            <li><strong>script</strong> — <strong>48 KB</strong> min+gzip</li>
                            <li><strong>style</strong> — <strong>39 KB</strong> min+gzip (Bulma included)</li>
                        </ul>
                    </div>
                </b-message>
                <div class="is-flex is-align-items-center is-justify-content-space-between mb-2">
                    <p class="has-text-weight-semibold">main.ts / main.js</p>
                    <StackBlitzEdit :code="stackblitzNpmExample" title="Buefy — Full Bundle" />
                </div>
                <CodeView :code="preformat(importingBundle)" lang="javascript" expanded />

                <hr />

                <p :id="slugifyTitle('Individual components')" class="title is-4">
                    <router-link :to="`#${slugifyTitle('Individual components')}`">#</router-link>
                    Individual components
                </p>
                <p class="content">
                    Register only the components you need — ideal for tree-shaking.
                </p>

                <p class="has-text-weight-semibold mb-2">Register as Vue plugins (main.ts)</p>
                <CodeView :code="preformat(importingComponentsAsVuePlugins)" lang="javascript" expanded />

                <p class="has-text-weight-semibold mb-2 mt-4">Or import directly inside a SFC</p>
                <div class="is-flex is-align-items-center is-justify-content-space-between mb-2">
                    <span class="has-text-grey is-size-7">App.vue</span>
                    <StackBlitzEdit :code="stackblitzIndividualExample" title="Buefy — Individual Components" />
                </div>
                <CodeView :code="preformat(importingIndividualComponents)" lang="html" expanded />

                <b-message type="is-info" class="mt-4">
                    To include per-component styles, see the
                    <router-link to="/documentation/sass">Customization</router-link> section.
                </b-message>
            </b-tab-item>

            <!-- ── Tab 2: CDN ───────────────────────────────────────────── -->
            <b-tab-item label="CDN" icon="web">
                <p class="subtitle is-spaced">
                    No build step required — drop these tags into any HTML file.
                </p>

                <p :id="slugifyTitle('CDN links')" class="title is-4">
                    <router-link :to="`#${slugifyTitle('CDN links')}`">#</router-link>
                    CDN links
                </p>
                <div class="content">
                    <ul>
                        <li>
                            CSS:
                            <a href="https://unpkg.com/buefy/dist/css/buefy.min.css" target="_blank">
                                https://unpkg.com/buefy/dist/css/buefy.min.css
                            </a>
                        </li>
                        <li>
                            JS (full bundle):
                            <a href="https://unpkg.com/buefy/dist/buefy.min.js" target="_blank">
                                https://unpkg.com/buefy/dist/buefy.min.js
                            </a>
                        </li>
                        <li>
                            JS (individual component example):
                            <a href="https://unpkg.com/buefy/dist/components/collapse" target="_blank">
                                https://unpkg.com/buefy/dist/components/&lt;name&gt;
                            </a>
                        </li>
                    </ul>
                </div>

                <hr />

                <p :id="slugifyTitle('CDN usage example')" class="title is-4">
                    <router-link :to="`#${slugifyTitle('CDN usage example')}`">#</router-link>
                    Usage example
                </p>
                <CodeView :code="preformat(importingCDNHtml)" lang="html" expanded />

                <b-message type="is-warning" class="mt-4">
                    <strong>Note:</strong> CDN usage bypasses the Vue compiler, so
                    <code>&lt;script setup&gt;</code> and SFC syntax are not available.
                    Use the Options API with <code>createApp()</code> as shown above.
                </b-message>
            </b-tab-item>

            <!-- ── Tab 3: GitHub Packages ───────────────────────────────── -->
            <b-tab-item label="GitHub Packages" icon="github">
                <p class="subtitle is-spaced">
                    Install the latest <strong>development release</strong> directly from the
                    <a href="https://github.com/buefy/buefy/pkgs/npm/buefy" target="_blank">
                        GitHub Packages registry
                    </a>
                    to test unreleased features.
                </p>

                <b-message type="is-danger">
                    Dev releases are published from the <strong>dev</strong> branch and may be
                    unstable. Do not use in production.
                </b-message>

                <p :id="slugifyTitle('Step 1: Generate a PAT')" class="title is-5">
                    <router-link :to="`#${slugifyTitle('Step 1: Generate a PAT')}`">#</router-link>
                    Step 1 — Generate a GitHub Personal Access Token
                </p>
                <div class="content">
                    <ol>
                        <li>
                            Go to
                            <a href="https://github.com/settings/tokens/new" target="_blank">
                                GitHub → Settings → Developer settings → Personal access tokens
                            </a>.
                        </li>
                        <li>Create a token with the <strong>read:packages</strong> scope.</li>
                        <li>Copy the generated token.</li>
                    </ol>
                </div>

                <p :id="slugifyTitle('Step 2: Configure npm')" class="title is-5">
                    <router-link :to="`#${slugifyTitle('Step 2: Configure npm')}`">#</router-link>
                    Step 2 — Configure npm for the <code>@buefy</code> scope
                </p>
                <p class="content">
                    Add the following to your project's <code>.npmrc</code> file
                    (or <code>~/.npmrc</code> for a user-level config), replacing
                    <code>YOUR_GITHUB_PAT</code> with the token you generated:
                </p>
                <CodeView :code="preformat(githubPackagesNpmrc)" lang="ini" expanded />
                <b-message type="is-info">
                    Never commit your PAT to source control. Use an environment variable
                    like <code>${'$'}{GITHUB_TOKEN}</code> in CI, or add <code>.npmrc</code> to
                    <code>.gitignore</code>.
                </b-message>

                <p :id="slugifyTitle('Step 3: Install')" class="title is-5">
                    <router-link :to="`#${slugifyTitle('Step 3: Install')}`">#</router-link>
                    Step 3 — Install
                </p>
                <CodeView :code="preformat(githubPackagesInstall)" lang="bash" expanded />

                <p :id="slugifyTitle('Step 4: Usage')" class="title is-5">
                    <router-link :to="`#${slugifyTitle('Step 4: Usage')}`">#</router-link>
                    Step 4 — Usage
                </p>
                <CodeView :code="preformat(githubPackagesUsage)" lang="javascript" expanded />
            </b-tab-item>

        </b-tabs>

        <hr />

        <!-- ── Framework tutorials ─────────────────────────────────────── -->
        <p :id="slugifyTitle('Framework tutorials')" class="title">
            <router-link :to="`#${slugifyTitle('Framework tutorials')}`">#</router-link>
            Framework tutorials
        </p>
        <p class="subtitle">
            Step-by-step guides for getting started with popular frameworks
        </p>

        <b-tabs v-model="frameworkTab" type="is-toggle">

            <!-- Vite + Vue 3 ─────────────────────────────────────────────── -->
            <b-tab-item label="Vite + Vue 3" icon="lightning-bolt">
                <div class="is-flex is-justify-content-flex-end mb-5">
                    <b-button
                        type="is-primary"
                        icon-right="open-in-new"
                        @click="openViteStackBlitz"
                    >
                        Try on StackBlitz
                    </b-button>
                </div>

                <div class="media mb-5">
                    <div class="media-left">
                        <span class="tag is-primary is-medium is-rounded">1</span>
                    </div>
                    <div class="media-content">
                        <p class="title is-5">Create a new Vite project</p>
                        <CodeView :code="preformat(viteCreateProject)" lang="bash" expanded />
                    </div>
                </div>

                <div class="media mb-5">
                    <div class="media-left">
                        <span class="tag is-primary is-medium is-rounded">2</span>
                    </div>
                    <div class="media-content">
                        <p class="title is-5">Install Buefy and icon packs</p>
                        <CodeView :code="viteInstallDeps" lang="bash" expanded />
                    </div>
                </div>

                <div class="media mb-5">
                    <div class="media-left">
                        <span class="tag is-primary is-medium is-rounded">3</span>
                    </div>
                    <div class="media-content">
                        <p class="title is-5">Configure <code>src/main.ts</code></p>
                        <CodeView :code="preformat(viteMainTs)" lang="javascript" expanded />
                    </div>
                </div>

                <div class="media mb-5">
                    <div class="media-left">
                        <span class="tag is-primary is-medium is-rounded">4</span>
                    </div>
                    <div class="media-content">
                        <p class="title is-5">Start the dev server</p>
                        <CodeView code="npm run dev" lang="bash" expanded />
                        <b-message type="is-success" class="mt-3">
                            Your app is ready! Open
                            <a href="http://localhost:5173" target="_blank">localhost:5173</a>
                            and start building with Buefy components.
                        </b-message>
                    </div>
                </div>
            </b-tab-item>

            <!-- Nuxt 3 ───────────────────────────────────────────────────── -->
            <b-tab-item label="Nuxt 3" icon="alpha-n-circle">
                <div class="is-flex is-justify-content-flex-end mb-5">
                    <b-button
                        type="is-primary"
                        icon-right="open-in-new"
                        @click="openNuxtStackBlitz"
                    >
                        Try on StackBlitz
                    </b-button>
                </div>

                <div class="media mb-5">
                    <div class="media-left">
                        <span class="tag is-primary is-medium is-rounded">1</span>
                    </div>
                    <div class="media-content">
                        <p class="title is-5">Create a new Nuxt 3 project</p>
                        <CodeView :code="preformat(nuxtCreateProject)" lang="bash" expanded />
                    </div>
                </div>

                <div class="media mb-5">
                    <div class="media-left">
                        <span class="tag is-primary is-medium is-rounded">2</span>
                    </div>
                    <div class="media-content">
                        <p class="title is-5">Install Buefy and icon packs</p>
                        <CodeView :code="nuxtInstallDeps" lang="bash" expanded />
                    </div>
                </div>

                <div class="media mb-5">
                    <div class="media-left">
                        <span class="tag is-primary is-medium is-rounded">3</span>
                    </div>
                    <div class="media-content">
                        <p class="title is-5">Create <code>plugins/buefy.ts</code></p>
                        <p class="content">
                            Nuxt auto-discovers plugins in the <code>plugins/</code> directory — no
                            manual registration needed.
                        </p>
                        <CodeView :code="preformat(nuxtPluginTs)" lang="javascript" expanded />
                    </div>
                </div>

                <div class="media mb-5">
                    <div class="media-left">
                        <span class="tag is-primary is-medium is-rounded">4</span>
                    </div>
                    <div class="media-content">
                        <p class="title is-5">Configure <code>nuxt.config.ts</code></p>
                        <p class="content">
                            Add the MDI and Font Awesome stylesheets to Nuxt's global CSS array.
                        </p>
                        <CodeView :code="preformat(nuxtConfigTs)" lang="javascript" expanded />
                    </div>
                </div>

                <div class="media mb-5">
                    <div class="media-left">
                        <span class="tag is-primary is-medium is-rounded">5</span>
                    </div>
                    <div class="media-content">
                        <p class="title is-5">Start the dev server</p>
                        <CodeView code="npm run dev" lang="bash" expanded />
                        <b-message type="is-success" class="mt-3">
                            Your app is ready! Open
                            <a href="http://localhost:3000" target="_blank">localhost:3000</a>
                            and start building with Buefy components.
                        </b-message>
                    </div>
                </div>
            </b-tab-item>

        </b-tabs>

        <hr />

        <!-- ── Icons setup ──────────────────────────────────────────────── -->
        <p :id="slugifyTitle('Icons')" class="title">
            <router-link :to="`#${slugifyTitle('Icons')}`">#</router-link>
            Icons
        </p>
        <p class="subtitle">
            Several components use icons. Add one of these CDN links to your
            <code>&lt;head&gt;</code>:
        </p>
        <CodeView title="Material Design Icons (default)" :code="materialIcons" expanded />
        <CodeView title="Font Awesome 6" :code="fontAwesome6" expanded />
        <div class="content">
            <blockquote>
                <p>Buefy does not bundle any icon pack — import it however you prefer (NPM, CDN, etc.).</p>
                <p>
                    If you use Font Awesome 6, update your
                    <router-link to="/documentation/constructor-options">constructor options</router-link>
                    to set <code>defaultIconPack: 'fas'</code>.
                </p>
            </blockquote>
        </div>

        <hr />

        <!-- ── Next steps ───────────────────────────────────────────────── -->
        <p :id="slugifyTitle('Next steps')" class="title">
            <router-link :to="`#${slugifyTitle('Next steps')}`">#</router-link>
            Next steps
        </p>
        <div class="columns">
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <p class="title is-5">
                            <b-icon icon="view-dashboard" type="is-primary" />
                            Browse components
                        </p>
                        <p class="content">
                            Explore all available UI components with live demos and API
                            documentation.
                        </p>
                    </div>
                    <footer class="card-footer">
                        <router-link to="/documentation" class="card-footer-item">
                            View all components
                        </router-link>
                    </footer>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <p class="title is-5">
                            <b-icon icon="palette" type="is-info" />
                            Customization
                        </p>
                        <p class="content">
                            Customize colors, sizes, and more with Sass variables or
                            CSS custom properties.
                        </p>
                    </div>
                    <footer class="card-footer">
                        <router-link to="/documentation/sass" class="card-footer-item">
                            With Sass
                        </router-link>
                        <router-link to="/documentation/css-variables" class="card-footer-item">
                            CSS Variables
                        </router-link>
                    </footer>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <p class="title is-5">
                            <b-icon icon="cog" type="is-warning" />
                            Global options
                        </p>
                        <p class="content">
                            Configure default icon packs, sizes, and other global
                            Buefy settings.
                        </p>
                    </div>
                    <footer class="card-footer">
                        <router-link to="/documentation/constructor-options" class="card-footer-item">
                            Constructor options
                        </router-link>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { BButton, BIcon, BMessage, BTabs, BTabItem } from "buefy";
import sdk from "@stackblitz/sdk";

import CodeView from "@/components/CodeView.vue";
import StackBlitzEdit from "@/components/StackBlitzEdit.vue";
import { preformat } from "@/utils";
import { createCustomNuxtProject, createCustomVueProject } from "@/utils/stackBlitz";

import {
    fontAwesome6,
    githubPackagesInstall,
    githubPackagesNpmrc,
    githubPackagesUsage,
    importingBundle,
    importingCDNHtml,
    importingComponentsAsVuePlugins,
    importingIndividualComponents,
    materialIcons,
    nuxtConfigTs,
    nuxtCreateProject,
    nuxtInstallDeps,
    nuxtPluginTs,
    stackblitzIndividualExample,
    stackblitzNpmExample,
    viteCreateProject,
    viteInstallDeps,
    viteMainTs,
} from "./usage/start";

export default defineComponent({
    components: {
        BButton,
        BIcon,
        BMessage,
        BTabs,
        BTabItem,
        CodeView,
        StackBlitzEdit,
    },
    data() {
        return {
            activeTab: 0,
            frameworkTab: 0,
            importingBundle,
            importingComponentsAsVuePlugins,
            importingIndividualComponents,
            importingCDNHtml,
            githubPackagesNpmrc,
            githubPackagesInstall,
            githubPackagesUsage,
            materialIcons,
            fontAwesome6,
            stackblitzNpmExample,
            stackblitzIndividualExample,
            viteCreateProject,
            viteInstallDeps,
            viteMainTs,
            nuxtCreateProject,
            nuxtInstallDeps,
            nuxtPluginTs,
            nuxtConfigTs,
        };
    },
    methods: {
        preformat,
        openViteStackBlitz() {
            const project = createCustomVueProject(stackblitzNpmExample, "Buefy — Vite + Vue 3")
            sdk.openProject(project, { openFile: "src/App.vue", newWindow: true })
        },
        openNuxtStackBlitz() {
            const project = createCustomNuxtProject("Buefy — Nuxt 3")
            sdk.openProject(project, { openFile: "app.vue", newWindow: true })
        },
        slugifyTitle(title: string) {
            if (!title) return "";
            return title
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, "")
                .replace(/--+/g, "-")
                .replace(/^-+/, "")
                .replace(/-+$/, "");
        },
    },
});
</script>
