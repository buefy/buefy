import { Checkbox, CheckboxGroup } from './components/checkbox'
import { Input, Field } from './components/input'
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

import NoticeMixin from './utils/NoticeMixin'

const components = {
    Checkbox,
    CheckboxGroup,
    Field,
    Icon,
    Input,
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
    // Options
    NoticeMixin.props.container.default = options.defaultContentElement || NoticeMixin.props.container.default
    Icon.props.pack.default = options.defaultIconPack || Icon.props.pack.default
    Tooltip.props.type.default = options.defaultTooltipType || Tooltip.props.type.default
    Tooltip.props.animated.default = options.defaultTooltipIsAnimated || Tooltip.props.animated.default
    Input.props.autocomplete.default = options.defaultInputAutocomplete || Input.props.autocomplete.default

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
