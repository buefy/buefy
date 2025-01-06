import type { App, Component, Plugin } from 'vue'

// TODO: `use` shall be removed and this declaration shall also be removed.
declare global {
    interface Window {
        Vue?: App
    }
}

// same signature as `App.use`: https://github.com/vuejs/core/blob/ee4cd78a06e6aa92b12564e527d131d1064c2cd0/packages/runtime-core/src/apiCreateApp.ts#L36-L39
// TODO: `use` no longer makes sense in Vue 3.
export const use: <T extends unknown[]>(plugin: Plugin<T>, ...options: T) => void =
    (plugin, ...options) => {
        if (typeof window !== 'undefined' && window.Vue) {
            window.Vue.use(plugin, options)
        }
    }

// use `name` to register a Functional Component which will become unresolvable
// in production build due to name mangling.
export const registerComponent = (Vue: App, component: Component, name?: string) => {
    const componentName = name || component.name
    if (componentName == null) {
        throw new Error('Buefy.registerComponent: missing component name')
    }
    Vue.component(componentName, component)
}

// TODO: refine the type of `component`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerComponentProgrammatic = (Vue: App, property: string, component: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!Vue.config.globalProperties.$buefy) Vue.config.globalProperties.$buefy = {} as any
    Vue.config.globalProperties.$buefy[property] = component
}
