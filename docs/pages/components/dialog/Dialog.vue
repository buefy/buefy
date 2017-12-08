<template>
    <div class="container">
        <h1 class="title is-spaced">Dialog</h1>
        <h2 class="subtitle">Dialogs inform users about a specific task and may contain critical information or require decisions</h2>
        <hr>

        <h3 class="title">Alert</h3>
        <Example :component="ExAlertDialog" :code="ExAlertDialogCode"/>

        <hr>

        <h3 class="title">Confirm</h3>
        <Example :component="ExConfirmDialog" :code="ExConfirmDialogCode"/>

        <hr>

        <h3 class="title">Prompt</h3>
        <Example :component="ExPromptDialog" :code="ExPromptDialogCode"/>

        <hr>
        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/Dialog'

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
