import Vue from 'vue'

export const beforeEachGlobal = (to, from, next) => {
    window.document.documentElement.scrollTop = 0
    window.document.title = `${to.meta.title} | Buefy`
    Vue.prototype.$eventHub.$emit('close-menu')

    next()
}
