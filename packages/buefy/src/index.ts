import type { App } from 'vue'

import './utils/vue-augmentation'
import allComponents from './components'

import { merge } from './utils/helpers'
import config, { setOptions, setVueInstance } from './utils/config'
import type { BuefyConfig, BuefyConfigOptions } from './utils/config'
import { registerComponentProgrammatic } from './utils/plugins'

import ConfigComponent, { configInjectionKey } from './utils/ConfigComponent'

const Buefy = {
    install(Vue: App, options: BuefyConfigOptions = {}) {
        setVueInstance(Vue)
        // Options
        setOptions(merge<BuefyConfig>(config, options, true))
        // Components
        allComponents.forEach((component) => Vue.use(component))
        // Config component
        registerComponentProgrammatic(Vue, 'config', ConfigComponent, configInjectionKey)

        Vue.config.globalProperties.$buefy.globalNoticeInterval = undefined
    }
}

export default Buefy

// export all components as vue plugin
export * from './components'
// export programmatic component
export { DialogProgrammatic, useDialog } from './components/dialog'
export { LoadingProgrammatic, useLoading } from './components/loading'
export { ModalProgrammatic, useModal } from './components/modal'
export { NotificationProgrammatic, useNotification } from './components/notification'
export { SnackbarProgrammatic, useSnackbar } from './components/snackbar'
export { ToastProgrammatic, useToast } from './components/toast'
export { default as ConfigProgrammatic, useConfigComponent } from './utils/ConfigComponent'
export { default as Color } from './utils/color'
// export helpers
export * from './utils/helpers'
// exports types in config
export type * from './utils/config'
