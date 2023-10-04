<template>
    <div>
        <Example :component="ExAlertDialog" :code="ExAlertDialogCode" title="Alert"/>

        <Example :component="ExConfirmDialog" :code="ExConfirmDialogCode" title="Confirm"/>

        <Example :component="ExPromptDialog" :code="ExPromptDialogCode" title="Prompt"/>

        <Example title="From outside Vue instance">
            <p>You can use it on Vuex or VueRouter using this syntax:</p>
            <CodeView lang="javascript" :code="preformat(outsideVueInstance)" expanded/>
        </Example>

        <Example title="Promise">
            <p>You can set <code>defaultProgrammaticPromise</code> constructor option to get a Promise</p>
            <CodeView lang="javascript" :code="preformat(promise)" expanded/>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import { preformat } from '@/utils'
    import api from './api/dialog'

    import ExAlertDialog from './examples/ExAlertDialog'
    import ExAlertDialogCode from '!!raw-loader!./examples/ExAlertDialog'

    import ExConfirmDialog from './examples/ExConfirmDialog'
    import ExConfirmDialogCode from '!!raw-loader!./examples/ExConfirmDialog'

    import ExPromptDialog from './examples/ExPromptDialog'
    import ExPromptDialogCode from '!!raw-loader!./examples/ExPromptDialog'

    export default {
        data() {
            return {
                api,
                ExAlertDialog,
                ExAlertDialogCode,
                ExConfirmDialog,
                ExConfirmDialogCode,
                ExPromptDialog,
                ExPromptDialogCode,
                outsideVueInstance: `
                import { DialogProgrammatic as Dialog } from 'buefy'
                Dialog.alert('We can use confirm and prompt methods as well')`,
                promise: `
                const { result, dialog } = await this.$buefy.dialog.confirm({
                    message: 'Are you sure?',
                    closeOnConfirm: false
                });`
            }
        },
        methods: {
            preformat
        }
    }
</script>
