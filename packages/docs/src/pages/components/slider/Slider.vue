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

        <Example :component="ExLazy" :code="ExLazyCode" title="Lazy update">
            <p>Use <code>lazy</code> to update <code>v-model</code> only when dragging is finished.</p>
        </Example>

        <Example :component="ExIndicator" :code="ExIndicatorCode" title="Indicator">
            <p>Use <code>indicator</code> to show <code>v-model</code> inside the thumb.</p>
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>

</template>

<script>
    import api from './api/slider'
    import variables from './variables/slider'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'
    import ExSizes from './examples/ExSizes'
    import ExSizesCode from './examples/ExSizes.vue?raw'
    import ExTypes from './examples/ExTypes'
    import ExTypesCode from './examples/ExTypes.vue?raw'
    import ExCustomize from './examples/ExCustomize'
    import ExCustomizeCode from './examples/ExCustomize.vue?raw'
    import ExTick from './examples/ExTick'
    import ExTickCode from './examples/ExTick.vue?raw'
    import ExRange from './examples/ExRange'
    import ExRangeCode from './examples/ExRange.vue?raw'
    import ExLazy from './examples/ExLazy'
    import ExLazyCode from './examples/ExLazy.vue?raw'
    import ExIndicator from './examples/ExIndicator'
    import ExIndicatorCode from './examples/ExIndicator.vue?raw'

    export default {
        data() {
            return {
                api,
                variables,
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
                ExRangeCode,
                ExLazy,
                ExLazyCode,
                ExIndicator,
                ExIndicatorCode
            }
        }
    }
</script>
