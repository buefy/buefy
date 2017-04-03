import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    linkActiveClass: 'is-active',
    // scrollBehavior(to, from, savedPosition) {
    //     console.log(to, from)
    //     return { y: 50 }
    //     // return desired position
    //     //{ y: 0 }
    // },
    routes: [
        {
            path: '/',
            component: require('../pages/Home')
        },
        {
            path: '/documentation',
            component: require('../pages/documentation/Documentation'),
            children: [
                {
                    path: 'installation',
                    component: require('../pages/documentation/installation/Installation'),
                    children: [
                        {
                            path: 'quick-start',
                            component: require('../pages/documentation/installation/QuickStart')
                        },
                        {
                            path: 'customization',
                            component: require('../pages/documentation/installation/Customization')
                        },
                        {
                            path: '',
                            redirect: 'quick-start'
                        }
                    ]
                },
                {
                    path: 'notices',
                    component: require('../pages/documentation/notices/Notices'),
                    children: [
                        {
                            path: 'snackbar',
                            component: require('../pages/documentation/notices/Snackbar')
                        },
                        {
                            path: 'toast',
                            component: require('../pages/documentation/notices/Toast')
                        },
                        {
                            path: 'notification',
                            component: require('../pages/documentation/notices/Notification')
                        },
                        {
                            path: 'message',
                            component: require('../pages/documentation/notices/Message')
                        },
                        {
                            path: '',
                            redirect: 'snackbar'
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
