import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = (r) => require(['../pages/Home'], r)

const Documentation = (r) => require(['../pages/documentation/Documentation'], r)

import Installation from '../pages/documentation/installation/_Installation'
const QuickStart = (r) => require(['../pages/documentation/installation/QuickStart'], r)
const Customization = (r) => require(['../pages/documentation/installation/Customization'], r)
const ConstructorOptions = (r) => require(['../pages/documentation/installation/ConstructorOptions'], r)

import General from '../pages/documentation/general/_General'
const UIElements = (r) => require(['../pages/documentation/general/UIElements'], r)
const Icon = (r) => require(['../pages/documentation/general/Icon'], r)
const Dropdown = (r) => require(['../pages/documentation/general/Dropdown'], r)
const Tooltip = (r) => require(['../pages/documentation/general/Tooltip'], r)
const Modal = (r) => require(['../pages/documentation/general/Modal'], r)
const Tabs = (r) => require(['../pages/documentation/general/Tabs'], r)

import Notices from '../pages/documentation/notices/_Notices'
const Dialog = (r) => require(['../pages/documentation/notices/Dialog'], r)
const Toast = (r) => require(['../pages/documentation/notices/Toast'], r)
const Snackbar = (r) => require(['../pages/documentation/notices/Snackbar'], r)
const Notification = (r) => require(['../pages/documentation/notices/Notification'], r)
const Message = (r) => require(['../pages/documentation/notices/Message'], r)

import Form from '../pages/documentation/form/_Form'
const Field = (r) => require(['../pages/documentation/form/Field'], r)
const Input = (r) => require(['../pages/documentation/form/Input'], r)
const Select = (r) => require(['../pages/documentation/form/Select'], r)
const Autocomplete = (r) => require(['../pages/documentation/form/Autocomplete'], r)
const Checkbox = (r) => require(['../pages/documentation/form/Checkbox'], r)
const Radio = (r) => require(['../pages/documentation/form/Radio'], r)
const Switch = (r) => require(['../pages/documentation/form/Switch'], r)

import Data from '../pages/documentation/data/_Data'
const Table = (r) => require(['../pages/documentation/data/Table'], r)
const Pagination = (r) => require(['../pages/documentation/data/Pagination'], r)

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
                    path: 'quick-start',
                    component: QuickStart,
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
                    path: 'ui-elements',
                    component: UIElements,
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
                    path: 'field',
                    component: Field,
                    meta: {
                        category: Form
                    }
                },
                {
                    path: 'input',
                    component: Input,
                    meta: {
                        category: Form
                    }
                },
                {
                    path: 'select',
                    component: Select,
                    meta: {
                        category: Form
                    }
                },
                {
                    path: 'autocomplete',
                    component: Autocomplete,
                    meta: {
                        category: Form
                    }
                },
                {
                    path: 'checkbox',
                    component: Checkbox,
                    meta: {
                        category: Form
                    }
                },
                {
                    path: 'radio',
                    component: Radio,
                    meta: {
                        category: Form
                    }
                },
                {
                    path: 'switch',
                    component: Switch,
                    meta: {
                        category: Form
                    }
                },
                {
                    path: 'table',
                    component: Table,
                    meta: {
                        category: Data
                    }
                },
                {
                    path: 'pagination',
                    component: Pagination,
                    meta: {
                        category: Data
                    }
                },
                {
                    path: '',
                    redirect: 'quick-start'
                }
            ]
        }
    ]
})
