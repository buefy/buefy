import * as components from './components'

import config, { setOptions } from './utils/config'
import { use, registerComponentProgrammatic } from './utils/plugins'

const Buefy = {
    install(Vue, options = {}) {
        // Options
        setOptions(Object.assign(config, options))
        // Components
        for (let componentKey in components) {
            Vue.use(components[componentKey])
        }
        // Config component
        const BuefyProgrammatic = {
            setOptions(options) {
                setOptions(Object.assign(config, options))
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
