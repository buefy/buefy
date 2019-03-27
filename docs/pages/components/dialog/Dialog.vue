<template>
    <div>
        <Example :component="ExAlertDialog" :code="ExAlertDialogCode" title="Alert"/>

        <Example :component="ExConfirmDialog" :code="ExConfirmDialogCode" title="Confirm"/>

        <Example :component="ExPromptDialog" :code="ExPromptDialogCode" title="Prompt"/>

        <Example title="From outside Vue instance">
            <p>You can use it on Vuex or VueRouter using this syntax:</p>
            <CodeView lang="javascript" :code="outsideVueInstance | pre" expanded/>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
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
                import { Dialog } from 'buefy/dist/components/dialog'
                Dialog.alert('We can use confirm and prompt methods as well')`
            }
        }
    }
</script>
