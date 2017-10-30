<template>
    <div class="container">
        <h1 class="title is-spaced">Upload</h1>
        <h2 class="subtitle">Upload one or more files</h2>

        <hr>

        <div class="columns">
            <div class="column">
                <ex-simple></ex-simple>
            </div>
            <div class="column">
                <CodeView :code="ExSimpleCode" />
            </div>
        </div>

        <hr>

        <h2 class="title is-spaced">Drag and drop</h2>
        <div class="columns">
            <div class="column">
                <ex-drag-drop></ex-drag-drop>
            </div>
            <div class="column">
                <CodeView :code="ExDragDropCode" />
            </div>
        </div>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiUpload'

    import ExSimple from '@/examples/upload/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/upload/ExSimple'

    import ExDragDrop from '@/examples/upload/ExDragDrop'
    import ExDragDropCode from '!!raw-loader!@/examples/upload/ExDragDrop'

    export default {
        components: {
            ExSimple,
            ExDragDrop
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExDragDropCode
            }
        }
    }
</script>
