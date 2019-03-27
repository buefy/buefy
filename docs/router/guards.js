import Vue from 'vue'

export const afterEachGlobal = (to, from) => {
    const title = `${to.meta.title} | Buefy`
    const url = `https://buefy.org${to.meta.path}`
    const description = to.meta.subtitle.replace(/<(.|\n)*?>/g, '')
    const updates = [
        { tag: 'meta[name="twitter:title"]', value: title },
        { tag: 'meta[property="og:title"]', value: title },
        { tag: 'meta[name="description"]', value: description },
        { tag: 'meta[property="og:description"]', value: description },
        { tag: 'meta[name="twitter:description"]', value: description },
        { tag: 'link[rel="canonical"]', attr: 'href', value: url },
        { tag: 'meta[property="og:url"]', value: url }
    ]

    window.document.documentElement.scrollTop = 0
    window.document.title = title

    updates.forEach((item) => {
        if (!item.value) return
        document.querySelector(item.tag)
            .setAttribute(item.attr || 'content', item.value)
    })

    Vue.prototype.$eventHub.$emit('navigate', to.meta)
}
