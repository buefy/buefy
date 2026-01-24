// Code snippets used in the `Start` component.
//
// Vite may confuse these examples with the legitimate code and try to compile
// them, if they are in the component (.vue) file.

export const importingBundle = `
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/css/buefy.css'

Vue.use(Buefy)
`

export const importingComponentsAsVuePlugins = `
import Vue from 'vue'
import { Table, Input } from 'buefy'
import 'buefy/dist/css/buefy.css'

Vue.use(Table)
Vue.use(Input)
`

export const importingSSR = `
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/css/buefy.css'

Vue.use(Buefy) `

export const installNuxtBuefy = `
// with npm
npm install nuxt-buefy

// with yarn
yarn add nuxt-buefy
`

export const importingNuxtBuefy = `
{
    modules: [
        // Simple usage
        'nuxt-buefy',

        // Or you can customize
        ['nuxt-buefy', { css: false, materialDesignIcons: false }],
    ]
}`

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
    <!-- Individual component -->
    <script src="https://unpkg.com/buefy/dist/components/collapse"></script>
</head>
<body>
    <div id="app">
        <b-collapse :model-value="true" aria-id="contentIdForA11y1">
            <template #trigger="props">
                <b-button label="Toggle" />
            </template>
            <div class="notification">
                This text should show and hide by clicking on the “Toggle” button.
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

export const materialIcons = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css">'

export const fontAwesome5 = '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">'
