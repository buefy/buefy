import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Templates
const Documentation = () => import('@/templates/Documentation')
const Extensions = () => import('@/templates/Extensions')

// Pages
const Home = () => import('@/pages/Home')
const Layout = () => import('@/pages/Layout')

// Pages / Installation
const ConstructorOptions = () => import('@/pages/installation/ConstructorOptions')
const Customization = () => import('@/pages/installation/Customization')
const Start = () => import('@/pages/installation/Start')

// Pages / Components
const Autocomplete = () => import('@/pages/components/autocomplete/Autocomplete')
const Checkbox = () => import('@/pages/components/checkbox/Checkbox')
const Collapse = () => import('@/pages/components/collapse/Collapse')
const Datepicker = () => import('@/pages/components/datepicker/Datepicker')
const Dialog = () => import('@/pages/components/dialog/Dialog')
const Dropdown = () => import('@/pages/components/dropdown/Dropdown')
const Field = () => import('@/pages/components/field/Field')
const Icon = () => import('@/pages/components/icon/Icon')
const Input = () => import('@/pages/components/input/Input')
const Loading = () => import('@/pages/components/loading/Loading')
const Message = () => import('@/pages/components/message/Message')
const Modal = () => import('@/pages/components/modal/Modal')
const Notification = () => import('@/pages/components/notification/Notification')
const Pagination = () => import('@/pages/components/pagination/Pagination')
const Panel = () => import('@/pages/components/panel/Panel')
const Radio = () => import('@/pages/components/radio/Radio')
const Select = () => import('@/pages/components/select/Select')
const Snackbar = () => import('@/pages/components/snackbar/Snackbar')
const Switch = () => import('@/pages/components/switch/Switch')
const Table = () => import('@/pages/components/table/Table')
const Tabs = () => import('@/pages/components/tabs/Tabs')
const Tag = () => import('@/pages/components/tag/Tag')
const Taginput = () => import('@/pages/components/taginput/Taginput')
const Timepicker = () => import('@/pages/components/timepicker/Timepicker')
const Toast = () => import('@/pages/components/toast/Toast')
const Tooltip = () => import('@/pages/components/tooltip/Tooltip')
const Upload = () => import('@/pages/components/upload/Upload')

// Pages / Extensions
const Cleavejs = () => import('@/pages/extensions/cleavejs/Cleavejs')

export default new Router({
    mode: 'hash',
    linkActiveClass: 'is-active',
    base: __dirname,
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/documentation',
            component: Documentation,
            children: [
                {
                    path: 'start',
                    component: Start
                },
                {
                    path: 'customization',
                    component: Customization
                },
                {
                    path: 'constructor-options',
                    component: ConstructorOptions
                },
                {
                    path: 'layout',
                    component: Layout
                },
                {
                    path: 'icon',
                    component: Icon
                },
                {
                    path: 'dropdown',
                    component: Dropdown
                },
                {
                    path: 'tooltip',
                    component: Tooltip
                },
                {
                    path: 'modal',
                    component: Modal
                },
                {
                    path: 'tabs',
                    component: Tabs
                },
                {
                    path: 'collapse',
                    component: Collapse
                },
                {
                    path: 'panel',
                    component: Panel
                },
                {
                    path: 'tag',
                    component: Tag
                },
                {
                    path: 'dialog',
                    component: Dialog
                },
                {
                    path: 'toast',
                    component: Toast
                },
                {
                    path: 'snackbar',
                    component: Snackbar
                },
                {
                    path: 'notification',
                    component: Notification
                },
                {
                    path: 'message',
                    component: Message
                },
                {
                    path: 'loading',
                    component: Loading
                },
                {
                    path: 'field',
                    component: Field
                },
                {
                    path: 'input',
                    component: Input
                },
                {
                    path: 'select',
                    component: Select
                },
                {
                    path: 'autocomplete',
                    component: Autocomplete
                },
                {
                    path: 'checkbox',
                    component: Checkbox
                },
                {
                    path: 'radio',
                    component: Radio
                },
                {
                    path: 'switch',
                    component: Switch
                },
                {
                    path: 'datepicker',
                    component: Datepicker
                },
                {
                    path: 'timepicker',
                    component: Timepicker
                },
                {
                    path: 'taginput',
                    component: Taginput
                },
                {
                    path: 'upload',
                    component: Upload
                },
                {
                    path: 'table',
                    component: Table
                },
                {
                    path: 'pagination',
                    component: Pagination
                },
                {
                    path: '',
                    redirect: 'start'
                }
            ]
        },
        {
            path: '/extensions',
            component: Extensions,
            children: [
                {
                    path: 'cleavejs',
                    component: Cleavejs
                },
                {
                    path: '',
                    redirect: 'cleavejs'
                }
            ]
        }
    ]
})
