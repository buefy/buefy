import Image from './Image.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Image)
    }
}

export default Plugin

export {
    Image as BImage
}
