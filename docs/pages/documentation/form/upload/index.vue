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
                <code-view :code="ExSimpleCode"></code-view>
            </div>
        </div>

        <hr>

        <h2 class="title is-spaced">Drag and drop</h2>
        <div class="columns">
            <div class="column">
                <ex-drag-drop></ex-drag-drop>
            </div>
            <div class="column">
                <code-view :code="ExDragDropCode"></code-view>
            </div>
        </div>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExDragDrop from './examples/ExDragDrop'
    import ExDragDropCode from '!!raw-loader!./examples/ExDragDrop'

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
