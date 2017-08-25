<template>
    <div class="container">
        <h1 class="title is-spaced">Autocomplete</h1>
        <h2 class="subtitle">
            Extended input that provide suggestions while the user types.
            Use with <strong><router-link to="/documentation/field">Field</router-link></strong> to access all functionalities
        </h2>
        <hr>

        <div class="example">
            <ex-simple></ex-simple>
        </div>
        <pre class="example-code" v-highlight><code class="html">{{ ExSimpleCode }}</code></pre>

        <hr>
        <h2 class="title">Object array</h2>
        <div class="example">
            <ex-obj-array></ex-obj-array>
        </div>
        <pre class="example-code" v-highlight><code class="html">{{ ExObjArrayCode }}</code></pre>

        <hr>
        <h2 class="title">Async with custom template</h2>
        <p class="block"><small>API from <a href="https://www.themoviedb.org" target="_blank">TMDb</a></small></p>
        <div class="example">
            <ex-custom-async></ex-custom-async>
        </div>
        <pre class="example-code" v-highlight><code class="html">{{ ExCustomAsyncCode }}</code></pre>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExObjArray from './examples/ExObjArray'
    import ExObjArrayCode from '!!raw-loader!./examples/ExObjArray'

    import ExCustomAsync from './examples/ExCustomAsync'
    import ExCustomAsyncCode from '!!raw-loader!./examples/ExCustomAsync'

    export default {
        components: {
            ExSimple,
            ExObjArray,
            ExCustomAsync
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExObjArrayCode,
                ExCustomAsyncCode
            }
        }
    }
</script>
