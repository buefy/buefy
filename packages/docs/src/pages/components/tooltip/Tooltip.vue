<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExStyles" :code="ExStylesCode" title="Styles" vertical/>

        <Example :component="ExCustom" :code="ExCustomCode" title="Custom content" vertical>
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.9.0</span>
            </div>
            <p>Use the <code>content</code> slot for complex content with HTML or components. Note it overrides the <code>label</code> prop.</p>
        </Example>

        <Example :component="ExMultilined" :code="ExMultilinedCode" title="Multilined" vertical>
            <p>Well, it's not always <em>that</em> brief.</p>
        </Example>

        <Example :component="ExToggle" :code="ExToggleCode" title="Toggle" vertical/>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/tooltip'
    import variables from './variables/tooltip'
    import { shallowFields } from '@/utils'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExStyles from './examples/ExStyles'
    import ExStylesCode from './examples/ExStyles.vue?raw'

    import ExCustom from './examples/ExCustom'
    import ExCustomCode from './examples/ExCustom.vue?raw'

    import ExMultilined from './examples/ExMultilined'
    import ExMultilinedCode from './examples/ExMultilined.vue?raw'

    import ExToggle from './examples/ExToggle'
    import ExToggleCode from './examples/ExToggle.vue?raw'

    export default {
        data() {
            return {
                api,
                variables,
                ...shallowFields({
                    ExSimple,
                    ExStyles,
                    ExMultilined,
                    ExToggle,
                    ExCustom
                }),
                ExSimpleCode,
                ExStylesCode,
                ExMultilinedCode,
                ExToggleCode,
                ExCustomCode
            }
        }
    }
</script>
