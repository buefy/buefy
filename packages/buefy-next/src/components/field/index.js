import Field from './Field.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Field)
    }
}

export default Plugin

export {
    Field as BField
}
