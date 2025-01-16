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

<script lang="ts">
    import { defineComponent } from 'vue'

    import { shallowFields } from '@/utils'
    import ApiView from '@/components/ApiView.vue'
    import Example from '@/components/Example.vue'
    import VariablesView from '@/components/VariablesView.vue'

    import api from './api/slider'
    import variables from './variables/slider'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'
    import ExSizes from './examples/ExSizes.vue'
    import ExSizesCode from './examples/ExSizes.vue?raw'
    import ExTypes from './examples/ExTypes.vue'
    import ExTypesCode from './examples/ExTypes.vue?raw'
    import ExCustomize from './examples/ExCustomize.vue'
    import ExCustomizeCode from './examples/ExCustomize.vue?raw'
    import ExTick from './examples/ExTick.vue'
    import ExTickCode from './examples/ExTick.vue?raw'
    import ExRange from './examples/ExRange.vue'
    import ExRangeCode from './examples/ExRange.vue?raw'
    import ExLazy from './examples/ExLazy.vue'
    import ExLazyCode from './examples/ExLazy.vue?raw'
    import ExIndicator from './examples/ExIndicator.vue'
    import ExIndicatorCode from './examples/ExIndicator.vue?raw'

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
                    ExSizes,
                    ExTypes,
                    ExCustomize,
                    ExTick,
                    ExRange,
                    ExLazy,
                    ExIndicator
                }),
                ExSimpleCode,
                ExSizesCode,
                ExTypesCode,
                ExCustomizeCode,
                ExTickCode,
                ExRangeCode,
                ExLazyCode,
                ExIndicatorCode
            }
        }
    })
</script>
