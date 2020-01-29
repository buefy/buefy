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

        <Example :component="ExGranularity" :code="ExGranularityCode" title="Ganularity" vertical>
            <p>Timepicker can be set with a minute or hour ganularity with <code>incrementMinutes</code> or <code>incrementHours</code>.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/timepicker'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExEditable from './examples/ExEditable'
    import ExEditableCode from '!!raw-loader!./examples/ExEditable'

    import ExRange from './examples/ExRange'
    import ExRangeCode from '!!raw-loader!./examples/ExRange'

    import ExFooter from './examples/ExFooter'
    import ExFooterCode from '!!raw-loader!./examples/ExFooter'

    import ExInline from './examples/ExInline'
    import ExInlineCode from '!!raw-loader!./examples/ExInline'

    import ExGranularity from './examples/ExGranularity'
    import ExGranularityCode from '!!raw-loader!./examples/ExGranularity'

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
