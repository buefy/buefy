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

<script>
    import api from './api/collapse'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExPanelTemplate from './examples/ExPanelTemplate'
    import ExPanelTemplateCode from './examples/ExPanelTemplate.vue?raw'

    import ExCardTemplate from './examples/ExCardTemplate'
    import ExCardTemplateCode from './examples/ExCardTemplate.vue?raw'

    import ExPosition from './examples/ExPosition'
    import ExPositionCode from './examples/ExPosition.vue?raw'

    import ExAccordion from './examples/ExAccordion'
    import ExAccordionCode from './examples/ExAccordion.vue?raw'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode,
                ExPanelTemplate,
                ExPanelTemplateCode,
                ExCardTemplate,
                ExCardTemplateCode,
                ExPosition,
                ExPositionCode,
                ExAccordion,
                ExAccordionCode
            }
        }
    }
</script>
