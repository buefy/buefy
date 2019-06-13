<template>
    <div>
        <p class="title">Icons</p>
        <p class="subtitle">Several components uses icons, you might want to add a pack</p>
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
            <strong><a href="https://vuejs.org" target="_blank">Vue.js</a> version 2.5+</strong>.
        </b-message>

        <div class="media">
            <div class="media-left">
                <p class="title">1</p>
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
                        Even though this is gonna import <strong>ALL</strong> components to your application,
                        Buefy full bundle is optimized and still pretty small:
                        <ul>
                            <li><strong>script</strong> is <strong>32KB</strong> min+gzip</li>
                            <li><strong>style</strong> is <strong>28KB</strong> min+gzip (with bulma included)</li>
                        </ul>
                    </div>
                </b-message>
                <CodeView title="Full bundle (recommended)" :code="importingBundle | pre" lang="javascript" expanded/>

                <b-message type="is-danger">
                    <div class="content">
                        <p>
                            If you only need a couple of Buefy's components, might be a good idea to include individuals.
                        </p>
                        <p>
                            Bear in mind that every individual component has everything they need to work by themselves —
                            including <strong>too many</strong> components individually will <strong>INCREASE</strong>
                            your project's build size, adding the full bundle is recomended in that case.
                        </p>
                        <p>
                            In general, <strong>don't go over 3 components</strong> here.
                            If you want more than that, add the full bundle.
                        </p>
                    </div>
                </b-message>

                <b-message type="is-info">
                    To include individual styles, see <router-link to="/documentation/customization">Customization</router-link> section.
                </b-message>
                <CodeView title="Individual components as Vue plugins" :code="importingComponentsAsVuePlugins | pre" lang="javascript" expanded/>
                <CodeView title="Individual components" :code="importingComponents | pre" lang="javascript" expanded/>
            </div>
        </div>

        <div class="media">
            <div class="media-left">
                <p class="title">2</p>
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
                <CodeView :code="importingCDNHtml | pre" expanded/>
            </div>
        </div>

        <hr>

        <div class="media">
            <div class="media-left">
                <p class="title">3</p>
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
                <CodeView :code="importingNuxtBuefy | pre" lang="javascript" expanded/>
            </div>
        </div>
    </div>
</template>

<script>
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
                import Table from 'buefy/dist/components/table'
                import Input from 'buefy/dist/components/input'
                import 'buefy/dist/buefy.css'

                Vue.use(Table)
                Vue.use(Input)
                `,
                importingComponents: `
                import Vue from 'vue'
                import { Table } from 'buefy/dist/components/table'
                import { Input } from 'buefy/dist/components/input'
                import 'buefy/dist/buefy.css'

                Vue.component('b-table', Table)
                Vue.component('b-input', Input)
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

                    <script src="https://unpkg.com/vue"></\script>
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
                materialIcons: '<link rel="stylesheet" href="https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css">',
                fontAwesome5: '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">'
            }
        }
    }
</script>
