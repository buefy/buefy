<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExEditable" :code="ExEditableCode" title="Editable (non readonly)" vertical>
            <p>Use <code>editable</code> prop to let the user type a date.</p>
            <b-message type="is-warning" has-icon>
                Datepicker will try to parse the date using the specified locale format (or the browser locale if not defined).
                Note that it will fallback to
                <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/parse" target="_blank">Date.parse()</a>
                which only works for <b>mm-dd-yyyy</b> format. If it does not fit your requirements, you have to pass a custom one with
                <code>date-parser</code> prop, or by setting a <router-link to="/documentation/constructor-options">constructor option</router-link>.
            </b-message>
        </Example>

        <Example :component="ExRange" :code="ExRangeCode" title="Range" vertical>
            <p>You can limit the date range with <code>min-date</code> and <code>max-date</code> props.</p>
        </Example>

        <Example :component="ExFooter" :code="ExFooterCode" title="Footer" vertical>
            <p>Any slots are added to the footer of the datepicker.</p>
        </Example>

        <Example :component="ExHeader" :code="ExHeaderCode" title="Header" vertical>
            <p>You can add your custom header to the datepicker.</p>
        </Example>

        <Example :component="ExTrigger" :code="ExTriggerCode" title="Trigger" vertical>
            <p>You can add your custom trigger component/s to the datepicker.</p>
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.9.0</span>
            </div>
            <b-message type="is-warning">
                You should disable the default <code>mobile-native</code> in order to avoid a different UI on mobile
            </b-message>
        </Example>

        <Example :component="ExMonth" :code="ExMonthCode" title="Month picker" vertical>
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.7.7</span>
            </div>
        </Example>

        <Example :component="ExProgrammatically" :code="ExProgrammaticallyCode" title="Programmatically opening" vertical>
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.7.7</span>
            </div>
        </Example>

        <Example :component="ExInline" :code="ExInlineCode" title="Inline" vertical>
            <p>Datepicker can also be shown inline with the <code>inline</code> prop, input is removed, set a <code>v-model</code> to get the date.</p>
        </Example>

        <Example :component="ExUnselectable" :code="ExUnselectableCode" title="Unselectable" vertical>
            <p>
                Datepicker can have certain dates be unselectable with the <code>unselectable-dates</code> and <code>unselectable-days-of-week</code> props.
            </p>
        </Example>

        <Example :component="ExEvents" :code="ExEventsCode" title="Events" vertical>
            <p>Dates can be passed to the datepicker with the <code>events</code> prop and shown with indicators.</p>
        </Example>

        <Example :component="ExRangeInput" :code="ExRangeInputCode" title="Select a range of dates" vertical>
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.8.2</span>
            </div>
            <p>Dates selected can be within a range.</p>
        </Example>

        <Example :component="ExMultipleInput" :code="ExMultipleInputCode" title="Select multiple dates" vertical>
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.8.6</span>
            </div>
            <p>Multiple dates can be selected and don't have to be contiguous.</p>
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/datepicker'
    import variables from './variables/datepicker'
    import { shallowFields } from '@/utils'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExEditable from './examples/ExEditable'
    import ExEditableCode from './examples/ExEditable.vue?raw'

    import ExRange from './examples/ExRange'
    import ExRangeCode from './examples/ExRange.vue?raw'

    import ExFooter from './examples/ExFooter'
    import ExFooterCode from './examples/ExFooter.vue?raw'

    import ExHeader from './examples/ExHeader'
    import ExHeaderCode from './examples/ExHeader.vue?raw'

    import ExProgrammatically from './examples/ExProgrammatically'
    import ExProgrammaticallyCode from './examples/ExProgrammatically.vue?raw'

    import ExTrigger from './examples/ExTrigger'
    import ExTriggerCode from './examples/ExTrigger.vue?raw'

    import ExMonth from './examples/ExMonth'
    import ExMonthCode from './examples/ExMonth.vue?raw'

    import ExInline from './examples/ExInline'
    import ExInlineCode from './examples/ExInline.vue?raw'

    import ExUnselectable from './examples/ExUnselectable'
    import ExUnselectableCode from './examples/ExUnselectable.vue?raw'

    import ExEvents from './examples/ExEvents'
    import ExEventsCode from './examples/ExEvents.vue?raw'

    import ExRangeInput from './examples/ExRangeInput'
    import ExRangeInputCode from './examples/ExRangeInput.vue?raw'

    import ExMultipleInput from './examples/ExMultipleInput'
    import ExMultipleInputCode from './examples/ExMultipleInput.vue?raw'

    export default {
        data() {
            return {
                api,
                variables,
                ...shallowFields({
                    ExSimple,
                    ExEditable,
                    ExRange,
                    ExFooter,
                    ExHeader,
                    ExProgrammatically,
                    ExTrigger,
                    ExInline,
                    ExUnselectable,
                    ExEvents,
                    ExMonth,
                    ExRangeInput,
                    ExMultipleInput,
                }),
                ExSimpleCode,
                ExEditableCode,
                ExRangeCode,
                ExFooterCode,
                ExHeaderCode,
                ExProgrammaticallyCode,
                ExTriggerCode,
                ExInlineCode,
                ExUnselectableCode,
                ExEventsCode,
                ExMonthCode,
                ExRangeInputCode,
                ExMultipleInputCode
            }
        }
    }
</script>
