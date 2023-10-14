<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types" vertical/>

        <Example :component="ExRange" :code="ExRangeCode" title="Min - Max" vertical>
            <p>You can use the <code>min</code> and/or <code>max</code> props to limit the range.</p>
        </Example>

        <Example :component="ExStep" :code="ExStepCode" title="Steps" vertical/>

        <Example :component="ExExpon" :code="ExExponCode" title="Exponential increment" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <Example :component="ExAlignment" :code="ExAlignmentCode" title="Alignment and position" vertical/>

        <Example :component="ExCustomize" :code="ExCustomizeCode" title="Customization" vertical />

        <ApiView :data="api"/>
    </div>

</template>

<script>
    import api from './api/numberinput'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from './examples/ExTypes.vue?raw'

    import ExRange from './examples/ExRange'
    import ExRangeCode from './examples/ExRange.vue?raw'

    import ExStep from './examples/ExStep'
    import ExStepCode from './examples/ExStep.vue?raw'

    import ExExpon from './examples/ExExpon'
    import ExExponCode from './examples/ExExpon.vue?raw'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from './examples/ExSizes.vue?raw'

    import ExAlignment from './examples/ExAlignment'
    import ExAlignmentCode from './examples/ExAlignment.vue?raw'

    import ExCustomize from './examples/ExCustomize'
    import ExCustomizeCode from './examples/ExCustomize.vue?raw'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExTypes,
                ExStep,
                ExAlignment,
                ExCustomize,
                ExRange,
                ExSizes,
                ExSimpleCode,
                ExTypesCode,
                ExStepCode,
                ExExpon,
                ExExponCode,
                ExAlignmentCode,
                ExCustomizeCode,
                ExRangeCode,
                ExSizesCode
            }
        }
    }
</script>
