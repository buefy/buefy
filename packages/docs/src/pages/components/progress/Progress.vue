<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <Example :component="ExNotRounded" :code="ExNotRoundedCode" title="Not rounded" vertical/>

        <Example :component="ExValues" :code="ExValuesCode" title="Values" vertical/>

        <Example :component="ExSlot" :code="ExSlotCode" title="Slot" vertical>
            <p>There is also a default slot if you want to display anything you want inside the progress bar.</p>
        </Example>

        <Example :component="ExBars" :code="ExBarsCode" title="Multiple bars" vertical>
            <p>You can also include multiple progress bars in a progress component if you need.</p>
            <p><i>* This will not use the native <code>progress</code> element.</i></p>
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

    import api from './api/progress'
    import variables from './variables/progress'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExTypes from './examples/ExTypes.vue'
    import ExTypesCode from './examples/ExTypes.vue?raw'

    import ExSizes from './examples/ExSizes.vue'
    import ExSizesCode from './examples/ExSizes.vue?raw'

    import ExNotRounded from './examples/ExNotRounded.vue'
    import ExNotRoundedCode from './examples/ExNotRounded.vue?raw'

    import ExValues from './examples/ExValues.vue'
    import ExValuesCode from './examples/ExValues.vue?raw'

    import ExSlot from './examples/ExSlot.vue'
    import ExSlotCode from './examples/ExSlot.vue?raw'

    import ExBars from './examples/ExBars.vue'
    import ExBarsCode from './examples/ExBars.vue?raw'

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
                    ExTypes,
                    ExSizes,
                    ExNotRounded,
                    ExValues,
                    ExSlot,
                    ExBars
                }),
                ExSimpleCode,
                ExTypesCode,
                ExSizesCode,
                ExNotRoundedCode,
                ExValuesCode,
                ExSlotCode,
                ExBarsCode
            }
        }
    })
</script>
