import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import Buefy from '../src'
Vue.use(Buefy, { defaultIconType: 'mdi' })

import hljs from 'highlight.js'
Vue.directive('highlight', {
    deep: true,
    bind: function (el, binding) {
        // on first bind, highlight all targets
        const targets = el.querySelectorAll('code')
        targets.forEach((target) => {
            // if a value is directly assigned to the directive, use this
            // instead of the element content.
            if (binding.value) {
                target.innerHTML = binding.value
            }
            hljs.highlightBlock(target)
        })
    },
    componentUpdated: function (el, binding) {
        // after an update, re-fill the content and then highlight
        const targets = el.querySelectorAll('code')
        targets.forEach((target) => {
            if (binding.value) {
                target.innerHTML = binding.value
                hljs.highlightBlock(target)
            }
        })
    }
})

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
