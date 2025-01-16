// Code snippets used in the `Start` component.
//
// Vite may confuse these examples with the legitimate code and try to compile
// them, if they are in the component (.vue) file.

export const importingBundle = `
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
`

export const importingComponentsAsVuePlugins = `
import Vue from 'vue'
import { Table, Input } from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Table)
Vue.use(Input)
`

export const importingSSR = `
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

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
    <link rel="stylesheet" href="https://unpkg.com/buefy/dist/buefy.min.css">
</head>

<body>
    <div id="app">
        <!-- Buefy components goes here -->
    </div>

    <script src="https://unpkg.com/vue@2"></\script>
    <!-- Full bundle -->
    <script src="https://unpkg.com/buefy/dist/buefy.min.js"></\script>

    <!-- Individual components -->
    <script src="https://unpkg.com/buefy/dist/components/table"></\script>
    <script src="https://unpkg.com/buefy/dist/components/input"></\script>

    <script>
        new Vue({
            el: '#app'
        })
    </\script>
</body>
</html>`

export const materialIcons = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css">'

export const fontAwesome5 = '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">'
