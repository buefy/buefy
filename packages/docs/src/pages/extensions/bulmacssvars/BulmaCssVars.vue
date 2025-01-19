<template>
    <div>
        <div class="buttons">
            <a
                class="button"
                href="https://github.com/wtho/bulma-css-vars"
                target="_blank">
                Docs
            </a>
        </div>

        <Example :component="ExFormat" :code="ExFormatCode" vertical>
            <b-message type="is-info">
                <p><strong>Bulma-Css-Vars is not included in Buefy</strong>, you have to install it.</p>
                <p>Also make sure you use Bulma <code>v0.8</code> or higher and <code>sass</code> instead of <code>node-sass</code>:</p>
                <CodeView :code="preformat(npmInstallSnippet)" expanded/>
                <p>This creates an initial config file <code>bulma-css-vars.config.js</code>, where you can declare the variables you want to modify. Each additional variable will increase the size of your css.</p>
                <p>Finally, you have to reference the <code>main.scss</code> file in your compilation, preferably in your entry Vue component:</p>
                <CodeView :code="vueCompSnippet" expanded/>
                <p>You have to run bulma-css-vars every time you change the config. Add this script to your <code>package.json</code> to simplify this:</p>
                <CodeView :code="scriptSnippet" expanded/>
                <p>Read more in the bulma-css-vars documentation.</p>
            </b-message>
        </Example>
    </div>
</template>

<script lang="ts">
    import { defineComponent, shallowRef } from 'vue'

    import { BMessage } from '@ntohq/buefy-next'

    import CodeView from '@/components/CodeView.vue'
    import Example from '@/components/Example.vue'
    import { preformat } from '@/utils'
    import ExFormat from './examples/ExFormat.vue'
    import ExFormatCode from './examples/ExFormat.vue?raw'

    export default defineComponent({
        components: {
            BMessage,
            CodeView,
            Example
        },
        data() {
            return {
                npmInstallSnippet: `npm install -S bulma-css-vars
npm install -D sass
node ./node_modules/.bin/bulma-css-vars --init`,
                vueCompSnippet: `import './main.scss'`,
                scriptSnippet: `"scripts": {
  "bulma-css-vars": "bulma-css-vars"
}`,
                ExFormat: shallowRef(ExFormat),
                ExFormatCode
            }
        },
        methods: {
            preformat
        }
    })
</script>
