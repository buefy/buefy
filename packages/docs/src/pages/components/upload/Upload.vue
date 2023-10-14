<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExDragDrop" :code="ExDragDropCode" title="Drag and drop" vertical/>
        
        <Example :component="ExExpanded" :code="ExExpandedCode" title="Expanded" vertical/>
        
        <Example :component="ExRounded" :code="ExRoundedCode" title="Rounded" vertical/>
        
        <Example :component="ExValidation" :code="ExValidationCode" title="Validation" vertical/>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/upload'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExDragDrop from './examples/ExDragDrop'
    import ExDragDropCode from './examples/ExDragDrop.vue?raw'

    import ExExpanded from './examples/ExExpanded'
    import ExExpandedCode from './examples/ExExpanded.vue?raw'
    
    import ExRounded from './examples/ExRounded'
    import ExRoundedCode from './examples/ExRounded.vue?raw'

    import ExValidation from './examples/ExValidation'
    import ExValidationCode from './examples/ExValidation.vue?raw'


    export default {
        data() {
            return {
                api,
                ExSimple,
                ExDragDrop,
                ExExpanded,
                ExSimpleCode,
                ExDragDropCode,
                ExExpandedCode,
                ExRounded,
                ExRoundedCode,
                ExValidation,
                ExValidationCode,
            }
        }
    }
</script>
