import Button from './Button'

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
