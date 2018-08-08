<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/switch'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExTypes,
                ExSizes,
                ExSimpleCode,
                ExTypesCode,
                ExSizesCode
            }
        }
    }
</script>
