import Breadcrumb from './Breadcrumb'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Breadcrumb)
    }
}

use(Plugin)

export default Plugin

export {
    Breadcrumb as BBreadcrumb
}
