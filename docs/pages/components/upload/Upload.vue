<template>
    <div class="is-clipped">
        <h1 class="title is-spaced">Upload</h1>
        <h2 class="subtitle">Upload one or more files</h2>

        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <hr>

        <h2 class="title is-spaced">Drag and drop</h2>
        <Example :component="ExDragDrop" :code="ExDragDropCode" vertical/>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/upload'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExDragDrop from './examples/ExDragDrop'
    import ExDragDropCode from '!!raw-loader!./examples/ExDragDrop'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExDragDrop,
                ExSimpleCode,
                ExDragDropCode
            }
        }
    }
</script>
