import { Checkbox, CheckboxGroup } from './components/checkbox'
import { Radio, RadioGroup, RadioButton } from './components/radio'
import { Table, TableColumn } from './components/table'
import Icon from './components/icon'
import Message from './components/message'
import Notification from './components/notification'
import Pagination from './components/pagination'
import Switch from './components/switch'
import Tooltip from './components/tooltip'

import Dialog from './components/dialog'
import Snackbar from './components/snackbar'
import Toast from './components/toast'

import config from './utils/config'

const components = {
    Checkbox,
    CheckboxGroup,
    Icon,
    Message,
    Notification,
    Pagination,
    Radio,
    RadioButton,
    RadioGroup,
    Switch,
    Table,
    TableColumn,
    Tooltip
}

components.install = (Vue, options = {}) => {
    config.setDefaultContentElement(options.defaultContentElement)
    config.setDefaultIconType(options.defaultIconType)

    for (const componentName in components) {
        const component = components[componentName]

        if (component && componentName !== 'install') {
            Vue.component(component.name, component)
        }
    }

    Vue.prototype.$snackbar = Snackbar
    Vue.prototype.$toast = Toast
    Vue.prototype.$dialog = Dialog
}

export default components
