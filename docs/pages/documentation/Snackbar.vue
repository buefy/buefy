<template>
    <div class="container">
        <h1 class="title is-spaced">Snackbar</h1>
        <h2 class="subtitle">When a Dialog seems a bit overkill for the task, Snackbars are good candidates</h2>
        <hr>

        <div class="content">
            <p>They have only one button, and by default are queued to not confuse the user.</p>
            <p><small><b>Note:</b> They queue with <router-link to="/documentation/toast">Toasts</router-link> as well.</small></p>
            <div class="tags has-addons">
                <span class="tag is-success">New!</span>
                <span class="tag is-info">0.6.2</span>
            </div>
            <p>
                You can disable queue by passing the <code>queue: false</code> object attribute or by using
                <router-link to="/documentation/constructor-options">constructor options</router-link>.
            </p>
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
    import api from '@/apis/apiSnackbar'

    import ExSimple from '@/examples/snackbar/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/snackbar/ExSimple'

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
