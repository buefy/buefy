import Icon from './components/icon'
import Switch from './components/switch'
// import Tooltip from './components/tooltip'
import Notification from './components/notification'
import { Checkbox, CheckboxGroup } from './components/checkbox'
import { Radio, RadioGroup, RadioButton } from './components/radio'
import { Table, TableColumn } from './components/table'
import Pagination from './components/pagination'

import Snackbar from './components/snackbar'
import Toast from './components/toast'

import config from './utils/config'

const components = {
    Icon,
    Switch,
    // Tooltip,
    Notification,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    RadioButton,
    Table,
    TableColumn,
    Pagination
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
}

export default components
