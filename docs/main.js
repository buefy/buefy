import Vue, { createApp } from 'vue'
import App from './App'
import router from './router'

import Buefy from '../src'
import Axios from 'axios'
import VueProgressBar from 'vue-progressbar'
import VueAnalytics from 'vue-analytics'
import Bluebird from 'bluebird'
import hljs from 'highlight.js'
import { createNewEvent } from '../src/utils/helpers'

import ApiView from './components/ApiView'
import CodeView from './components/CodeView'
import VariablesView from './components/VariablesView'
import Example from './components/Example'

// global Vue instance should be replaced with `vueApp`
const vueApp = createApp({
    router,
    components: { App },
    mounted() {
        document.dispatchEvent(createNewEvent('render-event'))
    },
    template: '<App/>'
})

vueApp.config.productionTip = false

global.Promise = Bluebird

vueApp.config.globalProperties.$http = Axios
vueApp.config.globalProperties.$eventHub = createApp()

vueApp.use(Buefy, {
    // defaultModalScroll: 'keep'
    // defaultIconPack: 'fa',
    // defaultSnackbarDuration: 999999,
    // defaultToastDuration: 999999
})

vueApp.use(VueProgressBar, {
    color: '#7957d5',
    failedColor: '#ff3860',
    transition: {
        speed: '0.2s',
        opacity: '0.1s'
    }
})
vueApp.use(VueAnalytics, {
    id: 'UA-75199408-3',
    router
})
vueApp.component('ApiView', ApiView)
vueApp.component('CodeView', CodeView)
vueApp.component('VariablesView', VariablesView)
vueApp.component('Example', Example)

vueApp.directive('highlight', {
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

// TODO: Vue.filter is no longer supported!
// should be implemented as a function.
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

document.addEventListener('DOMContentLoaded', function () {
    vueApp.$mount('#app')
})
