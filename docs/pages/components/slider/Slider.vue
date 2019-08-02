<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types" vertical/>

        <Example :component="ExCustomize" :code="ExCustomizeCode" title="Customization" vertical/>

        <Example :component="ExTick" :code="ExTickCode" title="Tick and label" vertical>
            <p>Use Slider Tick component to add custom ticks and labels</p>
        </Example>

        <Example :component="ExRange" :code="ExRangeCode" title="Range slider">
            <p>Just bind the value to an Array.</p>
        </Example>

        <ApiView :data="api"/>
    </div>

</template>

<script>
    import api from './api/slider'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'
    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'
    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'
    import ExCustomize from './examples/ExCustomize'
    import ExCustomizeCode from '!!raw-loader!./examples/ExCustomize'
    import ExTick from './examples/ExTick'
    import ExTickCode from '!!raw-loader!./examples/ExTick'
    import ExRange from './examples/ExRange'
    import ExRangeCode from '!!raw-loader!./examples/ExRange'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode,
                ExSizes,
                ExSizesCode,
                ExTypes,
                ExTypesCode,
                ExCustomize,
                ExCustomizeCode,
                ExTick,
                ExTickCode,
                ExRange,
                ExRangeCode
            }
        }
    }
</script>
