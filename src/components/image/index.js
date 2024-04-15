import Image from './Image.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Image)
    }
}

use(Plugin)

export default Plugin

export {
    Image as BImage
}
