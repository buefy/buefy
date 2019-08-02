<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <Example :component="ExStyles" :code="ExStylesCode" title="Styles" vertical/>

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

    import ExStyles from './examples/ExStyles'
    import ExStylesCode from '!!raw-loader!./examples/ExStyles'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExTypes,
                ExSizes,
                ExStyles,
                ExSimpleCode,
                ExTypesCode,
                ExSizesCode,
                ExStylesCode
            }
        }
    }
</script>
