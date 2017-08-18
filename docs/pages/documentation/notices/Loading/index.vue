<template>
    <div class="container">
        <h1 class="title is-spaced">Loading</h1>
        <h2 class="subtitle">A simple loading overlay</h2>
        <hr>

        <div class="example">
            <ex-simple></ex-simple>
        </div>
        <pre class="example-code" v-highlight><code class="html">{{ ExSimpleCode }}</code></pre>

        <hr>

        <h2 class="title is-spaced">Programmatically opening Loading Overlay</h2>

        <div class="example">
            <ex-programmatically></ex-programmatically>
        </div>
        <pre class="example-code" v-highlight><code class="html">{{ ExProgrammaticallyCode }}</code></pre>

        <hr>
        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExProgrammatically from './examples/ExProgrammatically'
    import ExProgrammaticallyCode from '!!raw-loader!./examples/ExProgrammatically'

    export default {
        components: {
            ExSimple,
            ExProgrammatically
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExProgrammaticallyCode
            }
        }
    }
</script>
