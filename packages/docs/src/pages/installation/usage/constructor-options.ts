// Code snippets used in the `ConstructorOptions` component.
//
// Vite may confuse these examples with the legitimate code and try to compile
// them, if they are in the component (.vue) file.

export const usageBundle = `
import { createApp } from 'vue'
import Buefy from 'buefy'

import App from './App.vue'

const app = createApp(App)
app.use(Buefy, {
    defaultIconPack: 'fas',
    // ...
})
app.mount('#app')`

export const usageComponents = `
import { createApp } from 'vue'
import { ConfigProgrammatic, Table, Input } from 'buefy'

import App from './App.vue'

const app = createApp(App)
app.use(Table)
app.use(Input)
ConfigProgrammatic.setOptions({
    defaultIconPack: 'fas',
    // ...
})
app.mount('#app')`

export const usageCdn = `
// When using CDN, Buefy attaches ConfigProgrammatic to the global Buefy object
const { ConfigProgrammatic } = Buefy;
ConfigProgrammatic.setOptions({
    defaultIconPack: 'fas',
    // ...
})`
