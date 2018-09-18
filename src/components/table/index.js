import Table from './Table'
import TableColumn from './TableColumn'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Table)
        registerComponent(Vue, TableColumn)
    }
}

use(Plugin)

export default Plugin

export {
    Table,
    TableColumn
}
