<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExDragDrop" :code="ExDragDropCode" title="Drag and drop" vertical/>

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
