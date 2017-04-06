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
                    path: 'icon',
                    component: Icon
                },
                {
                    path: 'tooltip',
                    component: Tooltip
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
                    path: 'table',
                    component: Table
                },
                {
                    path: 'pagination',
                    component: Pagination
                },
                {
                    path: '',
                    redirect: 'quick-start'
                }
            ]
        }
    ]
})
