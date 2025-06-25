<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExEditable" :code="ExEditableCode" title="Editable (non readonly)" vertical>
            <p>Use <code>editable</code> prop to let the user type a time.</p>
        </Example>

        <Example :component="ExRange" :code="ExRangeCode" title="Range" vertical>
            <p>You can limit the date range with <code>min-time</code> and <code>max-time</code> props.</p>
        </Example>

        <Example :component="ExFooter" :code="ExFooterCode" title="Footer" vertical>
            <p>Any slots are added to the footer of the timepicker.</p>
        </Example>

        <Example :component="ExInline" :code="ExInlineCode" title="Inline" vertical>
            <p>Timepicker can also be shown inline with the <code>inline</code> prop, input is removed, set a <code>v-model</code> to get the date.</p>
        </Example>

        <Example :component="ExGranularity" :code="ExGranularityCode" title="Granularity" vertical>
            <p>Timepicker can be set with a minute or hour ganularity with <code>incrementMinutes</code> or <code>incrementHours</code>.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import { shallowFields } from '@/utils'
    import ApiView from '@/components/ApiView.vue'
    import Example from '@/components/Example.vue'

    import api from './api/timepicker'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExEditable from './examples/ExEditable.vue'
    import ExEditableCode from './examples/ExEditable.vue?raw'

    import ExRange from './examples/ExRange.vue'
    import ExRangeCode from './examples/ExRange.vue?raw'

    import ExFooter from './examples/ExFooter.vue'
    import ExFooterCode from './examples/ExFooter.vue?raw'

    import ExInline from './examples/ExInline.vue'
    import ExInlineCode from './examples/ExInline.vue?raw'

    import ExGranularity from './examples/ExGranularity.vue'
    import ExGranularityCode from './examples/ExGranularity.vue?raw'

    export default defineComponent({
        components: {
            ApiView,
            Example
        },
        data() {
            return {
                api,
                ...shallowFields({
                    ExSimple,
                    ExEditable,
                    ExRange,
                    ExFooter,
                    ExGranularity,
                    ExInline
                }),
                ExSimpleCode,
                ExEditableCode,
                ExGranularityCode,
                ExRangeCode,
                ExFooterCode,
                ExInlineCode
            }
        }
    })
</script>
