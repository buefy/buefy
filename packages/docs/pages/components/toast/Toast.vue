<template>
    <div>
        <div class="content">
            <p>They have a slightly transparency and are queued to not confuse the user.</p>
            <p><small><b>Note:</b> They queue with <router-link to="/documentation/snackbar">Snackbars</router-link> as well.</small></p>
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
    import api from './api/toast'
    import variables from './variables/toast'

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
                import { ToastProgrammatic as Toast } from 'buefy'
                Toast.open('Toasty!')`
            }
        },
        methods: {
            preformat
        }
    }
</script>
