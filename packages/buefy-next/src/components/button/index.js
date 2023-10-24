import Button from './Button.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Button)
    }
}

use(Plugin)

export default Plugin

export {
    Button as BButton
}
