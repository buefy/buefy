import { createApp } from 'vue'
import App from './App.vue'
import { createDocsRouter } from './router'
import Emitter from 'tiny-emitter'

import Buefy from '../../buefy-next/src/'
import Axios from 'axios'
// TODO: use vue3-progressbar?
// import VueProgressBar from 'vue-progressbar'
// TODO: use vue-gtag-next?
// import VueAnalytics from 'vue-analytics'
import Bluebird from 'bluebird'
import hljs from 'highlight.js'
import { createNewEvent } from '../../buefy-next/src/utils/helpers'

import ApiView from './components/ApiView.vue'
import CodeView from './components/CodeView.vue'
import VariablesView from './components/VariablesView.vue'
import Example from './components/Example.vue'

// global Vue instance should be replaced with `vueApp`
const vueApp = createApp({
    components: { App },
    mounted() {
        document.dispatchEvent(createNewEvent('render-event'))
    },
    template: '<App/>'
})

const router = createDocsRouter(vueApp)

vueApp.use(router)

vueApp.config.productionTip = false

// Webpack inserts `global` but Vite does not
// https://stackoverflow.com/a/73208485
window.global ||= window
global.Promise = Bluebird

vueApp.config.globalProperties.$http = Axios
vueApp.config.globalProperties.$eventHub = new Emitter()

vueApp.use(Buefy, {
    // defaultModalScroll: 'keep'
    // defaultIconPack: 'fa',
    // defaultSnackbarDuration: 999999,
    // defaultToastDuration: 999999
})

// TODO: use vue3-progressbar?
/*
vueApp.use(VueProgressBar, {
    color: '#7957d5',
    failedColor: '#ff3860',
    transition: {
        speed: '0.2s',
        opacity: '0.1s'
    }
}) */
// TODO: use vue-gtag-next?
/*
vueApp.use(VueAnalytics, {
    id: 'UA-75199408-3',
    router
}) */
vueApp.component('ApiView', ApiView)
vueApp.component('CodeView', CodeView)
vueApp.component('VariablesView', VariablesView)
// eslint-disable-next-line vue/multi-word-component-names
vueApp.component('Example', Example)

vueApp.directive('highlight', {
    beforeMount(el, binding) {
        // On first bind, highlight all targets
        const targets = el.querySelectorAll('code')
        for (const target of targets) {
            // if a value is directly assigned to the directive, use this
            // instead of the element content.
            if (binding.value) {
                target.innerHTML = binding.value
            }
            hljs.highlightElement(target)
        }
    },
    updated(el, binding) {
        // After an update, re-fill the content and then highlight
        const targets = el.querySelectorAll('code')
        for (const target of targets) {
            if (binding.value) {
                target.innerHTML = binding.value
                hljs.highlightElement(target)
            }
        }
    }
})

document.addEventListener('DOMContentLoaded', function () {
    vueApp.mount('#app')
})
