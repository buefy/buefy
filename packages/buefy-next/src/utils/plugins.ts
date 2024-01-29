export const use = (plugin) => {
    if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin)
    }
}

// use `name` to register a Functional Component which will become unresolvable
// in production build due to name mangling.
export const registerComponent = (Vue, component, name) => {
    Vue.component(name || component.name, component)
}

export const registerComponentProgrammatic = (Vue, property, component) => {
    if (!Vue.config.globalProperties.$buefy) Vue.config.globalProperties.$buefy = {}
    Vue.config.globalProperties.$buefy[property] = component
}
