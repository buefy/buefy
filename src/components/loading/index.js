import { createApp, h as createElement } from 'vue'

import Loading from './Loading'

import { merge, getComponentFromVNode } from '../../utils/helpers'
import { use, registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

const LoadingProgrammatic = {
    open(params) {
        const defaultParam = {
            programmatic: true
        }
        const propsData = merge(defaultParam, params)
        const container = document.createElement('div')
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
        return vueInstance.mount(container)
    }
}

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Loading)
        registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic)
    }
}

use(Plugin)

export default Plugin

export {
    LoadingProgrammatic,
    Loading as BLoading
}
