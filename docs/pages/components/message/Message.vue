<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types" vertical/>

        <Example :component="ExIcons" :code="ExIconsCode" title="Icons" vertical/>

        <Example :component="ExHeaderless" :code="ExHeaderlessCode" title="Headerless" vertical>
            <p>Message without title becomes headerless, they are always non-closable.</p>
        </Example>

        <Example :component="ExCustomHeader" :code="ExCustomHeaderCode" title="Custom Header" vertical>
            <p>It is also possible to customize the header using the corresponding slot.</p>
        </Example>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <Example :component="ExAutoClose" :code="ExAutoCloseCode" title="Auto Close" vertical>
            <p>Message will be automatically closed after <code>duration</code>.</p>
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/message'
    import variables from './variables/message'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from '!!raw-loader!./examples/ExIcons'

    import ExHeaderless from './examples/ExHeaderless'
    import ExHeaderlessCode from '!!raw-loader!./examples/ExHeaderless'

    import ExCustomHeader from './examples/ExCustomHeader'
    import ExCustomHeaderCode from '!!raw-loader!./examples/ExCustomHeader'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    import ExAutoClose from './examples/ExAutoClose'
    import ExAutoCloseCode from '!!raw-loader!./examples/ExAutoClose'

    export default {
        data() {
            return {
                api,
                variables,
                ExSimple,
                ExTypes,
                ExIcons,
                ExHeaderless,
                ExCustomHeader,
                ExSizes,
                ExAutoClose,
                ExSimpleCode,
                ExTypesCode,
                ExIconsCode,
                ExHeaderlessCode,
                ExCustomHeaderCode,
                ExSizesCode,
                ExAutoCloseCode
            }
        }
    }
</script>
