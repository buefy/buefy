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

<script lang="ts">
    import { defineComponent } from 'vue'

    import { shallowFields } from '@/utils'
    import ApiView from '@/components/ApiView.vue'
    import Example from '@/components/Example.vue'

    import api from './api/upload'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExDragDrop from './examples/ExDragDrop.vue'
    import ExDragDropCode from './examples/ExDragDrop.vue?raw'

    import ExExpanded from './examples/ExExpanded.vue'
    import ExExpandedCode from './examples/ExExpanded.vue?raw'

    import ExRounded from './examples/ExRounded.vue'
    import ExRoundedCode from './examples/ExRounded.vue?raw'

    import ExValidation from './examples/ExValidation.vue'
    import ExValidationCode from './examples/ExValidation.vue?raw'


    export default defineComponent({
        components: {
            ApiView,
            Example
        },
        data() {
            return {
                api,
                ...shallowFields({
                    ExSimple,
                    ExDragDrop,
                    ExExpanded,
                    ExRounded,
                    ExValidation
                }),
                ExSimpleCode,
                ExDragDropCode,
                ExExpandedCode,
                ExRoundedCode,
                ExValidationCode,
            }
        }
    })
</script>
