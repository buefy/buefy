<template>
    <div class="default-container">
        <h1 class="title is-spaced">Autocomplete</h1>
        <h2 class="subtitle">
            Extended input that provide suggestions while the user types.
            Use with <strong><router-link to="/documentation/field">Field</router-link></strong> to access all functionalities
        </h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <Example :component="ExObjArray" :code="ExObjArrayCode" title="Object array"/>

        <Example :component="ExHeader" :code="ExHeaderCode" title="Header">
            <div class="tags has-addons">
                <span class="tag is-success">New!</span>
                <span class="tag is-info">0.6.6</span>
            </div>
            <p>You can add your custom header to the autocomplete.</p>
        </Example>

        <Example :component="ExCustomAsync" :code="ExCustomAsyncCode" title="Async with custom template">
            <p>You can have a custom template by adding a scoped slot to it.</p>
            <p><small>API from <a href="https://www.themoviedb.org" target="_blank">TMDb</a></small>.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/autocomplete'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExObjArray from './examples/ExObjArray'
    import ExObjArrayCode from '!!raw-loader!./examples/ExObjArray'

    import ExHeader from './examples/ExHeader'
    import ExHeaderCode from '!!raw-loader!./examples/ExHeader'

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
                ExHeader,
                ExHeaderCode,
                ExCustomAsyncCode,
                ExCustomAsync
            }
        }
    }
</script>
