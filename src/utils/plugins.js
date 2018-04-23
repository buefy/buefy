export const use = (plugin) => {
    if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin)
    }
}

export const registerComponentAsPlugin = (component) => {
    const plugin = {
        install(Vue, options) {
            registerComponent(Vue, component)
        }
    }
    use(plugin)
}

export const registerComponentsAsPlugin = (components) => {
    const plugin = {
        install(Vue, options) {
            registerComponents(Vue, components)
        }
    }
    use(plugin)
}

export const registerComponentProgrammaticAsPlugin = (property, component) => {
    const plugin = {
        install(Vue, options) {
            registerComponentProgrammatic(Vue, property, component)
        }
    }
    use(plugin)
}

export const registerComponent = (Vue, component) => {
    Vue.component(component.name, component)
}

export const registerComponents = (Vue, components) => {
    components.forEach((component) => {
        registerComponent(Vue, component)
    })
}

export const registerComponentProgrammatic = (Vue, property, component) => {
    Vue.prototype[property] = component
}
