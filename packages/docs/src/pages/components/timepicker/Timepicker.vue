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

<script>
    import api from './api/timepicker'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExEditable from './examples/ExEditable'
    import ExEditableCode from './examples/ExEditable.vue?raw'

    import ExRange from './examples/ExRange'
    import ExRangeCode from './examples/ExRange.vue?raw'

    import ExFooter from './examples/ExFooter'
    import ExFooterCode from './examples/ExFooter.vue?raw'

    import ExInline from './examples/ExInline'
    import ExInlineCode from './examples/ExInline.vue?raw'

    import ExGranularity from './examples/ExGranularity'
    import ExGranularityCode from './examples/ExGranularity.vue?raw'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExEditable,
                ExRange,
                ExFooter,
                ExGranularity,
                ExInline,
                ExSimpleCode,
                ExEditableCode,
                ExGranularityCode,
                ExRangeCode,
                ExFooterCode,
                ExInlineCode
            }
        }
    }
</script>
