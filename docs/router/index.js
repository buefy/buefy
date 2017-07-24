import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('../pages/Home')

const Documentation = () => import('../pages/documentation/Documentation')

const Installation = () => import('../pages/documentation/installation/_Installation')
const Start = () => import('../pages/documentation/installation/Start')
const Customization = () => import('../pages/documentation/installation/Customization')
const ConstructorOptions = () => import('../pages/documentation/installation/ConstructorOptions')

const General = () => import('../pages/documentation/general/_General')
const Layout = () => import('../pages/documentation/general/Layout')
const Icon = () => import('../pages/documentation/general/Icon')
const Dropdown = () => import('../pages/documentation/general/Dropdown')
const Menu = () => import('../pages/documentation/general/Menu')
const Modal = () => import('../pages/documentation/general/Modal')
const Panel = () => import('../pages/documentation/general/Panel')
const Tabs = () => import('../pages/documentation/general/Tabs')
const Tooltip = () => import('../pages/documentation/general/Tooltip')

const Notices = () => import('../pages/documentation/notices/_Notices')
const Dialog = () => import('../pages/documentation/notices/Dialog')
const Toast = () => import('../pages/documentation/notices/Toast')
const Snackbar = () => import('../pages/documentation/notices/Snackbar')
const Notification = () => import('../pages/documentation/notices/Notification')
const Message = () => import('../pages/documentation/notices/Message')
const Loading = () => import('../pages/documentation/notices/Loading')

const Form = () => import('../pages/documentation/form/_Form')
const Field = () => import('../pages/documentation/form/Field')
const Input = () => import('../pages/documentation/form/Input')
const Select = () => import('../pages/documentation/form/Select')
const Autocomplete = () => import('../pages/documentation/form/Autocomplete')
const Checkbox = () => import('../pages/documentation/form/Checkbox')
const Radio = () => import('../pages/documentation/form/Radio')
const Switch = () => import('../pages/documentation/form/Switch')

const Data = () => import('../pages/documentation/data/_Data')
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
                    path: 'menu',
                    component: Menu,
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
                    redirect: 'start'
                }
            ]
        }
    ]
})
