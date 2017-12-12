<template>
    <div class="is-clipped">
        <h1 class="title is-spaced">Autocomplete</h1>
        <h2 class="subtitle">
            Extended input that provide suggestions while the user types.
            Use with <strong><router-link to="/documentation/field">Field</router-link></strong> to access all functionalities
        </h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <hr>
        <h2 class="title">Object array</h2>
        <Example :component="ExObjArray" :code="ExObjArrayCode"/>

        <hr>
        <h2 class="title">Async with custom template</h2>
        <div class="content">
            <p>You can have a custom template by adding a scoped slot to it.</p>
            <p><small>API from <a href="https://www.themoviedb.org" target="_blank">TMDb</a></small>.</p>
        </div>
        <Example :component="ExCustomAsync" :code="ExCustomAsyncCode"/>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/autocomplete'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExObjArray from './examples/ExObjArray'
    import ExObjArrayCode from '!!raw-loader!./examples/ExObjArray'

    import ExCustomAsync from './examples/ExCustomAsync'
    import ExCustomAsyncCode from '!!raw-loader!./examples/ExCustomAsync'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode,
                ExObjArrayCode,
                ExObjArray,
                ExCustomAsyncCode,
                ExCustomAsync
            }
        }
    }
</script>
