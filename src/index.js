import { Checkbox, CheckboxButton } from './components/checkbox'
import { Dropdown, DropdownItem } from './components/dropdown'
import { Radio, RadioButton } from './components/radio'
import { Table, TableColumn } from './components/table'
import { Tabs, TabItem } from './components/tabs'
import { Tag, Taglist } from './components/tag'
import Autocomplete from './components/autocomplete'
import Collapse from './components/collapse'
import Datepicker from './components/datepicker'
import Dialog from './components/dialog'
import Field from './components/field'
import Icon from './components/icon'
import Input from './components/input'
import LoadingProgrammatic, { Loading } from './components/loading'
import Message from './components/message'
import ModalProgrammatic, { Modal } from './components/modal'
import Notification from './components/notification'
import Pagination from './components/pagination'
import Panel from './components/panel'
import Select from './components/select'
import Snackbar from './components/snackbar'
import Switch from './components/switch'
import Taginput from './components/taginput'
import Timepicker from './components/timepicker'
import Toast from './components/toast'
import Tooltip from './components/tooltip'
import Upload from './components/upload'

import config, { setOptions } from './utils/config'

const components = {
    Autocomplete,
    Checkbox,
    CheckboxButton,
    Collapse,
    Datepicker,
    Dropdown,
    DropdownItem,
    Field,
    Icon,
    Input,
    Loading,
    Message,
    Modal,
    Notification,
    Pagination,
    Panel,
    Radio,
    RadioButton,
    Select,
    Switch,
    TabItem,
    Table,
    TableColumn,
    Tabs,
    Tag,
    Taglist,
    Taginput,
    Timepicker,
    Tooltip,
    Upload
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

    Vue.prototype.$dialog = Dialog
    Vue.prototype.$loading = LoadingProgrammatic
    Vue.prototype.$modal = ModalProgrammatic
    Vue.prototype.$snackbar = Snackbar
    Vue.prototype.$toast = Toast
}

export default components

export {
    Dialog,
    LoadingProgrammatic,
    ModalProgrammatic,
    Snackbar,
    Toast
}
