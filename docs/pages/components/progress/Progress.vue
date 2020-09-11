<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

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

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    import ExValues from './examples/ExValues'
    import ExValuesCode from '!!raw-loader!./examples/ExValues'

    import ExSlot from './examples/ExSlot'
    import ExSlotCode from '!!raw-loader!./examples/ExSlot'

    import ExBars from './examples/ExBars'
    import ExBarsCode from '!!raw-loader!./examples/ExBars'

    export default {
        data() {
            return {
                api,
                variables,
                ExSimple,
                ExTypes,
                ExSizes,
                ExValues,
                ExSlot,
                ExSimpleCode,
                ExTypesCode,
                ExSizesCode,
                ExValuesCode,
                ExSlotCode,
                ExBars,
                ExBarsCode
            }
        }
    }
</script>
