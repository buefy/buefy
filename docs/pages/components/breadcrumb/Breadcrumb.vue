<template>
    <section>
    	<Example :component="ExAlignments" :code="ExAlignmentsCode" title="Alignments"/>

    	<Example :component="ExSeparators" :code="ExSeparatorsCode" title="Separators"/>
    	
    	<Example :component="ExSizes" :code="ExSizesCode" title="Sizes"/>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </section>
</template>

<script>
	import api from './api/breadcrumb'
    import variables from './variables/breadcrumb'

	import ExAlignments from './examples/ExAlignments'
    import ExAlignmentsCode from '!!raw-loader!./examples/ExAlignments'

    import ExSeparators from './examples/ExSeparators'
    import ExSeparatorsCode from '!!raw-loader!./examples/ExSeparators'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    export default {
    
        name: 'Breadcrumb',
    
        data () {
            return {
            	api,
            	variables,
            	ExAlignments,
            	ExAlignmentsCode,
            	ExSeparators,
            	ExSeparatorsCode,
            	ExSizes,
            	ExSizesCode,
            }
        }
    }
</script>

<style lang="css" scoped>
</style>
