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

<script>
    import api from './api/progress'
    import variables from './variables/progress'
    import { shallowFields } from '@/utils'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from './examples/ExTypes.vue?raw'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from './examples/ExSizes.vue?raw'

    import ExNotRounded from './examples/ExNotRounded'
    import ExNotRoundedCode from './examples/ExNotRounded.vue?raw'

    import ExValues from './examples/ExValues'
    import ExValuesCode from './examples/ExValues.vue?raw'

    import ExSlot from './examples/ExSlot'
    import ExSlotCode from './examples/ExSlot.vue?raw'

    import ExBars from './examples/ExBars'
    import ExBarsCode from './examples/ExBars.vue?raw'

    export default {
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
    }
</script>
