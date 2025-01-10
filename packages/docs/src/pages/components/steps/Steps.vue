<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <Example :component="ExDynamic" :code="ExDynamicCode" title="Dynamic">
            <p>Items can be created / modified / deleted and will always keep the defined order.</p>
            <p>
              You can also use <code>v-if</code> to show (or not) a Step Item.
              In this case, you have to specify <code>order</code> to maintain the consistent order.
            </p>
        </Example>

        <Example :component="ExIcons" :code="ExIconsCode" title="Icons"/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes"/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types"/>

        <Example :component="ExVertical" :code="ExVerticalCode" title="Vertical"/>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import { shallowFields } from '@/utils'
    import ApiView from '@/components/ApiView.vue'
    import Example from '@/components/Example.vue'
    import VariablesView from '@/components/VariablesView.vue'

    import api from './api/steps'
    import variables from './variables/steps'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExDynamic from './examples/ExDynamic.vue'
    import ExDynamicCode from './examples/ExDynamic.vue?raw'

    import ExIcons from './examples/ExIcons.vue'
    import ExIconsCode from './examples/ExIcons.vue?raw'

    import ExSizes from './examples/ExSizes.vue'
    import ExSizesCode from './examples/ExSizes.vue?raw'

    import ExTypes from './examples/ExTypes.vue'
    import ExTypesCode from './examples/ExTypes.vue?raw'

    import ExVertical from './examples/ExVertical.vue'
    import ExVerticalCode from './examples/ExVertical.vue?raw'

    export default defineComponent({
        components: {
            ApiView,
            Example,
            VariablesView
        },
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
    })
</script>
