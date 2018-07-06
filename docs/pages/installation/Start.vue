<template>
    <div>
        <h3 class="title">Install</h3>
        <b-message type="is-warning">
            You need <a href="https://vuejs.org" target="_blank">Vue.js</a> <b>version 2.5+</b>.
        </b-message>
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">1</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Use <b>NPM</b> <em>(recommended)</em>:</h3>
                <CodeView code="npm install buefy" lang="bash" expanded/>
            </div>
        </div>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">2</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Use unpkg <b>CDN</b> (or download):</h3>
                <div class="content">
                    <p>JavaScript: <a href="https://unpkg.com/buefy/dist/buefy.min.js" target="_blank">https://unpkg.com/buefy/dist/buefy.min.js</a></p>
                    <p>CSS: <a href="https://unpkg.com/buefy/dist/buefy.min.css" target="_blank">https://unpkg.com/buefy/dist/buefy.min.css</a></p>
                </div>
            </div>
        </div>

        <hr>

        <h3 class="title">Usage</h3>
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">1</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">NPM / Webpack:</h3>
                <b-message type="is-info">
                    If you want to use your own theme / variables go to
                    <router-link to="/documentation/customization">customization section</router-link>.
                </b-message>
                <h5 class="subtitle is-5"> Bundle </h5>
                <CodeView :code="importingBundle | pre" lang="javascript" expanded/>
                <h5 class="subtitle is-5"> Individual Components </h5>
                <CodeView :code="importingComponents | pre" lang="javascript" expanded/>
            </div>
        </div>

        <hr>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">2</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">CDN / Standalone:</h3>
                <CodeView :code="importingCDNHtml | pre" expanded/>
            </div>
        </div>

        <hr>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">3</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Nuxt.js:</h3>
                <p>It's really very simple to start with nuxt. But we can make it even simpler by adding <a href="https://github.com/buefy/nuxt-buefy">nuxt-buefy</a>.</p>

                <div class="content">
                    <ol>
                        <li>
                            Install using <code>npm</code> or <code>yarn.</code> <br/>
                            <CodeView :code="installNuxtBuefy | pre" lang="javascript" expanded/>
                        </li>
                        <li>
                            Add <a href="https://github.com/buefy/nuxt-buefy">nuxt-buefy</a> to modules section of nuxt.config.js: <br />
                            <CodeView :code="importingNuxtBuefy | pre" lang="javascript" expanded/>
                        </li>
                    </ol>
                </div>
            </div>
        </div>

        <hr>

        <h3 class="title">Include Material Design Icons</h3>
        <b-message type="is-info">
            By default Buefy uses <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a>,
            if you want to swap to <a href="http://fontawesome.io/" target="_blank">FontAwesome 4</a>
            or <a href="https://fontawesome.com/" target="_blank">FontAwesome 5</a>, go to
            <router-link to="/documentation/constructor-options">constructor options</router-link>.
        </b-message>
        <b-message type="is-warning">
           Please note that Buefy doesn't include icon packs. You have to import it as you prefer (NPM, CDN, ...)
        </b-message>
        <CodeView :code="materialIcons" expanded/>
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
                importingComponents: `
                import Vue from 'vue'
                import { Field, Input } from 'buefy/dist/components'
                import 'buefy/dist/buefy.css'

                Vue.use(Field)
                Vue.use(Input)

                or

                import Vue from 'vue'
                import Field from 'buefy/dist/components/field'
                import Input from 'buefy/dist/components/input'
                import 'buefy/dist/buefy.css'

                Vue.use(Field)
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
                    <!-- Buefy components here -->
                    </div>

                    <script src="https://unpkg.com/vue"></\script>
                    <script src="https://unpkg.com/buefy/dist/buefy.min.js"></\script>
                    <script>
                        new Vue({
                            el: '#app'
                        })
                    </\script>
                </body>
                </html>`,
                materialIcons: '<link rel="stylesheet" href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css">'
            }
        }
    }
</script>
