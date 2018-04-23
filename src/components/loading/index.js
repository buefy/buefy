import Vue from 'vue'
import Loading from './Loading'

import { registerComponentAsPlugin, registerComponentProgrammaticAsPlugin } from '../../utils/plugins'

const LoadingProgrammatic = {
    open(params) {
        const defaultParam = {
            programmatic: true
        }
        const propsData = Object.assign(defaultParam, params)

        const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
        const LoadingComponent = vm.extend(Loading)
        return new LoadingComponent({
            el: document.createElement('div'),
            propsData
        })
    }
}

registerComponentAsPlugin(Loading)
registerComponentProgrammaticAsPlugin('$loading', LoadingProgrammatic)

export { Loading }
export default LoadingProgrammatic
