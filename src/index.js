
import './scss/buefy-build.scss'

import components from './components'

import config, { setOptions } from './utils/config'
import { use } from './utils/plugins'

const Plugin = {
    install(Vue, options = {}) {
        // Options
        setOptions(Object.assign(config, options))
        // Components
        for (let componentKey in components) {
            Vue.use(components[componentKey])
        }
    }
}

use(Plugin)

export default Plugin
