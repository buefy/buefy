import type { App } from 'vue'

import './utils/vue-augmentation'
import allComponents from './components'

import { merge } from './utils/helpers'
import config, { setOptions, setVueInstance } from './utils/config'
import { registerComponentProgrammatic } from './utils/plugins'

import ConfigComponent from './utils/ConfigComponent'

const Buefy = {
    install(Vue: App, options = {}) {
        setVueInstance(Vue)
        // Options
        setOptions(merge(config, options, true))
        // Components
        allComponents.forEach((component) => Vue.use(component))
        // Config component
        registerComponentProgrammatic(Vue, 'config', ConfigComponent)

        Vue.config.globalProperties.$buefy.globalNoticeInterval = undefined
    }
}

export default Buefy

// export all components as vue plugin
export * from './components'
// export programmatic component
export { DialogProgrammatic } from './components/dialog'
export { LoadingProgrammatic } from './components/loading'
export { ModalProgrammatic } from './components/modal'
export { NotificationProgrammatic } from './components/notification'
export { SnackbarProgrammatic } from './components/snackbar'
export { ToastProgrammatic } from './components/toast'
export { default as ConfigProgrammatic } from './utils/ConfigComponent'
export { default as Color } from './utils/color'
// export helpers
export * from './utils/helpers'
