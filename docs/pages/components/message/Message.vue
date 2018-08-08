<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types" vertical/>

        <Example :component="ExIcons" :code="ExIconsCode" title="Icons" vertical/>

        <Example :component="ExHeaderless" :code="ExHeaderlessCode" title="Headerless" vertical>
            <p>Message without title becomes headerless, they are always non-closable.</p>
        </Example>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <Example :component="ExAutoClose" :code="ExAutoCloseCode" title="Auto Close" vertical>
            <p>Message will be automatically closed after <code>duration</code>.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/message'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from '!!raw-loader!./examples/ExIcons'

    import ExHeaderless from './examples/ExHeaderless'
    import ExHeaderlessCode from '!!raw-loader!./examples/ExHeaderless'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    import ExAutoClose from './examples/ExAutoClose'
    import ExAutoCloseCode from '!!raw-loader!./examples/ExAutoClose'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExTypes,
                ExIcons,
                ExHeaderless,
                ExSizes,
                ExAutoClose,
                ExSimpleCode,
                ExTypesCode,
                ExIconsCode,
                ExHeaderlessCode,
                ExSizesCode,
                ExAutoCloseCode
            }
        }
    }
</script>
