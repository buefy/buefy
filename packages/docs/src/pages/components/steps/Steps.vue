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
    import { shallowFields } from '@/utils'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExDynamic from './examples/ExDynamic'
    import ExDynamicCode from './examples/ExDynamic.vue?raw'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from './examples/ExIcons.vue?raw'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from './examples/ExSizes.vue?raw'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from './examples/ExTypes.vue?raw'

    import ExVertical from './examples/ExVertical'
    import ExVerticalCode from './examples/ExVertical.vue?raw'

    export default {
        data() {
            return {
                api,
                variables,
                ...shallowFields({
                    ExSimple,
                    ExDynamic,
                    ExIcons,
                    ExSizes,
                    ExTypes,
                    ExVertical
                }),
                ExSimpleCode,
                ExDynamicCode,
                ExIconsCode,
                ExSizesCode,
                ExTypesCode,
                ExVerticalCode
            }
        }
    }
</script>
