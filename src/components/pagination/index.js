import Pagination from './Pagination'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Pagination)
    }
}

use(Plugin)

export default Plugin

export {
    Pagination
}
