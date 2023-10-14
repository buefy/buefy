<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <Example :component="ExStyles" :code="ExStylesCode" title="Styles" vertical/>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/switch'
    import variables from './variables/switch'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from './examples/ExTypes.vue?raw'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from './examples/ExSizes.vue?raw'

    import ExStyles from './examples/ExStyles'
    import ExStylesCode from './examples/ExStyles.vue?raw'

    export default {
        data() {
            return {
                api,
                variables,
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
