import Vue from 'vue'
import Loading from './Loading'

import { use, registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

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

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Loading)
        registerComponentProgrammatic(Vue, '$loading', LoadingProgrammatic)
    }
}

use(Plugin)

export default Plugin

export {
    Loading,
    LoadingProgrammatic
}
