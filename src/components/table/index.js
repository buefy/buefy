import Table from './Table'
import TableColumn from './TableColumn'

import { registerComponentsAsPlugin } from '../../utils/plugins'

registerComponentsAsPlugin([Table, TableColumn])

export {
    Table,
    TableColumn
}
