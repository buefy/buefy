<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExPanelTemplate" :code="ExPanelTemplateCode" title="Panel" vertical/>

        <Example :component="ExCardTemplate" :code="ExCardTemplateCode" title="Card" vertical/>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/collapse'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExPanelTemplate from './examples/ExPanelTemplate'
    import ExPanelTemplateCode from '!!raw-loader!./examples/ExPanelTemplate'

    import ExCardTemplate from './examples/ExCardTemplate'
    import ExCardTemplateCode from '!!raw-loader!./examples/ExCardTemplate'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode,
                ExPanelTemplate,
                ExPanelTemplateCode,
                ExCardTemplate,
                ExCardTemplateCode
            }
        }
    }
</script>
