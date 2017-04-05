import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = (r) => require(['../pages/Home'], r)

const Documentation = (r) => require(['../pages/documentation/Documentation'], r)

const Installation = (r) => require(['../pages/documentation/installation/_Installation'], r)
const QuickStart = (r) => require(['../pages/documentation/installation/QuickStart'], r)
const Customization = (r) => require(['../pages/documentation/installation/Customization'], r)
const ConstructorOptions = (r) => require(['../pages/documentation/installation/ConstructorOptions'], r)

const General = (r) => require(['../pages/documentation/general/_General'], r)
const Icon = (r) => require(['../pages/documentation/general/Icon'], r)
const Tooltip = (r) => require(['../pages/documentation/general/Tooltip'], r)

const Notices = (r) => require(['../pages/documentation/notices/_Notices'], r)
const Dialog = (r) => require(['../pages/documentation/notices/Dialog'], r)
const Toast = (r) => require(['../pages/documentation/notices/Toast'], r)
const Snackbar = (r) => require(['../pages/documentation/notices/Snackbar'], r)
const Notification = (r) => require(['../pages/documentation/notices/Notification'], r)
const Message = (r) => require(['../pages/documentation/notices/Message'], r)

const Data = (r) => require(['../pages/documentation/data/_Data'], r)
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
                    path: 'installation',
                    component: Installation,
                    children: [
                        {
                            path: 'quick-start',
                            component: QuickStart
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
                            path: '',
                            redirect: 'quick-start'
                        }
                    ]
                },
                {
                    path: 'general',
                    component: General,
                    children: [
                        {
                            path: 'icon',
                            component: Icon
                        },
                        {
                            path: 'tooltip',
                            component: Tooltip
                        },
                        {
                            path: '',
                            redirect: 'icon'
                        }
                    ]
                },
                {
                    path: 'notices',
                    component: Notices,
                    children: [
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
                            path: '',
                            redirect: 'dialog'
                        }
                    ]
                },
                {
                    path: 'data',
                    component: Data,
                    children: [
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
                            redirect: 'table'
                        }
                    ]
                },
                {
                    path: '',
                    redirect: 'installation'
                }
            ]
        }
    ]
})
