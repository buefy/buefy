import Icon from './components/icon'
import Switch from './components/switch'
// import Tooltip from './components/tooltip'
import Notification from './components/notification'
import { Checkbox, CheckboxGroup } from './components/checkbox'
import { Radio, RadioGroup, RadioButton } from './components/radio'
import { Table, TableColumn } from './components/table'

import Notify from './components/notify'
import Toast from './components/toast'

import config from './utils/config'

const components = [
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
    TableColumn
]

const install = function (Vue, options = {}) {
    if (install.installed) return

    config.setDefaultContentElement(options.defaultContentElement)
    config.setDefaultIconType(options.defaultIconType)

    components.map(component => {
        Vue.component(component.name, component)
    })

    Vue.prototype.$notify = Notify
    Vue.prototype.$toast = Toast
}

export default {
    version: '0.0.1',
    install
}
