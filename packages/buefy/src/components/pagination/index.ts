import type { App } from 'vue'
import Pagination from './Pagination.vue'
import PaginationButton from './PaginationButton.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Pagination)
        registerComponent(Vue, PaginationButton)
    }
}

export default Plugin

export {
    Pagination as BPagination,
    PaginationButton as BPaginationButton
}
