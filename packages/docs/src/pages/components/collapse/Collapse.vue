<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExPanelTemplate" :code="ExPanelTemplateCode" title="Panel" vertical/>

        <Example :component="ExCardTemplate" :code="ExCardTemplateCode" title="Card" vertical/>

        <Example :component="ExPosition" :code="ExPositionCode" title="Position" vertical/>

        <Example :component="ExAccordion" :code="ExAccordionCode" title="Accordion Effect" vertical/>

        <ApiView :data="api"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import { shallowFields } from '@/utils'
    import ApiView from '@/components/ApiView.vue'
    import Example from '@/components/Example.vue'

    import api from './api/collapse'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExPanelTemplate from './examples/ExPanelTemplate.vue'
    import ExPanelTemplateCode from './examples/ExPanelTemplate.vue?raw'

    import ExCardTemplate from './examples/ExCardTemplate.vue'
    import ExCardTemplateCode from './examples/ExCardTemplate.vue?raw'

    import ExPosition from './examples/ExPosition.vue'
    import ExPositionCode from './examples/ExPosition.vue?raw'

    import ExAccordion from './examples/ExAccordion.vue'
    import ExAccordionCode from './examples/ExAccordion.vue?raw'

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
                    ExPanelTemplate,
                    ExCardTemplate,
                    ExPosition,
                    ExAccordion
                }),
                ExSimpleCode,
                ExPanelTemplateCode,
                ExCardTemplateCode,
                ExPositionCode,
                ExAccordionCode
            }
        }
    })
</script>
