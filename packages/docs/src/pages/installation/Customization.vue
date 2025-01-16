<template>
    <div>
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">1</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Install Buefy via npm</h3>
                <CodeView code="npm install buefy" lang="bash" expanded/>
                <p class="content">Or clone the repository: <a href="https://github.com/buefy/buefy" target="_blank">https://github.com/buefy/buefy</a></p>
            </div>
        </div>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">2</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Set your variables with Sass</h3>
                <b-message type="is-info">
                    <div class="content">
                        <p><b>Tip:</b> You can see <a href="http://bulma.io/documentation/overview/variables/" target="_blank">all of Bulma's variables</a>.</p>
                        <p>There are also two other variables created by Buefy:</p>
                        <ol>
                            <li><code>$speed-slow: 150ms !default</code></li>
                            <li><code>$speed-slower: 250ms !default</code></li>
                        </ol>
                    </div>
                </b-message>
                <div class="example is-paddingless">
                    <CodeView :code="preformat(sass)" lang="sass" expanded/>
                </div>

            </div>
        </div>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">3</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Import and use Buefy</h3>
                <b-message type="is-warning">
                    Please note that <code class="javascript">import 'buefy/dist/buefy.css'</code> from the <router-link to="/documentation/start">start section</router-link> has been omitted because it is not required when using scss.
                </b-message>
                <CodeView :code="preformat(importing)" lang="javascript" expanded/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import { BMessage } from '@ntohq/buefy-next'

    import CodeView from '@/components/CodeView.vue'
    import { preformat } from '@/utils'

    import {
        importing,
        sass
    } from './usage/customization'

    export default defineComponent({
        components: {
            BMessage,
            CodeView
        },
        data() {
            return {
                sass,
                importing
            }
        },
        methods: { preformat }
    })
</script>
