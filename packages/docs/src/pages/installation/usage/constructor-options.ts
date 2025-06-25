// Code snippets used in the `ConstructorOptions` component.
//
// Vite may confuse these examples with the legitimate code and try to compile
// them, if they are in the component (.vue) file.

export const usageBundle = `
Vue.use(Buefy, {
    defaultIconPack: 'fas',
    // ...
})`

export const usageComponents = `
import { ConfigProgrammatic, Table, Input } from 'buefy'

Vue.use(Table)
Vue.use(Input)
ConfigProgrammatic.setOptions({
    defaultIconPack: 'fas',
    // ...
})`

export const usageCdn = `
// When using CDN, Buefy automatically attaches itself on Vue
Vue.prototype.$buefy.config.setOptions({
    defaultIconPack: 'fas',
    // ...
})`
