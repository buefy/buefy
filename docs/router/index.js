import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('../pages/Home')

const Documentation = () => import('../pages/documentation/Documentation')

import Installation from '../pages/documentation/installation/InstallationNav'
const Start = () => import('../pages/documentation/installation/Start')
const Customization = () => import('../pages/documentation/installation/Customization')
const ConstructorOptions = () => import('../pages/documentation/installation/ConstructorOptions')

import General from '../pages/documentation/general/GeneralNav'
const Layout = () => import('../pages/documentation/general/layout')
const Icon = () => import('../pages/documentation/general/icon')
const Dropdown = () => import('../pages/documentation/general/dropdown')
const Modal = () => import('../pages/documentation/general/modal')
const Collapse = () => import('../pages/documentation/general/collapse')
const Panel = () => import('../pages/documentation/general/panel')
const Tabs = () => import('../pages/documentation/general/tabs')
const Tag = () => import('../pages/documentation/general/tag')
const Tooltip = () => import('../pages/documentation/general/tooltip')

import Notices from '../pages/documentation/notices/NoticesNav'
const Dialog = () => import('../pages/documentation/notices/dialog')
const Toast = () => import('../pages/documentation/notices/toast')
const Snackbar = () => import('../pages/documentation/notices/snackbar')
const Notification = () => import('../pages/documentation/notices/notification')
const Message = () => import('../pages/documentation/notices/message')
const Loading = () => import('../pages/documentation/notices/loading')

import FormElements from '../pages/documentation/form/FormNav'
const Field = () => import('../pages/documentation/form/field')
const Input = () => import('../pages/documentation/form/input')
const Select = () => import('../pages/documentation/form/select')
const Autocomplete = () => import('../pages/documentation/form/autocomplete')
const Checkbox = () => import('../pages/documentation/form/checkbox')
const Radio = () => import('../pages/documentation/form/radio')
const Switch = () => import('../pages/documentation/form/switch')
const Upload = () => import('../pages/documentation/form/upload')
const Datepicker = () => import('../pages/documentation/form/datepicker')

import DataManipulation from '../pages/documentation/data/DataNav'
const Table = () => import('../pages/documentation/data/table')
const Pagination = () => import('../pages/documentation/data/pagination')

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
                    component: Start,
                    meta: {
                        category: Installation
                    }
                },
                {
                    path: 'customization',
                    component: Customization,
                    meta: {
                        category: Installation
                    }
                },
                {
                    path: 'constructor-options',
                    component: ConstructorOptions,
                    meta: {
                        category: Installation
                    }
                },
                {
                    path: 'layout',
                    component: Layout,
                    meta: {
                        category: General
                    }
                },
                {
                    path: 'icon',
                    component: Icon,
                    meta: {
                        category: General
                    }
                },
                {
                    path: 'dropdown',
                    component: Dropdown,
                    meta: {
                        category: General
                    }
                },
                {
                    path: 'tooltip',
                    component: Tooltip,
                    meta: {
                        category: General
                    }
                },
                {
                    path: 'modal',
                    component: Modal,
                    meta: {
                        category: General
                    }
                },
                {
                    path: 'tabs',
                    component: Tabs,
                    meta: {
                        category: General
                    }
                },
                {
                    path: 'collapse',
                    component: Collapse,
                    meta: {
                        category: General
                    }
                },
                {
                    path: 'panel',
                    component: Panel,
                    meta: {
                        category: General
                    }
                },
                {
                    path: 'tag',
                    component: Tag,
                    meta: {
                        category: General
                    }
                },
                {
                    path: 'dialog',
                    component: Dialog,
                    meta: {
                        category: Notices
                    }
                },
                {
                    path: 'toast',
                    component: Toast,
                    meta: {
                        category: Notices
                    }
                },
                {
                    path: 'snackbar',
                    component: Snackbar,
                    meta: {
                        category: Notices
                    }
                },
                {
                    path: 'notification',
                    component: Notification,
                    meta: {
                        category: Notices
                    }
                },
                {
                    path: 'message',
                    component: Message,
                    meta: {
                        category: Notices
                    }
                },
                {
                    path: 'loading',
                    component: Loading,
                    meta: {
                        category: Notices
                    }
                },
                {
                    path: 'field',
                    component: Field,
                    meta: {
                        category: FormElements
                    }
                },
                {
                    path: 'input',
                    component: Input,
                    meta: {
                        category: FormElements
                    }
                },
                {
                    path: 'select',
                    component: Select,
                    meta: {
                        category: FormElements
                    }
                },
                {
                    path: 'autocomplete',
                    component: Autocomplete,
                    meta: {
                        category: FormElements
                    }
                },
                {
                    path: 'checkbox',
                    component: Checkbox,
                    meta: {
                        category: FormElements
                    }
                },
                {
                    path: 'radio',
                    component: Radio,
                    meta: {
                        category: FormElements
                    }
                },
                {
                    path: 'switch',
                    component: Switch,
                    meta: {
                        category: FormElements
                    }
                },
                {
                    path: 'datepicker',
                    component: Datepicker,
                    meta: {
                        category: FormElements
                    }
                },
                {
                    path: 'upload',
                    component: Upload,
                    meta: {
                        category: FormElements
                    }
                },
                {
                    path: 'table',
                    component: Table,
                    meta: {
                        category: DataManipulation
                    }
                },
                {
                    path: 'pagination',
                    component: Pagination,
                    meta: {
                        category: DataManipulation
                    }
                },
                {
                    path: '',
                    redirect: 'start'
                }
            ]
        }
    ]
})
