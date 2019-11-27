import Rate from './Rate'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Rate)
    }
}

use(Plugin)

export default Plugin

export {
    Rate as BRate
}
