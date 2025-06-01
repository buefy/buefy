import type { App } from 'vue'
import Table from './Table.vue'
import TableColumn from './TableColumn.vue'

import { registerComponent } from '../../utils/plugins'
import { VueInstance, setVueInstance } from '../../utils/config'
export type {
    ITableColumn,
    ModifierKeys,
    TableColumnOrder,
    TableColumnDragEvent,
    TableRow,
    TableRowDragEvent
} from './types'

const Plugin = {
    install(Vue: App) {
        // individual import + extend method into Table.vue
        if (typeof VueInstance === 'undefined') {
            setVueInstance(Vue)
        }
        registerComponent(Vue, Table)
        registerComponent(Vue, TableColumn)
    }
}

export default Plugin

export {
    Table as BTable,
    TableColumn as BTableColumn
}
