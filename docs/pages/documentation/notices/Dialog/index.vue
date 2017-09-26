<template>
    <div class="container">
        <h1 class="title is-spaced">Dialog</h1>
        <h2 class="subtitle">Dialogs inform users about a specific task and may contain critical information or require decisions</h2>
        <hr>

        <h3 class="title">Alert</h3>
        <div class="block">
            <ex-alert-dialog></ex-alert-dialog>
        </div>
        <code-view :code="ExAlertDialogCode"></code-view>

        <hr>

        <h3 class="title">Confirm</h3>
        <div class="block">
            <ex-alert-confirm></ex-alert-confirm>
        </div>
        <code-view :code="ExAlertConfirmCode"></code-view>

        <hr>

        <h3 class="title">Prompt</h3>
        <div class="block">
            <ex-alert-prompt></ex-alert-prompt>
        </div>
        <code-view :code="ExAlertPromptCode"></code-view>

        <hr>
        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExAlertDialog from './examples/ExAlertDialog'
    import ExAlertDialogCode from '!!raw-loader!./examples/ExAlertDialog'

    import ExAlertConfirm from './examples/ExAlertConfirm'
    import ExAlertConfirmCode from '!!raw-loader!./examples/ExAlertConfirm'

    import ExAlertPrompt from './examples/ExAlertPrompt'
    import ExAlertPromptCode from '!!raw-loader!./examples/ExAlertPrompt'

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
