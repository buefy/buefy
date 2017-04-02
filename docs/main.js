import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import Buefy from '../src'

Vue.use(Buefy, { defaultIconType: 'mdi' })

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
