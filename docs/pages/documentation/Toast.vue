<template>
    <div>
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
        <CodeView :code="ExSimpleCode" />

        <hr>
        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiToast'

    import ExSimple from '@/examples/toast/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/toast/ExSimple'

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
