<template>
    <div class="container">
        <h1 class="title is-spaced">Autocomplete</h1>
        <h2 class="subtitle">
            Extended input that provide suggestions while the user types.
            Use with <strong><router-link to="/documentation/field">Field</router-link></strong> to access all functionalities
        </h2>
        <hr>

        <div class="example">
            <ex-simple/>
        </div>
        <CodeView :code="ExSimpleCode" bordered />

        <hr>
        <h2 class="title">Object array</h2>
        <div class="example">
            <ex-obj-array/>
        </div>
        <CodeView :code="ExObjArrayCode" bordered />

        <hr>
        <h2 class="title">Async with custom template</h2>
        <div class="content">
            <p>You can have a custom template by adding a scoped slot to it.</p>
            <p><small>API from <a href="https://www.themoviedb.org" target="_blank">TMDb</a></small>.</p>
        </div>
        <div class="example">
            <ex-custom-async/>
        </div>
        <CodeView :code="ExCustomAsyncCode" bordered />

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiAutocomplete'

    import ExSimple from '@/examples/autocomplete/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/autocomplete/ExSimple'

    import ExObjArray from '@/examples/autocomplete/ExObjArray'
    import ExObjArrayCode from '!!raw-loader!@/examples/autocomplete/ExObjArray'

    import ExCustomAsync from '@/examples/autocomplete/ExCustomAsync'
    import ExCustomAsyncCode from '!!raw-loader!@/examples/autocomplete/ExCustomAsync'

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
