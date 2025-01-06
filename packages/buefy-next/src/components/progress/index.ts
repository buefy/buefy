import type { App } from 'vue'
import Progress from './Progress.vue'
import ProgressBar from './ProgressBar.vue'
import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Progress)
        registerComponent(Vue, ProgressBar)
    }
}

export default Plugin

export {
    Progress as BProgress,
    ProgressBar as BProgressBar
}
