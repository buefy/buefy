import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = (r) => require(['../pages/Home'], r)

const Documentation = (r) => require(['../pages/documentation/Documentation'], r)
const Installation = (r) => require(['../pages/documentation/installation/Installation'], r)
const QuickStart = (r) => require(['../pages/documentation/installation/QuickStart'], r)
const Customization = (r) => require(['../pages/documentation/installation/Customization'], r)
const ConstructorOptions = (r) => require(['../pages/documentation/installation/ConstructorOptions'], r)

const Notices = (r) => require(['../pages/documentation/notices/Notices'], r)
const Snackbar = (r) => require(['../pages/documentation/notices/Snackbar'], r)
const Toast = (r) => require(['../pages/documentation/notices/Toast'], r)
const Notification = (r) => require(['../pages/documentation/notices/Notification'], r)
const Message = (r) => require(['../pages/documentation/notices/Message'], r)

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
                    path: 'notices',
                    component: Notices,
                    children: [
                        {
                            path: 'snackbar',
                            component: Snackbar
                        },
                        {
                            path: 'toast',
                            component: Toast
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
                            redirect: 'toast'
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
