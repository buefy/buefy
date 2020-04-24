<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <Example :component="ExDynamic" :code="ExDynamicCode" title="Dynamic">
            <p>Items can be created / modified / deleted and will always keep the defined order.</p>
            <p>You can also use <code>v-if</code> to show (or not) a Step Item.</p>
        </Example>

        <Example :component="ExIcons" :code="ExIconsCode" title="Icons"/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes"/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types"/>

        <Example :component="ExVertical" :code="ExVerticalCode" title="Vertical"/>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/steps'
    import variables from './variables/steps'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExDynamic from './examples/ExDynamic'
    import ExDynamicCode from '!!raw-loader!./examples/ExDynamic'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from '!!raw-loader!./examples/ExIcons'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    import ExVertical from './examples/ExVertical'
    import ExVerticalCode from '!!raw-loader!./examples/ExVertical'

    export default {
        data() {
            return {
                api,
                variables,
                ExSimple,
                ExDynamic,
                ExIcons,
                ExSizes,
                ExTypes,
                ExSimpleCode,
                ExDynamicCode,
                ExIconsCode,
                ExSizesCode,
                ExTypesCode,
                ExVertical,
                ExVerticalCode
            }
        }
    }
</script>
