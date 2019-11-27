import Input from './Input'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Input)
    }
}

use(Plugin)

export default Plugin

export {
    Input as BInput
}
