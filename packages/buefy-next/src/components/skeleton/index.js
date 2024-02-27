import Skeleton from './Skeleton.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        // explicit `name` is needed to avoid name mangling of
        // Functional Component in production
        registerComponent(Vue, Skeleton, 'BSkeleton')
    }
}

use(Plugin)

export default Plugin

export {
    Skeleton as BSkeleton
}
