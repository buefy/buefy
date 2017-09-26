import Vue from 'vue'
import App from './App'
import router from './router'

import Buefy from '../src'
import Axios from 'axios'
import VueProgressBar from 'vue-progressbar'
import VueAnalytics from 'vue-analytics'
import Bluebird from 'bluebird'
import hljs from 'highlight.js'

import ApiView from './components/ApiView'
import CodeView from './components/CodeView'

Vue.config.productionTip = false

global.Promise = Bluebird

Vue.prototype.$http = Axios

Vue.use(Buefy)
Vue.use(VueProgressBar, {
    color: '#7957d5',
    failedColor: '#ff3860',
    transition: {
        speed: '0.2s',
        opacity: '0.1s'
    }
})
Vue.use(VueAnalytics, {
    id: 'UA-75199408-3',
    router
})
Vue.component('ApiView', ApiView)
Vue.component('CodeView', CodeView)

Vue.directive('highlight', {
    deep: true,
    bind(el, binding) {
        // On first bind, highlight all targets
        const targets = el.querySelectorAll('code')
        for (const target of targets) {
            // if a value is directly assigned to the directive, use this
            // instead of the element content.
            if (binding.value) {
                target.innerHTML = binding.value
            }
            hljs.highlightBlock(target)
        }
    },
    componentUpdated(el, binding) {
        // After an update, re-fill the content and then highlight
        const targets = el.querySelectorAll('code')
        for (const target of targets) {
            if (binding.value) {
                target.innerHTML = binding.value
                hljs.highlightBlock(target)
            }
        }
    }
})

Vue.filter('pre', (text) => {
    if (!text) return

    // Remove first blank line
    text = text.replace(/^\s*[\r\n]/g, '')

    // Find how many whitespaces before the first character of the first line
    const whitespaces = /^[ \t]*./.exec(text).toString().slice(0, -1)

    // Replace first occurrance of whitespace on each line
    let newText = []
    text.split(/\r\n|\r|\n/).forEach((line) => {
        newText.push(line.replace(whitespaces, ''))
    })
    newText = newText.join('\r\n')

    return newText
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
