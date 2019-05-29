<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExEditable" :code="ExEditableCode" title="Editable (non readonly)" vertical>
            <p>Use <code>editable</code> prop to let the user type a date.</p>
            <b-message type="is-warning" has-icon>
                Note that the default date parser is
                <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/parse" target="_blank">Date.parse()</a>
                and it only works for <b>mm-dd-yyyy</b> format. If your locale is different, you have to pass a custom one with
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

        <Example :component="ExMonth" :code="ExMonthCode" title="Month picker" vertical>
            <div class="tags has-addons">
                <span class="tag is-success">New!</span>
                <span class="tag is-info">0.7.7</span>
            </div>
        </Example>

        <Example :component="ExProgrammatically" :code="ExProgrammaticallyCode" title="Programmatically opening" vertical>
            <div class="tags has-addons">
                <span class="tag is-success">New!</span>
                <span class="tag is-info">0.7.7</span>
            </div>
        </Example>

        <Example :component="ExInline" :code="ExInlineCode" title="Inline" vertical>
            <p>Datepicker can also be shown inline with the <code>inline</code> prop, input is removed, set a <code>v-model</code> to get the date.</p>
        </Example>

        <Example :component="ExEvents" :code="ExEventsCode" title="Events" vertical>
            <p>Dates can be passed to the datepicker with the <code>events</code> prop and shown with indicators.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/datepicker'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExEditable from './examples/ExEditable'
    import ExEditableCode from '!!raw-loader!./examples/ExEditable'

    import ExRange from './examples/ExRange'
    import ExRangeCode from '!!raw-loader!./examples/ExRange'

    import ExFooter from './examples/ExFooter'
    import ExFooterCode from '!!raw-loader!./examples/ExFooter'

    import ExHeader from './examples/ExHeader'
    import ExHeaderCode from '!!raw-loader!./examples/ExHeader'

    import ExProgrammatically from './examples/ExProgrammatically'
    import ExProgrammaticallyCode from '!!raw-loader!./examples/ExProgrammatically'

    import ExMonth from './examples/ExMonth'
    import ExMonthCode from '!!raw-loader!./examples/ExMonth'

    import ExInline from './examples/ExInline'
    import ExInlineCode from '!!raw-loader!./examples/ExInline'

    import ExEvents from './examples/ExEvents'
    import ExEventsCode from '!!raw-loader!./examples/ExEvents'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode,
                ExEditable,
                ExEditableCode,
                ExRange,
                ExRangeCode,
                ExFooter,
                ExFooterCode,
                ExHeader,
                ExHeaderCode,
                ExProgrammatically,
                ExProgrammaticallyCode,
                ExInline,
                ExInlineCode,
                ExEvents,
                ExEventsCode,
                ExMonth,
                ExMonthCode
            }
        }
    }
</script>
