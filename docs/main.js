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

Vue.use(Buefy, {
    // defaultSnackbarDuration: 999999,
    // defaultToastDuration: 999999
})

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

Vue.filter('slugify', (value) => {
    return value.toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e') // Fix letter E
        .replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a') // Fix letter A
        .replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o') // Fix letter O
        .replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u') // Fix letter U
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-') // Replace multiple - with single -
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
