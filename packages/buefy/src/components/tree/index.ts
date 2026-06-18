import type { App } from 'vue'
import Tree from './Tree.vue'
import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Tree)
    }
}

export default Plugin

export { Tree as BTree }
