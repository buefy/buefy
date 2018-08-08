import Vue from 'vue'

export const afterEachGlobal = (to, from) => {
    window.document.documentElement.scrollTop = 0
    window.document.title = `${to.meta.title} | Buefy`
    Vue.prototype.$eventHub.$emit('navigate', to.meta)
}
