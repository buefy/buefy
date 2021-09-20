import Breadcrumb from './Breadcrumb'
import BreadcrumbItem from './BreadcrumbItem'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Breadcrumb)
        registerComponent(Vue, BreadcrumbItem)
    }
}

use(Plugin)

export default Plugin

export {
    Breadcrumb as BBreadcrumb,
    BreadcrumbItem as BBreadcrumbItem
}
