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

        <Example :component="ExAutoCloseWithProgressBar" :code="ExAutoCloseWithProgressBarCode" title="Auto Close With Progress Bar" vertical>
            <p>Message will be automatically closed after <code>duration</code> with a progress bar which indicates the delay passed.</p>
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import api from './api/message'
    import variables from './variables/message'
    import { shallowFields } from '@/utils'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExTypes from './examples/ExTypes.vue'
    import ExTypesCode from './examples/ExTypes.vue?raw'

    import ExIcons from './examples/ExIcons.vue'
    import ExIconsCode from './examples/ExIcons.vue?raw'

    import ExHeaderless from './examples/ExHeaderless.vue'
    import ExHeaderlessCode from './examples/ExHeaderless.vue?raw'

    import ExCustomHeader from './examples/ExCustomHeader.vue'
    import ExCustomHeaderCode from './examples/ExCustomHeader.vue?raw'

    import ExSizes from './examples/ExSizes.vue'
    import ExSizesCode from './examples/ExSizes.vue?raw'

    import ExAutoClose from './examples/ExAutoClose.vue'
    import ExAutoCloseCode from './examples/ExAutoClose.vue?raw'

    import ExAutoCloseWithProgressBar from './examples/ExAutoCloseWithProgressBar.vue'
    import ExAutoCloseWithProgressBarCode from './examples/ExAutoCloseWithProgressBar.vue?raw'

    export default defineComponent({
        data() {
            return {
                api,
                variables,
                ...shallowFields({
                    ExSimple,
                    ExTypes,
                    ExIcons,
                    ExHeaderless,
                    ExCustomHeader,
                    ExSizes,
                    ExAutoClose,
                    ExAutoCloseWithProgressBar
                }),
                ExSimpleCode,
                ExTypesCode,
                ExIconsCode,
                ExHeaderlessCode,
                ExCustomHeaderCode,
                ExSizesCode,
                ExAutoCloseCode,
                ExAutoCloseWithProgressBarCode
            }
        }
    })
</script>
