<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <Example :component="ExIcons" :code="ExIconsCode" title="Icons"/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes"/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types"/>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/steps'
    import variables from './variables/steps'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from '!!raw-loader!./examples/ExIcons'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    export default {
        data() {
            return {
                api,
                variables,
                ExSimple,
                ExIcons,
                ExSizes,
                ExTypes,
                ExSimpleCode,
                ExIconsCode,
                ExSizesCode,
                ExTypesCode
            }
        }
    }
</script>
