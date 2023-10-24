import Field from './Field.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Field)
    }
}

use(Plugin)

export default Plugin

export {
    Field as BField
}
