import * as components from './components'

import { merge } from './utils/helpers'
import config, { setOptions, setVueInstance } from './utils/config'
import { use, registerComponentProgrammatic } from './utils/plugins'

const Buefy = {
    install(Vue, options = {}) {
        setVueInstance(Vue)
        // Options
        setOptions(merge(config, options, true))
        // Components
        for (let componentKey in components) {
            Vue.use(components[componentKey])
        }
        // Config component
        const BuefyProgrammatic = {
            getOptions() {
                return config
            },
            setOptions(options) {
                setOptions(merge(config, options, true))
            }
        }
        registerComponentProgrammatic(Vue, 'config', BuefyProgrammatic)
    }
}

use(Buefy)

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
// export helpers
export * from './utils/helpers'
