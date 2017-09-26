<template>
    <div class="container">
        <h1 class="title is-spaced">Toast</h1>
        <h2 class="subtitle">Toasts are simple text messages to inform the user</h2>
        <hr>

        <div class="block">
            <p>They have a slightly transparency and are queued to not confuse the user.</p>
            <p class="content"><small><b>Note:</b> They queue with <router-link to="/documentation/snackbar">Snackbars</router-link> as well.</small></p>
        </div>

        <div class="block">
            <ex-simple></ex-simple>
        </div>
        <code-view :code="ExSimpleCode"></code-view>

        <hr>
        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    export default {
        components: {
            ExSimple
        },
        data() {
            return {
                api,
                ExSimpleCode
            }
        }
    }
</script>
