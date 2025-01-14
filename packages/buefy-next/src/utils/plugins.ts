import type { App, Component } from 'vue'

// use `name` to register a Functional Component which will become unresolvable
// in production build due to name mangling.
export const registerComponent = (Vue: App, component: Component, name?: string) => {
    const componentName = name || component.name
    if (componentName == null) {
        throw new Error('Buefy.registerComponent: missing component name')
    }
    Vue.component(componentName, component)
}

export const registerComponentProgrammatic = <
    K extends keyof App['config']['globalProperties']['$buefy'],
    C extends App['config']['globalProperties']['$buefy'][K]
>(Vue: App, property: K, component: C) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!Vue.config.globalProperties.$buefy) Vue.config.globalProperties.$buefy = {} as any
    Vue.config.globalProperties.$buefy[property] = component
}
