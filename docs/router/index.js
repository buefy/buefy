import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    linkActiveClass: 'is-active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: require('../pages/Home')
        },
        {
            path: '/table',
            name: 'Table',
            component: require('../pages/Table')
        }
    ]
})
