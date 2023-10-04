import Taginput from './Taginput.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Taginput)
    }
}

use(Plugin)

export default Plugin

export {
    Taginput as BTaginput
}
