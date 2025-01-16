<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExAlpha" :code="ExAlphaCode" title="Alpha" vertical/>

        <Example :component="ExRepresentation" :code="ExRepresentationCode" title="Representation" vertical/>

        <Example :component="ExFields" :code="ExFieldsCode" title="Footer" vertical/>

        <Example :component="ExFormatter" :code="ExFormatterCode" title="Formatter" vertical/>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import { shallowFields } from '@/utils'
    import ApiView from '@/components/ApiView.vue'
    import Example from '@/components/Example.vue'
    import VariablesView from '@/components/VariablesView.vue'

    import api from './api/colorpicker'
    import variables from './variables/colorpicker'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExAlpha from './examples/ExAlpha.vue'
    import ExAlphaCode from './examples/ExAlpha.vue?raw'

    import ExRepresentation from './examples/ExRepresentation.vue'
    import ExRepresentationCode from './examples/ExRepresentation.vue?raw'

    import ExFormatter from './examples/ExFormatter.vue'
    import ExFormatterCode from './examples/ExFormatter.vue?raw'

    import ExFields from './examples/ExFields.vue'
    import ExFieldsCode from './examples/ExFields.vue?raw'

    export default defineComponent({
        components: {
            ApiView,
            Example,
            VariablesView
        },
        data() {
            return {
                api,
                variables,
                ...shallowFields({
                    ExSimple,
                    ExAlpha,
                    ExRepresentation,
                    ExFormatter,
                    ExFields
                }),
                ExSimpleCode,
                ExAlphaCode,
                ExRepresentationCode,
                ExFormatterCode,
                ExFieldsCode
            }
        }
    })
</script>
