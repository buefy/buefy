<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <Example :component="ExValues" :code="ExValuesCode" title="Values" vertical/>

        <Example :component="ExSlot" :code="ExSlotCode" title="Slot" vertical>
            <p>There is also a default slot if you want to display anything you want inside the progress bar</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/progress'

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

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExTypes,
                ExSizes,
                ExValues,
                ExSlot,
                ExSimpleCode,
                ExTypesCode,
                ExSizesCode,
                ExValuesCode,
                ExSlotCode
            }
        }
    }
</script>
