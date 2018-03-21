<template>
    <div class="default-container">
        <h1 class="title is-spaced">Datepicker</h1>
        <h2 class="subtitle">An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExNonReadonly" :code="ExNonReadonlyCode" title="Non read-only" vertical>
            <p>Use <code>:readonly="false"</code> to let the user type a date.</p>
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
            <div class="tags has-addons">
                <span class="tag is-success">New!</span>
                <span class="tag is-info">0.6.4</span>
            </div>
            <p>You can add your custom header to the datepicker.</p>
        </Example>

        <Example :component="ExInline" :code="ExInlineCode" title="Inline" vertical>
            <p>Datepicker can also be shown inline with the <code>inline</code> prop, input is removed, set a <code>v-model</code> to get the date.</p>
        </Example>

        <Example :component="ExEvents" :code="ExEventsCode" title="Events" vertical>
            <div class="tags has-addons">
                <span class="tag is-success">New!</span>
                <span class="tag is-info">0.6.2</span>
            </div>
            <p>Dates can be passed to the datepicker with the <code>events</code> prop and shown with indicators.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/datepicker'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExNonReadonly from './examples/ExNonReadonly'
    import ExNonReadonlyCode from '!!raw-loader!./examples/ExNonReadonly'

    import ExRange from './examples/ExRange'
    import ExRangeCode from '!!raw-loader!./examples/ExRange'

    import ExFooter from './examples/ExFooter'
    import ExFooterCode from '!!raw-loader!./examples/ExFooter'

    import ExHeader from './examples/ExHeader'
    import ExHeaderCode from '!!raw-loader!./examples/ExHeader'

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
                ExNonReadonly,
                ExNonReadonlyCode,
                ExRange,
                ExRangeCode,
                ExFooter,
                ExFooterCode,
                ExHeader,
                ExHeaderCode,
                ExInline,
                ExInlineCode,
                ExEvents,
                ExEventsCode
            }
        }
    }
</script>
