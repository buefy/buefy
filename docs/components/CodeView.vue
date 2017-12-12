<template>
    <div class="codeview">
        <figure class="highlight" :class="figureClasses">
            <div class="button-container">
                <button class="button is-text is-small copy-code">Copy</button>
                <form
                    v-if="codepen"
                    method="POST"
                    action="https://codepen.io/pen/define/"
                    target="_blank">
                    <button class="button is-text is-small">
                        CodePen
                        <b-icon icon="open-in-new" size="is-small"/>
                    </button>

                    <input type="hidden" name="data" :value="codepenApi">
                </form>
            </div>
            <pre v-highlight><code :class="lang">{{ code }}</code></pre>
            <button
                v-if="!isExpanded && !expanded"
                class="codeview-showcode"
                @click="isExpanded = true">
                <b-icon icon="code-tags" size="is-small" custom-class="mdi-18px"/>
                <span>Show code</span>
            </button>
        </figure>
    </div>
</template>

<script>
    export default {
        props: {
            lang: {
                type: String,
                default: 'html'
            },
            bordered: Boolean,
            code: String,
            expanded: Boolean,
            codepen: Boolean
        },
        data() {
            return {
                isExpanded: false,
                externalScripts: [
                    'https://unpkg.com/vue/dist/vue.min.js',
                    'https://unpkg.com/buefy'
                ],
                externalStyles: [
                    'https://unpkg.com/buefy/lib/buefy.min.css',
                    'https://cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css'
                ]
            }
        },
        computed: {
            figureClasses() {
                return {
                    'is-collapsed': !this.bordered && !this.expanded,
                    'is-expanded': this.isExpanded || this.expanded
                }
            },
            codepenApi() {
                return JSON.stringify({
                    title: window.document.title + ' example',
                    tags: ['buefy', 'vue', 'bulma'],
                    editors: 101,
                    layout: 'right',
                    html: this.html,
                    js: this.script,
                    html_classes: 'section',
                    head: "<meta name='viewport' content='width=device-width, initial-scale=1'>",
                    css_external: this.externalStyles.join(';'),
                    js_external: this.externalScripts.join(';')
                })
                    .replace(/"/g, "&​quot;")
                    .replace(/'/g, "&apos;")
            },
            html() {
                const initial = this.code.split('<template>')
                if (!initial[1]) return

                let html = initial[1].split('</template>')[0]
                html = html.replace(/src="static/g, 'src="https://buefy.github.io/static')

                return this.$options.filters.pre(`
                    <div id="app" class="container">
                        ${html}
                    </div>
                `)
            },
            script() {
                const initial = this.code.split('<script>')
                let js = ''
                if (initial[1]) {
                    js = initial[1].split('<\/script>')[0]
                    js = js.replace('export default ', 'const example = ')
                }

                return this.$options.filters.pre(`
                    Vue.use(Buefy.default)

                    ${js}

                    const app = new Vue(${js ? 'example' : ''})

                    app.$mount('#app')
                `)
            }
        }
    }
</script>
