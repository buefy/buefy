<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExAlpha" :code="ExAlphaCode" title="Alpha" vertical/>

        <Example :component="ExInline" :code="ExInlineCode" title="Inline" vertical/>
    </div>
</template>

<script>
    import api from './api/colorpicker'
    import variables from './variables/colorpicker'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExAlpha from './examples/ExAlpha'
    import ExAlphaCode from '!!raw-loader!./examples/ExAlpha'

    import ExInline from './examples/ExInline'
    import ExInlineCode from '!!raw-loader!./examples/ExInline'

    export default {
        data() {
            return {
                api,
                variables,

                ExSimple,
                ExSimpleCode,
                ExAlpha,
                ExAlphaCode,
                ExInline,
                ExInlineCode
            }
        }
    }
</script>