<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode"/>

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

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/tabs'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExPosition from './examples/ExPosition'
    import ExPositionCode from '!!raw-loader!./examples/ExPosition'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from '!!raw-loader!./examples/ExIcons'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    import ExExpanded from './examples/ExExpanded'
    import ExExpandedCode from '!!raw-loader!./examples/ExExpanded'

    import ExCustomHeaders from './examples/ExCustomHeaders'
    import ExCustomHeadersCode from '!!raw-loader!./examples/ExCustomHeaders'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExPosition,
                ExIcons,
                ExSizes,
                ExTypes,
                ExExpanded,
                ExSimpleCode,
                ExPositionCode,
                ExIconsCode,
                ExSizesCode,
                ExTypesCode,
                ExExpandedCode,
                ExCustomHeaders,
                ExCustomHeadersCode
            }
        }
    }
</script>
