import Numberinput from './Numberinput.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Numberinput)
    }
}

use(Plugin)

export default Plugin

export {
    Numberinput as BNumberinput
}
