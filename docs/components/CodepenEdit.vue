<template>
    <form
        v-if="hasHtml"
        method="POST"
        action="https://codepen.io/pen/define/"
        target="_blank"
        rel="noopener">
        <button class="button is-text is-small">
            <span>CodePen</span>
            <b-icon icon="open-in-new" size="is-small"/>
        </button>

        <input
            type="hidden"
            name="data"
            :value="data">
    </form>
</template>

<script>
    import dataTest from '!!raw-loader!@/data/sample.json'

    export default {
        props: {
            code: String,
            title: String
        },
        data() {
            return {
                hasHtml: false,
                externalScripts: [
                    'https://unpkg.com/vue/dist/vue.min.js',
                    'https://unpkg.com/buefy/dist/buefy.min.js'
                ],
                externalStyles: [
                    'https://unpkg.com/buefy/dist/buefy.min.css',
                    'https://cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css'
                ]
            }
        },
        computed: {
            data() {
                return JSON.stringify({
                    title: `${this.$route.meta.title} ${this.title ? this.title.toLowerCase() : ''} - Buefy example`,
                    tags: ['buefy', 'vue', 'bulma'],
                    editors: this.style ? 111 : 101,
                    layout: 'right',
                    html: this.getHtml(),
                    js: this.getScript(),
                    js_pre_processor: 'babel',
                    css: this.getStyle(),
                    css_pre_processor: 'scss',
                    html_classes: 'section',
                    head: "<meta name='viewport' content='width=device-width, initial-scale=1'>",
                    css_external: this.externalStyles.join(';'),
                    js_external: this.externalScripts.join(';')
                })
                    .replace(/"/g, '\u0022')
                    .replace(/'/g, '\u0027')
            }
        },
        methods: {
            getHtml() {
                const start = this.code.indexOf('<template>')
                const end = this.code.lastIndexOf('</template>')
                if (start < 0 || end < 0) return

                let html = this.code.substring(start + 10, end)
                html = html.replace(/src="\/static/g, 'src="https://buefy.org/static')

                // FontAwesome
                if (
                    this.code.indexOf('pack="fa"') ||
                    this.code.indexOf('pack="fas"') ||
                    this.code.indexOf('pack="far"') ||
                    this.code.indexOf('pack="fad"')
                ) {
                    this.externalStyles.push('https://use.fontawesome.com/releases/v5.0.6/css/all.css')
                }

                return this.$options.filters.pre(`
                    <div id="app" class="container">
                        ${html}
                    </div>
                `)
            },
            getScript() {
                const start = this.code.indexOf('<script>')
                const end = this.code.lastIndexOf('<\/script>') // eslint-disable-line
                let js

                if (start >= 0 && end >= 0) {
                    js = this.code.substring(start + 8, end)
                    js = js.replace('export default ', 'const example = ')

                    js = js.replace('require(\'@/data/sample.json\')', dataTest)

                    // Vue
                    if (this.code.indexOf('vue')) {
                        js = js.replace('import Vue from \'vue\'', '')
                    }

                    // Axios
                    if (this.code.indexOf('this.$http')) {
                        js = js.replace(/this\.\$http/g, 'axios')
                        this.externalScripts.push('https://unpkg.com/axios/dist/axios.min.js')
                    }

                    // Debounce
                    if (this.code.indexOf('debounce')) {
                        js = js.replace('import debounce from \'lodash/debounce\'', '')
                        js = js.replace(/debounce/g, '_.debounce')
                        this.externalScripts.push('https://cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min.js')
                    }

                    // Cleave
                    if (this.code.indexOf('cleave.js')) {
                        js = js.replace('import Cleave from \'cleave.js\'', '')
                        this.externalScripts.push('https://unpkg.com/cleave.js/dist/cleave.min.js')
                    }

                    // Sortable
                    if (this.code.indexOf('sortablejs')) {
                        js = js.replace('import Sortable from \'sortablejs\'', '')
                        this.externalScripts.push('https://cdn.jsdelivr.net/npm/sortablejs@1.6.1/Sortable.min.js')
                    }

                    // VeeValidate
                    if (this.code.indexOf('vee-validate')) {
                        js = js.replace('import VeeValidate from \'vee-validate\'', '')
                        this.externalScripts.push('https://cdn.jsdelivr.net/npm/vee-validate@2.1.0-beta.9/dist/vee-validate.min.js')
                    }
                }

                return this.$options.filters.pre(`

                    ${js || ''}

                    const app = new Vue(${js ? 'example' : ''})

                    app.$mount('#app')
                `)
            },
            getStyle() {
                const match = this.code.match(/<style.*>/)

                const start = match ? this.code.indexOf(match[0]) : -1
                const end = this.code.lastIndexOf('</style>')
                if (start < 0 || end < 0) return

                return this.code.substring(start + match[0].length, end)
            },
            hasContent(startTag, endTag) {
                const start = this.code.indexOf(startTag)
                const end = this.code.lastIndexOf(endTag)
                return !(start < 0 || end < 0)
            }
        },
        mounted() {
            this.hasHtml = this.hasContent('<template>', '</template>')
        }
    }
</script>
