import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = (r) => require(['../pages/Home'], r)

const Documentation = (r) => require(['../pages/documentation/Documentation'], r)

const QuickStart = (r) => require(['../pages/documentation/installation/QuickStart'], r)
const Customization = (r) => require(['../pages/documentation/installation/Customization'], r)
const ConstructorOptions = (r) => require(['../pages/documentation/installation/ConstructorOptions'], r)

const Icon = (r) => require(['../pages/documentation/general/Icon'], r)
const Tooltip = (r) => require(['../pages/documentation/general/Tooltip'], r)

const Dialog = (r) => require(['../pages/documentation/notices/Dialog'], r)
const Toast = (r) => require(['../pages/documentation/notices/Toast'], r)
const Snackbar = (r) => require(['../pages/documentation/notices/Snackbar'], r)
const Notification = (r) => require(['../pages/documentation/notices/Notification'], r)
const Message = (r) => require(['../pages/documentation/notices/Message'], r)

const Table = (r) => require(['../pages/documentation/data/Table'], r)
const Pagination = (r) => require(['../pages/documentation/data/Pagination'], r)

const Input = (r) => require(['../pages/documentation/form/Input'], r)
const Checkbox = (r) => require(['../pages/documentation/form/Checkbox'], r)
const Radio = (r) => require(['../pages/documentation/form/Radio'], r)
const Switch = (r) => require(['../pages/documentation/form/Switch'], r)

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
                        category: 'Installation'
                    }
                },
                {
                    path: 'customization',
                    component: Customization,
                    meta: {
                        category: 'Installation'
                    }
                },
                {
                    path: 'constructor-options',
                    component: ConstructorOptions,
                    meta: {
                        category: 'Installation'
                    }
                },
                {
                    path: 'icon',
                    component: Icon,
                    meta: {
                        category: 'General'
                    }
                },
                {
                    path: 'tooltip',
                    component: Tooltip,
                    meta: {
                        category: 'General'
                    }
                },
                {
                    path: 'dialog',
                    component: Dialog,
                    meta: {
                        category: 'Notices'
                    }
                },
                {
                    path: 'toast',
                    component: Toast,
                    meta: {
                        category: 'Notices'
                    }
                },
                {
                    path: 'snackbar',
                    component: Snackbar,
                    meta: {
                        category: 'Notices'
                    }
                },
                {
                    path: 'notification',
                    component: Notification,
                    meta: {
                        category: 'Notices'
                    }
                },
                {
                    path: 'message',
                    component: Message,
                    meta: {
                        category: 'Notices'
                    }
                },
                {
                    path: 'table',
                    component: Table,
                    meta: {
                        category: 'DataManipulation'
                    }
                },
                {
                    path: 'pagination',
                    component: Pagination,
                    meta: {
                        category: 'DataManipulation'
                    }
                },
                {
                    path: 'input',
                    component: Input,
                    meta: {
                        category: 'FormElements'
                    }
                },
                {
                    path: 'checkbox',
                    component: Checkbox,
                    meta: {
                        category: 'FormElements'
                    }
                },
                {
                    path: 'radio',
                    component: Radio,
                    meta: {
                        category: 'FormElements'
                    }
                },
                {
                    path: 'switch',
                    component: Switch,
                    meta: {
                        category: 'FormElements'
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
