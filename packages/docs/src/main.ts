import { createApp } from 'vue'
import App from './App.vue'
import { createDocsRouter } from './router'
import { TinyEmitter } from 'tiny-emitter' // https://github.com/scottcorgan/tiny-emitter/issues/47#issuecomment-1551817340

import Buefy, { createNewEvent } from 'buefy'
import Axios from 'axios'
// TODO: use vue3-progressbar?
// import VueProgressBar from 'vue-progressbar'
// TODO: use vue-gtag-next?
// import VueAnalytics from 'vue-analytics'
import hljs from 'highlight.js'

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

// Webpack inserts `global` but Vite does not
// https://stackoverflow.com/a/73208485
window.global ||= window

vueApp.config.globalProperties.$http = Axios
vueApp.config.globalProperties.$eventHub = new TinyEmitter()

// allows access to `$http` and `$eventHub` in all components
declare module 'vue' {
    interface ComponentCustomProperties {
        $http: typeof Axios;
        $eventHub: TinyEmitter;
    }
}

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

function highlightCodeBlocks(el: HTMLElement, binding: { value?: string }) {
    const targets = el.querySelectorAll('code')
    for (const target of targets) {
        // if a value is directly assigned to the directive, use this
        // instead of the element content.
        if (binding.value) {
            target.innerHTML = binding.value
        } else {
            // Strip markup left by a previous highlight pass so reactive
            // updates to the element's text are highlighted from scratch
            // instead of being skipped.
            const plainText = target.textContent
            target.textContent = plainText
        }
        // hljs v11 refuses to re-highlight an element once it's marked
        // `data-highlighted`, so clear it before every pass.
        delete target.dataset.highlighted
        hljs.highlightElement(target)
    }
}

vueApp.directive('highlight', {
    beforeMount: highlightCodeBlocks,
    updated: highlightCodeBlocks
})

document.addEventListener('DOMContentLoaded', function () {
    vueApp.mount('#app')
})
