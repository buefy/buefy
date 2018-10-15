
import './scss/buefy-build.scss'

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
        registerComponentProgrammatic(Vue, '$buefy', BuefyProgrammatic)
    }
}

use(Buefy)

export default Buefy
