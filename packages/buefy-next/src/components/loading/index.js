import { createApp, h as createElement } from 'vue'

import Loading from './Loading.vue'

import { merge, copyAppContext, getComponentFromVNode } from '../../utils/helpers'
import { use, registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

class LoadingProgrammatic {
    constructor(app) {
        this.app = app // may be undefined in the testing environment
    }

    open(params) {
        const defaultParam = {
            programmatic: true
        }
        const propsData = merge(defaultParam, params)
        const container = document.createElement('div')
        // Vue 3 requires a new app to mount another component
        const vueInstance = createApp({
            data() {
                return {
                    loadingVNode: null
                }
            },
            methods: {
                close() {
                    // TODO: too much dependence on Vue's internal structure?
                    const loading = getComponentFromVNode(this.loadingVNode)
                    if (loading) {
                        loading.close()
                    }
                }
            },
            render() {
                this.loadingVNode = createElement(
                    Loading,
                    {
                        ...propsData,
                        onClose(...args) {
                            if (propsData.onClose) {
                                propsData.onClose(...args)
                            }
                            // timeout for the animation complete before destroying
                            setTimeout(() => {
                                vueInstance.unmount()
                            }, 150)
                        }
                    }
                )
                return this.loadingVNode
            }
        })
        if (this.app) {
            copyAppContext(this.app, vueInstance)
        }
        return vueInstance.mount(container)
    }
}

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Loading)
        registerComponentProgrammatic(Vue, 'loading', new LoadingProgrammatic(Vue))
    }
}

use(Plugin)

export default Plugin

export {
    LoadingProgrammatic,
    Loading as BLoading
}
