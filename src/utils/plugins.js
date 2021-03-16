export const use = (plugin) => {
    if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin)
    }
}

export const registerComponent = (VueApp, component) => {
    if (!VueApp.prototype) {
        patchHooks(component)
    }

    VueApp.component(component.name, component)
}

export const registerComponentProgrammatic = (VueApp, property, component) => {
    if (VueApp.prototype) {
        // Vue 2
        if (!VueApp.prototype.$buefy) VueApp.prototype.$buefy = {}
        VueApp.prototype.$buefy[property] = component
    } else {
        // Vue 3
        patchHooks(component)

        let provided = VueApp.config.globalProperties.$buefy

        if (!provided) {
            provided = VueApp.config.globalProperties.$buefy = {}
            VueApp.provide('$buefy', provided)
        }

        provided[property] = component
    }
}

function patchHooks (component) {
    const deprecatedHooks = [
        ['beforeDestroy', 'beforeUnmount'],
        ['destroyed', 'umounted'],
    ]

    deprecatedHooks.forEach(([v2Name, v3Name]) => {
        const v2Value = component[v2Name]

        if (!v2Value) return

        component[v3Name] = v2Value
        component[v2Name] = undefined
    })

    if (component.mixins) {
        component.mixins.forEach(mixin => patchHooks(mixin))
    }
}
