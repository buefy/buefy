<template>
    <div>
        <Example :component="ExAlertDialog" :code="ExAlertDialogCode" title="Alert"/>

        <Example :component="ExConfirmDialog" :code="ExConfirmDialogCode" title="Confirm"/>

        <Example :component="ExPromptDialog" :code="ExPromptDialogCode" title="Prompt"/>

        <Example title="Promise">
            <p>You can set <code>defaultProgrammaticPromise</code> constructor option to get a Promise</p>
            <CodeView lang="javascript" :code="preformat(promise)" expanded/>
        </Example>

        <Example :component="ExCompositionApi" :code="ExCompositionApiCode" title="Composition API">
            When using the Composition API, you can access the current Dialog instance
            with <code>useDialog()</code>:
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import { preformat, shallowFields } from '@/utils'
    import ApiView from '@/components/ApiView.vue'
    import CodeView from '@/components/CodeView.vue'
    import Example from '@/components/Example.vue'

    import api from './api/dialog'

    import ExAlertDialog from './examples/ExAlertDialog.vue'
    import ExAlertDialogCode from './examples/ExAlertDialog.vue?raw'

    import ExConfirmDialog from './examples/ExConfirmDialog.vue'
    import ExConfirmDialogCode from './examples/ExConfirmDialog.vue?raw'

    import ExCompositionApi from "./examples/ExCompositionApi.vue"
    import ExCompositionApiCode from "./examples/ExCompositionApi.vue?raw"

    import ExPromptDialog from './examples/ExPromptDialog.vue'
    import ExPromptDialogCode from './examples/ExPromptDialog.vue?raw'

    import promise from './promise.js?raw'

    export default defineComponent({
        components: {
            ApiView,
            CodeView,
            Example
        },
        data() {
            return {
                api,
                ...shallowFields({
                    ExAlertDialog,
                    ExConfirmDialog,
                    ExPromptDialog,
                    ExCompositionApi,
                }),
                ExAlertDialogCode,
                ExConfirmDialogCode,
                ExPromptDialogCode,
                ExCompositionApiCode,
                promise,
            }
        },
        methods: {
            preformat
        }
    })
</script>
