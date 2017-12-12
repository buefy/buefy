<template>
    <div class="is-clipped">
        <h1 class="title is-spaced">Toast</h1>
        <h2 class="subtitle">Toasts are simple text messages to inform the user</h2>
        <hr>

        <div class="content">
            <p>They have a slightly transparency and are queued to not confuse the user.</p>
            <p><small><b>Note:</b> They queue with <router-link to="/documentation/snackbar">Snackbars</router-link> as well.</small></p>
            <div class="tags has-addons">
                <span class="tag is-success">New!</span>
                <span class="tag is-info">0.6.2</span>
            </div>
            <p>
                You can disable queue by passing the <code>queue: false</code> object attribute or by using
                <router-link to="/documentation/constructor-options">constructor options</router-link>.
            </p>
        </div>

        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <hr>
        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/Toast'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode
            }
        }
    }
</script>
