<template>
    <section>
        <Example :component="ExSample" :code="ExSampleCode" title="Sample"/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes"/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Sizes"/>

        <Example :component="ExFixedPosition" :code="ExFixedPositionCode" title="Fixed Positions (Appears when scolls down)"/>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </section>
</template>

<script>
	import api from './api/backtotop'
    import variables from './variables/backtotop'

	import ExSample from './examples/ExSample'
    import ExSampleCode from '!!raw-loader!./examples/ExSample'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    import ExFixedPosition from './examples/ExFixedPosition'
    import ExFixedPositionCode from '!!raw-loader!./examples/ExFixedPosition'

    export default {
    
        name: 'Backtotop',
    
        data () {
            return {
            	api,
            	variables,
            	ExSample,
            	ExSampleCode,
            	ExSizes,
            	ExSizesCode,
            	ExTypes,
            	ExTypesCode,
                ExFixedPosition,
                ExFixedPositionCode,
            }
        }
    }
</script>

<style lang="css" scoped>
</style>
