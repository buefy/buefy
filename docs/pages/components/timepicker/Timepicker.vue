<template>
    <div>
        <h1 class="title is-spaced">Timepicker</h1>
        <h2 class="subtitle">An input with a simple dropdown/modal for selecting a time, uses native timepicker for mobile</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExNonReadonly" :code="ExNonReadonlyCode" title="Non read-only" vertical>
            <p>Use <code>:readonly="false"</code> to let the user type a time.</p>
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

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/timepicker'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExNonReadonly from './examples/ExNonReadonly'
    import ExNonReadonlyCode from '!!raw-loader!./examples/ExNonReadonly'

    import ExRange from './examples/ExRange'
    import ExRangeCode from '!!raw-loader!./examples/ExRange'

    import ExFooter from './examples/ExFooter'
    import ExFooterCode from '!!raw-loader!./examples/ExFooter'

    import ExInline from './examples/ExInline'
    import ExInlineCode from '!!raw-loader!./examples/ExInline'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExNonReadonly,
                ExRange,
                ExFooter,
                ExInline,
                ExSimpleCode,
                ExNonReadonlyCode,
                ExRangeCode,
                ExFooterCode,
                ExInlineCode
            }
        }
    }
</script>
