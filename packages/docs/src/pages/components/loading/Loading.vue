<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode">
            <p>The Loading will be closed after about 10 seconds, by pressing escape or by clicking outside.</p>
            <p>
                Use <code>:is-full-page="false"</code> to limit loader to its container.<br>
                In this case, the container element should be positioned as <code>position: relative</code>.
            </p>
        </Example>

        <Example :component="ExProgrammatically" :code="ExProgrammaticallyCode" title="Programmatically opening">
            <p>When you want to close the Loading, call the <code>close()</code> method from the component.</p>
        </Example>

        <Example :component="ExTemplated" :code="ExTemplatedCode" title="Templated">
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.7.5</span>
            </div>
            <p>Slot is available for loading content.</p>
        </Example>

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

    import api from './api/loading'
    import variables from './variables/loading'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExProgrammatically from './examples/ExProgrammatically.vue'
    import ExProgrammaticallyCode from './examples/ExProgrammatically.vue?raw'

    import ExTemplated from './examples/ExTemplated.vue'
    import ExTemplatedCode from './examples/ExTemplated.vue?raw'

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
                    ExProgrammatically,
                    ExTemplated
                }),
                ExSimpleCode,
                ExProgrammaticallyCode,
                ExTemplatedCode
            }
        }
    })
</script>
