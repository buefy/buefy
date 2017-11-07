<template>
    <div class="container">
        <h1 class="title is-spaced">Start</h1>
        <h2 class="subtitle"><b>Two ways</b> to install and use Buefy</h2>

        <hr>

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
                <CodeView code="npm install buefy" lang="bash" />
            </div>
        </div>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">2</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Use unpkg <b>CDN</b> (or download):</h3>
                <div class="content">
                    <p>JavaScript: <a href="https://unpkg.com/buefy" target="_blank">https://unpkg.com/buefy</a></p>
                    <p>CSS: <a href="https://unpkg.com/buefy/lib/buefy.min.css" target="_blank">https://unpkg.com/buefy/lib/buefy.min.css</a></p>
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
                <CodeView :code="importing | pre" lang="javascript" />

                <b-message type="is-warning">
                    If you're using <strong>Nuxt.js</strong> for Server Side Rendering (SSR), then follow these steps:
                </b-message>
                <div class="content">
                    <ol>
                        <li>Create a new file in Nuxt's <strong>plugins</strong> folder called <code>buefy.js</code></li>
                        <li>
                            Paste and save it:
                            <CodeView :code="importingSSR | pre" lang="javascript" />
                        </li>
                        <li>In the <strong>nuxt.config.js</strong> file, add <code>plugins: ['~plugins/buefy']</code> to the <code>module.exports</code> object</li>
                    </ol>
                </div>
            </div>
        </div>

        <hr>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">2</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">CDN / Standalone:</h3>
                <CodeView :code="importingCDNHtml | pre" />
                <CodeView :code="importingCDNJs | pre" lang="javascript" />
            </div>
        </div>

        <hr>

        <h3 class="title">Include Material Design Icons</h3>
        <b-message type="is-info">
            By default Buefy uses <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a>,
            if you want to swap to <a href="http://fontawesome.io/" target="_blank">FontAwesome</a>, go to
            <router-link to="/documentation/constructor-options">constructor options</router-link>.
        </b-message>
        <CodeView :code="materialIcons" />

        <hr>

        <h3 class="title">JSFiddle examples</h3>
        <iframe width="100%" height="400" src="//jsfiddle.net/rafaelpimpa/0afsyg9v/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

        <hr>

        <iframe width="100%" height="400" src="//jsfiddle.net/rafaelpimpa/du2oxe1r/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                importing: `
                import Vue from 'vue'
                import Buefy from 'buefy'
                import 'buefy/lib/buefy.css'

                Vue.use(Buefy)

                // OR

                Vue.component(Buefy.Checkbox.name, Buefy.Checkbox)
                Vue.component(Buefy.Table.name, Buefy.Table)
                Vue.component(Buefy.Switch.name, Buefy.Switch)`,
                importingSSR: `
                import Vue from 'vue'
                import Buefy from 'buefy'
                import 'buefy/lib/buefy.css'

                Vue.use(Buefy) `,
                importingCDNHtml: `
                <!-- Buefy CSS -->
                <link rel="stylesheet" href="https://unpkg.com/buefy/lib/buefy.min.css">

                <!-- Buefy JavaScript -->
                <script src="https://unpkg.com/buefy"><\/script>`,
                importingCDNJs: `
                // Global variable
                Vue.use(Buefy.default)`,
                materialIcons: '<link rel="stylesheet" href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css">'
            }
        }
    }
</script>
