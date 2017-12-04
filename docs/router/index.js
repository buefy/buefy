import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Templates
const Documentation = () => import('@/templates/Documentation')
const Extensions = () => import('@/templates/Extensions')

// Home
const Home = () => import('@/pages/Home')

// Documentation

// Installation
const Start = () => import('@/pages/documentation/Start')
const Customization = () => import('@/pages/documentation/Customization')
const ConstructorOptions = () => import('@/pages/documentation/ConstructorOptions')

// General
const Layout = () => import('@/pages/documentation/Layout')
const Icon = () => import('@/pages/documentation/Icon')
const Dropdown = () => import('@/pages/documentation/Dropdown')
const Modal = () => import('@/pages/documentation/Modal')
const Collapse = () => import('@/pages/documentation/Collapse')
const Panel = () => import('@/pages/documentation/Panel')
const Tabs = () => import('@/pages/documentation/Tabs')
const Tag = () => import('@/pages/documentation/Tag')
const Tooltip = () => import('@/pages/documentation/Tooltip')

// Notices
const Dialog = () => import('@/pages/documentation/Dialog')
const Toast = () => import('@/pages/documentation/Toast')
const Snackbar = () => import('@/pages/documentation/Snackbar')
const Notification = () => import('@/pages/documentation/Notification')
const Message = () => import('@/pages/documentation/Message')
const Loading = () => import('@/pages/documentation/Loading')

// Form
const Field = () => import('@/pages/documentation/Field')
const Input = () => import('@/pages/documentation/Input')
const Select = () => import('@/pages/documentation/Select')
const Autocomplete = () => import('@/pages/documentation/Autocomplete')
const Checkbox = () => import('@/pages/documentation/Checkbox')
const Radio = () => import('@/pages/documentation/Radio')
const Switch = () => import('@/pages/documentation/Switch')
const Upload = () => import('@/pages/documentation/Upload')
const Datepicker = () => import('@/pages/documentation/Datepicker')
const Taginput = () => import('@/pages/documentation/TagInput')
const Timepicker = () => import('@/pages/documentation/Timepicker')

// Data
const Table = () => import('@/pages/documentation/Table')
const Pagination = () => import('@/pages/documentation/Pagination')

// Extensions
const CleaveJs = () => import('@/pages/extensions/Cleavejs')

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
                    component: CleaveJs
                },
                {
                    path: '',
                    redirect: 'cleavejs'
                }
            ]
        }
    ]
})
