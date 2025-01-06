/* eslint-disable import/first */
import Autocomplete from './autocomplete'
export * from './autocomplete'
import Breadcrumb from './breadcrumb'
export * from './breadcrumb'
import Button from './button'
export * from './button'
import Carousel from './carousel'
export * from './carousel'
import Checkbox from './checkbox'
export * from './checkbox'
import Collapse from './collapse'
export * from './collapse'
import Clockpicker from './clockpicker'
export * from './clockpicker'
import Colorpicker from './colorpicker'
export * from './colorpicker'
import Datepicker from './datepicker'
export * from './datepicker'
import Datetimepicker from './datetimepicker'
export * from './datetimepicker'
import Dialog from './dialog'
export * from './dialog'
import Dropdown from './dropdown'
export * from './dropdown'
import Field from './field'
export * from './field'
import Icon from './icon'
export * from './icon'
import Image from './image'
export * from './image'
import Input from './input'
export * from './input'
import Loading from './loading'
export * from './loading'
import Menu from './menu'
export * from './menu'
import Message from './message'
export * from './message'
import Modal from './modal'
export * from './modal'
import Notification from './notification'
export * from './notification'
import Navbar from './navbar'
export * from './navbar'
import Numberinput from './numberinput'
export * from './numberinput'
import Pagination from './pagination'
export * from './pagination'
import Progress from './progress'
export * from './progress'
import Radio from './radio'
export * from './radio'
import Rate from './rate'
export * from './rate'
import Select from './select'
export * from './select'
import Skeleton from './skeleton'
export * from './skeleton'
import Sidebar from './sidebar'
export * from './sidebar'
import Slider from './slider'
export * from './slider'
import Snackbar from './snackbar'
export * from './snackbar'
import Steps from './steps'
export * from './steps'
import Switch from './switch'
export * from './switch'
import Table from './table'
export * from './table'
import Tabs from './tabs'
export * from './tabs'
import Tag from './tag'
export * from './tag'
import Taginput from './taginput'
export * from './taginput'
import Timepicker from './timepicker'
export * from './timepicker'
import Toast from './toast'
export * from './toast'
import Tooltip from './tooltip'
export * from './tooltip'
import Upload from './upload'
export * from './upload'
/* eslint-enable import/first */

// exports plugins of individual components for separate install
export {
    Autocomplete,
    Breadcrumb,
    Button,
    Carousel,
    Checkbox,
    Clockpicker,
    Collapse,
    Colorpicker,
    Datepicker,
    Datetimepicker,
    Dialog,
    Dropdown,
    Field,
    Icon,
    Image,
    Input,
    Loading,
    Menu,
    Message,
    Modal,
    Navbar,
    Notification,
    Numberinput,
    Pagination,
    Progress,
    Radio,
    Rate,
    Select,
    Skeleton,
    Sidebar,
    Slider,
    Snackbar,
    Steps,
    Switch,
    Table,
    Tabs,
    Tag,
    Taginput,
    Timepicker,
    Toast,
    Tooltip,
    Upload
}

// exports an array of all the component plugins for batch install
const allComponents = [
    Autocomplete,
    Breadcrumb,
    Button,
    Carousel,
    Checkbox,
    Clockpicker,
    Collapse,
    Colorpicker,
    Datepicker,
    Datetimepicker,
    Dialog,
    Dropdown,
    Field,
    Icon,
    Image,
    Input,
    Loading,
    Menu,
    Message,
    Modal,
    Navbar,
    Notification,
    Numberinput,
    Pagination,
    Progress,
    Radio,
    Rate,
    Select,
    Skeleton,
    Sidebar,
    Slider,
    Snackbar,
    Steps,
    Switch,
    Table,
    Tabs,
    Tag,
    Taginput,
    Timepicker,
    Toast,
    Tooltip,
    Upload
] as const
export default allComponents
