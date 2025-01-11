import type { App } from 'vue'
import Upload from './Upload.vue'
import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Upload)
    }
}

export default Plugin

export {
    Upload as BUpload
}
