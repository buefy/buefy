<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types" vertical/>

        <Example :component="ExRange" :code="ExRangeCode" title="Min - Max" vertical>
            <p>You can use the <code>min</code> and/or <code>max</code> props to limit the range.</p>
        </Example>

        <Example :component="ExStep" :code="ExStepCode" title="Steps" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <Example :component="ExCustomize" :code="ExCustomizeCode" title="Customization" vertical />

        <ApiView :data="api"/>
    </div>

</template>

<script>
    import api from './api/numberinput'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    import ExRange from './examples/ExRange'
    import ExRangeCode from '!!raw-loader!./examples/ExRange'

    import ExStep from './examples/ExStep'
    import ExStepCode from '!!raw-loader!./examples/ExStep'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    import ExCustomize from './examples/ExCustomize'
    import ExCustomizeCode from '!!raw-loader!./examples/ExCustomize'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExTypes,
                ExStep,
                ExCustomize,
                ExRange,
                ExSizes,
                ExSimpleCode,
                ExTypesCode,
                ExStepCode,
                ExCustomizeCode,
                ExRangeCode,
                ExSizesCode
            }
        }
    }
</script>
