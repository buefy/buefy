import Switch from './Switch'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Switch)
    }
}

use(Plugin)

export default Plugin

export {
    Switch
}
