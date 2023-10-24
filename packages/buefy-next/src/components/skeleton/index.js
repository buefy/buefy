import Skeleton from './Skeleton.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Skeleton)
    }
}

use(Plugin)

export default Plugin

export {
    Skeleton as BSkeleton
}
