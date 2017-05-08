import { Checkbox, CheckboxGroup } from './components/checkbox'
import { Dropdown, DropdownOption } from './components/dropdown'
import { Radio, RadioGroup, RadioButton } from './components/radio'
import { Table, TableColumn } from './components/table'
import Field from './components/field'
import Icon from './components/icon'
import Input from './components/input'
import Message from './components/message'
import Modal from './components/modal'
import Notification from './components/notification'
import Pagination from './components/pagination'
import Select from './components/select'
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
    DropdownOption,
    Field,
    Icon,
    Input,
    Message,
    Modal,
    Notification,
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
