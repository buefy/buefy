<template>
    <div>
        <div class="content">
            <p>They have a slightly transparency and are queued to not confuse the user.</p>
            <p><small><b>Note:</b> They queue with <router-link to="/documentation/snackbar">Snackbars</router-link> as well.</small></p>
        </div>

        <Example title="From inside Vue instance" :component="ExSimple" :code="ExSimpleCode"/>

        <Example title="From outside Vue instance">
            <p>You can use it on Vuex or VueRouter using this syntax:</p>
            <CodeView lang="javascript" :code="outsideVueInstance | pre" expanded/>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/toast'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode,
                outsideVueInstance: `
                import { Toast } from 'buefy/dist/components/toast'
                Toast.open('Toasty!')`
            }
        }
    }
</script>
