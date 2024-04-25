import Taginput from './Taginput.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Taginput)
    }
}

export default Plugin

export {
    Taginput as BTaginput
}
