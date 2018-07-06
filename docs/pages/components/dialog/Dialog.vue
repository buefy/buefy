<template>
    <div>
        <Example :component="ExAlertDialog" :code="ExAlertDialogCode" title="Alert"/>

        <Example :component="ExConfirmDialog" :code="ExConfirmDialogCode" title="Confirm"/>

        <Example :component="ExPromptDialog" :code="ExPromptDialogCode" title="Prompt"/>

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
                ExPromptDialogCode
            }
        }
    }
</script>
