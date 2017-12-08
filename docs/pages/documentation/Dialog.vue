<template>
    <div class="container">
        <h1 class="title is-spaced">Dialog</h1>
        <h2 class="subtitle">Dialogs inform users about a specific task and may contain critical information or require decisions</h2>
        <hr>

        <h3 class="title">Alert</h3>
        <div class="block">
            <ex-alert-dialog/>
        </div>
        <CodeView :code="ExAlertDialogCode" />

        <hr>

        <h3 class="title">Confirm</h3>
        <div class="block">
            <ex-confirm-dialog/>
        </div>
        <CodeView :code="ExConfirmDialogCode" />

        <hr>

        <h3 class="title">Prompt</h3>
        <div class="block">
            <ex-prompt-dialog/>
        </div>
        <CodeView :code="ExPromptDialogCode" />

        <hr>
        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiDialog'

    import ExAlertDialog from '@/examples/dialog/ExAlertDialog'
    import ExAlertDialogCode from '!!raw-loader!@/examples/dialog/ExAlertDialog'

    import ExConfirmDialog from '@/examples/dialog/ExConfirmDialog'
    import ExConfirmDialogCode from '!!raw-loader!@/examples/dialog/ExConfirmDialog'

    import ExPromptDialog from '@/examples/dialog/ExPromptDialog'
    import ExPromptDialogCode from '!!raw-loader!@/examples/dialog/ExPromptDialog'

    export default {
        components: {
            ExAlertDialog,
            ExConfirmDialog,
            ExPromptDialog
        },
        data() {
            return {
                api,
                ExAlertDialogCode,
                ExConfirmDialogCode,
                ExPromptDialogCode
            }
        }
    }
</script>
