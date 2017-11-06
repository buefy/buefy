import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Templates
const Documentation = () => import('@/templates/Documentation')
const Extensions = () => import('@/templates/Extensions')

// Home
const Home = () => import('@/pages/Home')

// Documentation
import Installation from '@/components/DocumentationNavInstallation'
const Start = () => import('@/pages/documentation/Start')
const Customization = () => import('@/pages/documentation/Customization')
const ConstructorOptions = () => import('@/pages/documentation/ConstructorOptions')

import General from '@/components/DocumentationNavGeneral'
const Layout = () => import('@/pages/documentation/Layout')
const Icon = () => import('@/pages/documentation/Icon')
const Dropdown = () => import('@/pages/documentation/Dropdown')
const Modal = () => import('@/pages/documentation/Modal')
const Collapse = () => import('@/pages/documentation/Collapse')
const Panel = () => import('@/pages/documentation/Panel')
const Tabs = () => import('@/pages/documentation/Tabs')
const Tag = () => import('@/pages/documentation/Tag')
const Tooltip = () => import('@/pages/documentation/Tooltip')

import Notices from '@/components/DocumentationNavNotices'
const Dialog = () => import('@/pages/documentation/Dialog')
const Toast = () => import('@/pages/documentation/Toast')
const Snackbar = () => import('@/pages/documentation/Snackbar')
const Notification = () => import('@/pages/documentation/Notification')
const Message = () => import('@/pages/documentation/Message')
const Loading = () => import('@/pages/documentation/Loading')

import FormElements from '@/components/DocumentationNavForm'
const Field = () => import('@/pages/documentation/Field')
const Input = () => import('@/pages/documentation/Input')
const Select = () => import('@/pages/documentation/Select')
const Autocomplete = () => import('@/pages/documentation/Autocomplete')
const Checkbox = () => import('@/pages/documentation/Checkbox')
const Radio = () => import('@/pages/documentation/Radio')
const Switch = () => import('@/pages/documentation/Switch')
const Upload = () => import('@/pages/documentation/Upload')
const Datepicker = () => import('@/pages/documentation/Datepicker')
const Timepicker = () => import('@/pages/documentation/Timepicker')

import DataManipulation from '@/components/DocumentationNavData'
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
                    path: 'timepicker',
                    component: Timepicker,
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
