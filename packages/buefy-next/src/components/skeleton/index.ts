import type { App } from 'vue'
import Skeleton from './Skeleton.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        // explicit `name` is needed to avoid name mangling of
        // Functional Component in production
        registerComponent(Vue, Skeleton, 'BSkeleton')
    }
}

export default Plugin

export {
    Skeleton as BSkeleton
}
