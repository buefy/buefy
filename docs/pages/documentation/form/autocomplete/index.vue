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
        <code-view :code="ExSimpleCode" bordered></code-view>

        <hr>
        <h2 class="title">Object array</h2>
        <div class="example">
            <ex-obj-array></ex-obj-array>
        </div>
        <code-view :code="ExObjArrayCode" bordered></code-view>

        <hr>
        <h2 class="title">Async with custom template</h2>
        <div class="content">
            <p>You can have a custom template by adding a scoped slot to it.</p>
            <p><small>API from <a href="https://www.themoviedb.org" target="_blank">TMDb</a></small>.</p>
        </div>
        <div class="example">
            <ex-custom-async></ex-custom-async>
        </div>
        <code-view :code="ExCustomAsyncCode" bordered></code-view>

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
