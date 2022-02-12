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

<script>
    import api from './api/colorpicker'
    import variables from './variables/colorpicker'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExAlpha from './examples/ExAlpha'
    import ExAlphaCode from '!!raw-loader!./examples/ExAlpha'

    import ExRepresentation from './examples/ExRepresentation'
    import ExRepresentationCode from '!!raw-loader!./examples/ExRepresentation'

    import ExFormatter from './examples/ExFormatter'
    import ExFormatterCode from '!!raw-loader!./examples/ExFormatter'

    import ExFields from './examples/ExFields'
    import ExFieldsCode from '!!raw-loader!./examples/ExFields'

    export default {
        data() {
            return {
                api,
                variables,

                ExSimple,
                ExSimpleCode,
                ExAlpha,
                ExAlphaCode,
                ExRepresentation,
                ExRepresentationCode,
                ExFormatter,
                ExFormatterCode,
                ExFields,
                ExFieldsCode
            }
        }
    }
</script>