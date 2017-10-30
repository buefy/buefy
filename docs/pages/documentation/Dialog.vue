<template>
    <div class="container">
        <h1 class="title is-spaced">Dialog</h1>
        <h2 class="subtitle">Dialogs inform users about a specific task and may contain critical information or require decisions</h2>
        <hr>

        <h3 class="title">Alert</h3>
        <div class="block">
            <ex-alert-dialog></ex-alert-dialog>
        </div>
        <CodeView :code="ExAlertDialogCode" />

        <hr>

        <h3 class="title">Confirm</h3>
        <div class="block">
            <ex-alert-confirm></ex-alert-confirm>
        </div>
        <CodeView :code="ExAlertConfirmCode" />

        <hr>

        <h3 class="title">Prompt</h3>
        <div class="block">
            <ex-alert-prompt></ex-alert-prompt>
        </div>
        <CodeView :code="ExAlertPromptCode" />

        <hr>
        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiDialog'

    import ExAlertDialog from '@/examples/dialog/ExAlertDialog'
    import ExAlertDialogCode from '!!raw-loader!@/examples/dialog/ExAlertDialog'

    import ExAlertConfirm from '@/examples/dialog/ExAlertConfirm'
    import ExAlertConfirmCode from '!!raw-loader!@/examples/dialog/ExAlertConfirm'

    import ExAlertPrompt from '@/examples/dialog/ExAlertPrompt'
    import ExAlertPromptCode from '!!raw-loader!@/examples/dialog/ExAlertPrompt'

    export default {
        components: {
            ExAlertDialog,
            ExAlertConfirm,
            ExAlertPrompt
        },
        data() {
            return {
                api,
                ExAlertDialogCode,
                ExAlertConfirmCode,
                ExAlertPromptCode
            }
        }
    }
</script>
