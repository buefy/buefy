import { createApp, h as createElement } from 'vue'
import type { App, ComponentPublicInstance } from 'vue'

import Loading from './Loading.vue'
import type { LoadingProps } from './Loading.vue'

import { copyAppContext, getComponentFromVNode } from '../../utils/helpers'
import { registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

export type LoadingOpenParams = Omit<LoadingProps, 'programmatic'>

// Minimal definition of a programmatically opened Loading.
//
// ESLint does not like `{}` as a type but allowed here to make them look
// similar to Vue's definition: https://github.com/vuejs/core/blob/fbc0c42bcf6dea5a6ae664223fa19d4375ca39f0/packages/runtime-core/src/componentPublicInstance.ts#L290-L305.
/* eslint-disable @typescript-eslint/ban-types */
type LoadingProgrammaticInstance = ComponentPublicInstance<
    {}, // P
    {}, // B
    {}, // D
    {}, // C
    { close: () => void } // M
>
/* eslint-enable @typescript-eslint/ban-types */

class LoadingProgrammatic {
    private app: App | undefined

    constructor(app?: App) {
        this.app = app // may be undefined in the testing environment
    }

    open(params: LoadingOpenParams) {
        const propsData = params
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
                        (loading as LoadingProgrammaticInstance).close()
                    }
                }
            },
            render() {
                this.loadingVNode = createElement(
                    Loading,
                    {
                        ...propsData,
                        programmatic: true,
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
        return vueInstance.mount(container) as LoadingProgrammaticInstance
    }
}

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Loading)
        registerComponentProgrammatic(Vue, 'loading', new LoadingProgrammatic(Vue))
    }
}

export default Plugin

export {
    LoadingProgrammatic,
    Loading as BLoading
}
