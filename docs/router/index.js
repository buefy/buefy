import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('../pages/Home')

const Documentation = () => import('../pages/documentation/Documentation')

import Installation from '../pages/documentation/installation/_Installation'
const Start = () => import('../pages/documentation/installation/Start')
const Customization = () => import('../pages/documentation/installation/Customization')
const ConstructorOptions = () => import('../pages/documentation/installation/ConstructorOptions')

import General from '../pages/documentation/general/_General'
const Layout = () => import('../pages/documentation/general/Layout')
const Icon = () => import('../pages/documentation/general/Icon')
const Card = () => import('../pages/documentation/general/Card')
const Dropdown = () => import('../pages/documentation/general/Dropdown')
const Modal = () => import('../pages/documentation/general/Modal')
const Panel = () => import('../pages/documentation/general/Panel')
const Tabs = () => import('../pages/documentation/general/Tabs')
const Tooltip = () => import('../pages/documentation/general/Tooltip')
const Tag = () => import('../pages/documentation/general/Tag')

import Notices from '../pages/documentation/notices/_Notices'
const Dialog = () => import('../pages/documentation/notices/Dialog')
const Toast = () => import('../pages/documentation/notices/Toast')
const Snackbar = () => import('../pages/documentation/notices/Snackbar')
const Notification = () => import('../pages/documentation/notices/Notification')
const Message = () => import('../pages/documentation/notices/Message')
const Loading = () => import('../pages/documentation/notices/Loading')

import FormElements from '../pages/documentation/form/_Form'
const Field = () => import('../pages/documentation/form/Field')
const Input = () => import('../pages/documentation/form/Input')
const Select = () => import('../pages/documentation/form/Select')
const Autocomplete = () => import('../pages/documentation/form/Autocomplete')
const Checkbox = () => import('../pages/documentation/form/Checkbox')
const Radio = () => import('../pages/documentation/form/Radio')
const Switch = () => import('../pages/documentation/form/Switch')
const Upload = () => import('../pages/documentation/form/Upload')
const Datepicker = () => import('../pages/documentation/form/Datepicker')

import DataManipulation from '../pages/documentation/data/_Data'
const Table = () => import('../pages/documentation/data/Table')
const Pagination = () => import('../pages/documentation/data/Pagination')

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
                    path: 'card',
                    component: Card,
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
