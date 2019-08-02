
export const use = (plugin) => {
    if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin)
    }
}

export const registerComponent = (Vue, component) => {
    Vue.component(component.name, component)
}

export const registerComponentProgrammatic = (Vue, property, component) => {
    if (!Vue.prototype.$buefy) Vue.prototype.$buefy = {}
    Vue.prototype.$buefy[property] = component
}
