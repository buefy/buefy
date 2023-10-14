<template>
    <div>
        <p :id="slugifyTitle('Icons')" class="title">
            <router-link :to="`#${slugifyTitle('Icons')}`">#</router-link>
            Icons
        </p>
        <p class="subtitle">Several components use icons, you might want to add a pack</p>
        <CodeView title="Material Design Icons CDN" :code="materialIcons" expanded/>
        <CodeView title="Font Awesome 5 CDN" :code="fontAwesome5" expanded/>
        <div class="content">
            <blockquote>
                <p>Refer to its documentation for latest release / CDN.</p>
                <p>Please note that Buefy doesn't include icon packs. You have to import it as you prefer (NPM, CDN, etc.).</p>
                <p>
                    If you opted for Font Awesome, you should update your
                    <router-link to="/documentation/constructor-options">constructor options</router-link>.
                </p>
            </blockquote>
        </div>

        <hr>

        <b-message type="is-warning" size="is-medium">
            For any installation and usage method, you need
            <strong><a href="https://vuejs.org" target="_blank">Vue.js</a> version 2.6+</strong>.
            <strong><a href="https://github.com/buefy/buefy/issues/2505" target="_blank">Vue.js version 3+ is not supported at this time.</a></strong>
        </b-message>

        <div class="media">
            <div class="media-left">
                <p :id="slugifyTitle('NPM or Yarn')" class="title">
                    <router-link :to="`#${slugifyTitle('NPM or Yarn')}`">#</router-link>
                    1
                </p>
            </div>
            <div class="media-content">
                <p class="title">NPM or Yarn <em>(recommended)</em></p>
                <p class="subtitle is-spaced">After creating a project with vue-cli or custom-made (usually Webpack)</p>
                <p class="title is-4">Installation</p>
                <CodeView code="npm install buefy" lang="bash" expanded/>

                <hr>

                <div class="title is-4">Usage</div>
                <b-message type="is-success">
                    <div class="content">
                        Even though this is going to import <strong>ALL</strong> components to your application,
                        Buefy full bundle is optimized and still pretty small:
                        <ul>
                            <li><strong>script</strong> is <strong>48KB</strong> min+gzip</li>
                            <li><strong>style</strong> is <strong>39KB</strong> min+gzip (with bulma included)</li>
                        </ul>
                    </div>
                </b-message>
                <CodeView title="Full bundle" :code="preformat(importingBundle)" lang="javascript" expanded/>
                <CodeView title="Individual components as Vue plugins" :code="preformat(importingComponentsAsVuePlugins)" lang="javascript" expanded/>
                <b-message type="is-info">
                    To include individual styles, see <router-link to="/documentation/customization">Customization</router-link> section.
                </b-message>
            </div>
        </div>

        <div class="media">
            <div class="media-left">
                <p :id="slugifyTitle('Standalone')" class="title">
                    <router-link :to="`#${slugifyTitle('Standalone')}`">#</router-link>
                    2
                </p>
            </div>
            <div class="media-content">
                <p class="title">Standalone</p>
                <p class="subtitle is-spaced">Using CDN or downloading files to serve local</p>
                <p class="title is-4">Installation</p>
                <div class="content">
                    <p>Just download or use these as CDN:</p>
                    <ul>
                        <li>Script: <a href="https://unpkg.com/buefy/dist/buefy.min.js" target="_blank">https://unpkg.com/buefy/dist/buefy.min.js</a></li>
                        <li>Style: <a href="https://unpkg.com/buefy/dist/buefy.min.css" target="_blank">https://unpkg.com/buefy/dist/buefy.min.css</a></li>
                    </ul>
                </div>

                <hr>

                <p class="title is-4">Usage example</p>
                <CodeView :code="preformat(importingCDNHtml)" expanded/>
            </div>
        </div>

        <hr>

        <div class="media">
            <div class="media-left">
                <p :id="slugifyTitle('Nuxt.js')" class="title">
                    <router-link :to="`#${slugifyTitle('Nuxt.js')}`">#</router-link>
                    3
                </p>
            </div>
            <div class="media-content">
                <p class="title">Nuxt.js</p>
                <p class="subtitle is-spaced">Using a Nuxt.js module to keep things easier</p>
                <p class="title is-4">Installation</p>
                <CodeView code="npm install nuxt-buefy" lang="bash" expanded/>

                <p class="title is-4">Usage</p>
                <p class="content">
                    Add <a href="https://github.com/buefy/nuxt-buefy">nuxt-buefy</a> to modules section of <code>nuxt.config.js</code>:
                </p>
                <CodeView :code="preformat(importingNuxtBuefy)" lang="javascript" expanded/>
            </div>
        </div>
    </div>
</template>

<script>
    import { preformat } from '@/utils'

    export default {
        data() {
            return {
                importingBundle: `
                import Vue from 'vue'
                import Buefy from 'buefy'
                import 'buefy/dist/buefy.css'

                Vue.use(Buefy)
                `,
                importingComponentsAsVuePlugins: `
                import Vue from 'vue'
                import { Table, Input } from 'buefy'
                import 'buefy/dist/buefy.css'

                Vue.use(Table)
                Vue.use(Input)
                `,
                importingSSR: `
                import Vue from 'vue'
                import Buefy from 'buefy'
                import 'buefy/dist/buefy.css'

                Vue.use(Buefy) `,
                installNuxtBuefy: `
                // with npm
                npm install nuxt-buefy

                // with yarn
                yarn add nuxt-buefy
                `,
                importingNuxtBuefy: `
                {
                    modules: [
                        // Simple usage
                        'nuxt-buefy',

                        // Or you can customize
                        ['nuxt-buefy', { css: false, materialDesignIcons: false }],
                    ]
                }`,
                importingCDNHtml: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link rel="stylesheet" href="https://unpkg.com/buefy/dist/buefy.min.css">
                </head>

                <body>
                    <div id="app">
                        <!-- Buefy components goes here -->
                    </div>

                    <script src="https://unpkg.com/vue@2"></\script>
                    <!-- Full bundle -->
                    <script src="https://unpkg.com/buefy/dist/buefy.min.js"></\script>

                    <!-- Individual components -->
                    <script src="https://unpkg.com/buefy/dist/components/table"></\script>
                    <script src="https://unpkg.com/buefy/dist/components/input"></\script>

                    <script>
                        new Vue({
                            el: '#app'
                        })
                    </\script>
                </body>
                </html>`,
                materialIcons: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css">',
                fontAwesome5: '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">'
            }
        },
        methods: {
            preformat,
            slugifyTitle(title) {
                if (!title) return ''
                return title.toLowerCase()
                    .replace(/\s+/g, '-') // Replace spaces with -
                    .replace(/[^\w-]+/g, '') // Remove all non-word chars
                    .replace(/--+/g, '-') // Replace multiple - with single -
                    .replace(/^-+/, '') // Trim - from start of text
                    .replace(/-+$/, '') // Trim - from end of text
            }
        }
    }
</script>
