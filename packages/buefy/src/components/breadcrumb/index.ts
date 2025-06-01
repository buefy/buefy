import type { App } from 'vue'
import Breadcrumb from './Breadcrumb.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Breadcrumb)
        registerComponent(Vue, BreadcrumbItem)
    }
}

export default Plugin

export {
    Breadcrumb as BBreadcrumb,
    BreadcrumbItem as BBreadcrumbItem
}
