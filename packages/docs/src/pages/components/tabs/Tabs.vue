<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <Example :component="ExDynamic" :code="ExDynamicCode" title="Dynamic">
            <p>Items can be created / modified / deleted and will always keep the defined order.</p>
            <p>
              You can also use <code>v-if</code> to show (or not) a Tab Item.
              In this case, you have to specify <code>order</code> to maintain the consistent order.
            </p>
        </Example>

        <Example :component="ExPosition" :code="ExPositionCode" title="Position"/>

        <Example :component="ExIcons" :code="ExIconsCode" title="Icons"/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes"/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types">
            <p>If you want a more classic style with borders add the <code>is-boxed</code> type.</p>
            <p>Or like Radio Buttons with the <code>is-toggle</code> or <code>is-toggle-rounded</code> type.</p>
        </Example>

        <Example :component="ExExpanded" :code="ExExpandedCode" title="Expanded">
            <p class="content">If you want the tabs to take full width, add the <code>expanded</code> prop.</p>
        </Example>

         <Example :component="ExCustomHeaders" :code="ExCustomHeadersCode" title="Custom Headers">
            <p>
                By adding a slot named <code>header</code> you can customize the header of a tab item.
            </p>
        </Example>

        <Example :component="ExVertical" :code="ExVerticalCode" title="Vertical"/>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/tabs'
    import variables from './variables/tabs'
    import { shallowFields } from '@/utils'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExDynamic from './examples/ExDynamic'
    import ExDynamicCode from './examples/ExDynamic.vue?raw'

    import ExPosition from './examples/ExPosition'
    import ExPositionCode from './examples/ExPosition.vue?raw'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from './examples/ExIcons.vue?raw'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from './examples/ExSizes.vue?raw'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from './examples/ExTypes.vue?raw'

    import ExExpanded from './examples/ExExpanded'
    import ExExpandedCode from './examples/ExExpanded.vue?raw'

    import ExCustomHeaders from './examples/ExCustomHeaders'
    import ExCustomHeadersCode from './examples/ExCustomHeaders.vue?raw'

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
                    ExPosition,
                    ExIcons,
                    ExSizes,
                    ExTypes,
                    ExExpanded,
                    ExCustomHeaders,
                    ExVertical
                }),
                ExSimpleCode,
                ExDynamicCode,
                ExPositionCode,
                ExIconsCode,
                ExSizesCode,
                ExTypesCode,
                ExExpandedCode,
                ExCustomHeadersCode,
                ExVerticalCode
            }
        }
    }
</script>
