<template>
    <div class="container">
        <h1 class="title is-spaced">Panel</h1>
        <h2 class="subtitle">A simple and collapsible panel</h2>
        <hr>

        <div class="example">
            <ex-simple></ex-simple>
        </div>
        <pre class="example-code" v-highlight><code class="html">{{ ExSimpleCode }}</code></pre>

        <hr>

        <div class="example">
            <ex-custom-template></ex-custom-template>
        </div>
        <pre class="example-code" v-highlight><code class="html">{{ ExCustomTemplateCode }}</code></pre>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExCustomTemplate from './examples/ExCustomTemplate'
    import ExCustomTemplateCode from '!!raw-loader!./examples/ExCustomTemplate'

    export default {
        components: {
            ExSimple,
            ExCustomTemplate
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExCustomTemplateCode
            }
        }
    }
</script>
