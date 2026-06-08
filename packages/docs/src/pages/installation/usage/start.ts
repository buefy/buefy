// Code snippets used in the `Start` component.
//
// Vite may confuse these examples with the legitimate code and try to compile
// them, if they are in the component (.vue) file.

export const importingBundle = `
import { createApp } from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/css/buefy.css'

import App from './App.vue'

const app = createApp(App)
app.use(Buefy)
app.mount('#app')
`

export const importingComponentsAsVuePlugins = `
import { createApp } from 'vue'
import { Table, Input } from 'buefy'
import 'buefy/dist/css/buefy.css'

import App from './App.vue'

const app = createApp(App)
app.use(Table)
app.use(Input)
app.mount('#app')
`

export const importingIndividualComponents = `
<script setup lang="ts">
import { BButton, BInput } from 'buefy'
</script>

<template>
    <div>
        <BInput placeholder="Your name" />
        <BButton type="is-primary">Hello Buefy!</BButton>
    </div>
</template>
`

export const importingCDNHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://unpkg.com/buefy/dist/css/buefy.min.css" />

    <script src="https://unpkg.com/vue@3"></script>
    <!-- Full bundle -->
    <script src="https://unpkg.com/buefy/dist/buefy.min.js"></script>
    <!-- Or: individual component -->
    <script src="https://unpkg.com/buefy/dist/components/collapse"></script>
</head>
<body>
    <div id="app">
        <b-collapse :model-value="true" aria-id="contentIdForA11y1">
            <template #trigger="props">
                <b-button label="Toggle" />
            </template>
            <div class="notification">
                This text shows and hides by clicking the "Toggle" button.
            </div>
        </b-collapse>
    </div>

    <script>
        const { createApp } = Vue;
        // From the full bundle
        const { BButton } = Buefy;
        // For an individual component
        const { BCollapse } = Collapse;

        const app = createApp({
            components: { BButton, BCollapse }
        });
        app.mount("#app");
    </script>
</body>
</html>`

export const githubPackagesNpmrc = `
@buefy:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
`

export const githubPackagesInstall = `npm install @buefy/buefy`

export const githubPackagesUsage = `
import { createApp } from 'vue'
import Buefy from '@buefy/buefy'
import '@buefy/buefy/dist/css/buefy.css'

import App from './App.vue'

const app = createApp(App)
app.use(Buefy)
app.mount('#app')
`

export const materialIcons = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css">'

export const fontAwesome6 = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/css/all.min.css">'

// ── Framework tutorial snippets ───────────────────────────────────────────────

export const viteCreateProject = `
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm install
`

export const viteInstallDeps = `npm install buefy @mdi/font @fortawesome/fontawesome-free`

export const viteMainTs = `
import { createApp } from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/css/buefy.css'
import '@mdi/font/css/materialdesignicons.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

import App from './App.vue'

const app = createApp(App)
app.use(Buefy)
app.mount('#app')
`

export const nuxtCreateProject = `
npx nuxi@latest init my-app
cd my-app
npm install
`

export const nuxtInstallDeps = `npm install buefy @mdi/font @fortawesome/fontawesome-free`

export const nuxtPluginTs = `
// plugins/buefy.ts
import Buefy from 'buefy'
import 'buefy/dist/css/buefy.css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Buefy)
})
`

export const nuxtConfigTs = `
// nuxt.config.ts
export default defineNuxtConfig({
    css: [
        '@mdi/font/css/materialdesignicons.min.css',
        '@fortawesome/fontawesome-free/css/all.css'
    ],
    compatibilityDate: '2025-01-01'
})
`

// ── StackBlitz examples ───────────────────────────────────────────────────────

export const stackblitzNpmExample = `
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
    <section class="section">
        <div class="container">
            <h1 class="title">Hello Buefy!</h1>
            <p class="subtitle">
                You're using <strong>Buefy</strong> with Vue 3.
            </p>
            <b-field label="Your name">
                <b-input placeholder="e.g. Alice" />
            </b-field>
            <b-button type="is-primary" @click="count++">
                Clicked {{ count }} time{{ count === 1 ? '' : 's' }}
            </b-button>
        </div>
    </section>
</template>
`.trim()

export const stackblitzIndividualExample = `
<script setup lang="ts">
import { ref } from 'vue'
import { BField, BInput, BButton } from 'buefy'

const count = ref(0)
</script>

<template>
    <section class="section">
        <div class="container">
            <h1 class="title">Individual Component Import</h1>
            <p class="subtitle">
                Only <strong>BField</strong>, <strong>BInput</strong>, and
                <strong>BButton</strong> are imported.
            </p>
            <b-field label="Your name">
                <b-input placeholder="e.g. Alice" />
            </b-field>
            <b-button type="is-primary" @click="count++">
                Clicked {{ count }} time{{ count === 1 ? '' : 's' }}
            </b-button>
        </div>
    </section>
</template>
`.trim()
