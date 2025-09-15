<template>
    <div>
        <div class="content">
            <p>They have only one button, and by default are queued to not confuse the user.</p>
            <p><small><b>Note:</b> They queue with <router-link to="/documentation/toast">Toasts</router-link> as well.</small></p>
        </div>

        <Example title="From inside Vue instance" :component="ExSimple" :code="ExSimpleCode"/>

        <Example :component="ExCompositionApi" :code="ExCompositionApiCode" title="Composition API">
            When using the Composition API, you can access the current Snackbar instance
            with <code>useSnackbar()</code>:
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import { preformat, shallowFields } from '@/utils'
    import ApiView from '@/components/ApiView.vue'
    import CodeView from '@/components/CodeView.vue'
    import Example from '@/components/Example.vue'
    import VariablesView from '@/components/VariablesView.vue'

    import api from './api/snackbar'
    import variables from './variables/snackbar'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExCompositionApi from './examples/ExCompositionApi.vue'
    import ExCompositionApiCode from './examples/ExCompositionApi.vue?raw'

    export default defineComponent({
        components: {
            ApiView,
            CodeView,
            Example,
            VariablesView
        },
        data() {
            return {
                api,
                variables,
                ...shallowFields({
                    ExSimple,
                    ExCompositionApi,
                }),
                ExSimpleCode,
                ExCompositionApiCode,
            }
        },
        methods: { preformat }
    })
</script>
