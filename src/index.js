import { Checkbox, CheckboxGroup } from './components/checkbox'
import { Radio, RadioGroup, RadioButton } from './components/radio'
import { Select, Option } from './components/select'
import { Table, TableColumn } from './components/table'
import Dropdown from './components/dropdown'
import Field from './components/field'
import Icon from './components/icon'
import Input from './components/input'
import Message from './components/message'
import Modal from './components/modal'
import Notification from './components/notification'
import Pagination from './components/pagination'
import Switch from './components/switch'
import Tooltip from './components/tooltip'

import Dialog from './components/dialog'
import Snackbar from './components/snackbar'
import Toast from './components/toast'

import config, { setOptions } from './utils/config'

const components = {
    Checkbox,
    CheckboxGroup,
    Dropdown,
    Field,
    Icon,
    Input,
    Message,
    Modal,
    Notification,
    Option,
    Pagination,
    Radio,
    RadioButton,
    RadioGroup,
    Select,
    Switch,
    Table,
    TableColumn,
    Tooltip
}

components.install = (Vue, options = {}) => {
    // Options
    setOptions(Object.assign(config, options))

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
