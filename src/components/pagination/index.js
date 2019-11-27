import Pagination from './Pagination'
import PaginationButton from './PaginationButton'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Pagination)
        registerComponent(Vue, PaginationButton)
    }
}

use(Plugin)

export default Plugin

export {
    Pagination as BPagination,
    PaginationButton as BPaginationButton
}
