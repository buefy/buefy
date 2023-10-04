<template>
    <div>
        <div class="content">
            <p>They have only one button, and by default are queued to not confuse the user.</p>
            <p><small><b>Note:</b> They queue with <router-link to="/documentation/toast">Toasts</router-link> as well.</small></p>
        </div>

        <Example title="From inside Vue instance" :component="ExSimple" :code="ExSimpleCode"/>

        <Example title="From outside Vue instance">
            <p>You can use it on Vuex or VueRouter using this syntax:</p>
            <CodeView lang="javascript" :code="preformat(outsideVueInstance)" expanded/>
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import { preformat } from '@/utils'

    import api from './api/snackbar'
    import variables from './variables/snackbar'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    export default {
        data() {
            return {
                api,
                variables,
                ExSimple,
                ExSimpleCode,
                outsideVueInstance: `
                import { SnackbarProgrammatic as Snackbar } from 'buefy'
                Snackbar.open('Look at me!')`
            }
        },
        methods: { preformat }
    }
</script>
