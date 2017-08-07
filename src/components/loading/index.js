import Vue from 'vue'
import Loading from './Loading'

export { Loading }
export default {
    open(params) {
        const defaultParam = {
            programmatic: true
        }
        const propsData = Object.assign(defaultParam, params)
        const LoadingComponent = Vue.extend(Loading)
        return new LoadingComponent({
            el: document.createElement('div'),
            propsData
        })
    }
}

