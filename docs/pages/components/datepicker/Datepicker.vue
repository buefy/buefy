<template>
    <div class="is-clipped">
        <h1 class="title is-spaced">Datepicker</h1>
        <h2 class="subtitle">An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <hr>
        <h2 class="title">Non read-only</h2>
        <p class="content">Use <code>:readonly="false"</code> to let the user type a date.</p>
        <b-message type="is-warning" has-icon>
            Note that the default date parser is
            <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/parse" target="_blank">Date.parse()</a>
            and it only works for <b>mm-dd-yyyy</b> format. If your locale is different, you have to pass a custom one with
            <code>date-parser</code> prop, or by setting a <router-link to="/documentation/constructor-options">constructor option</router-link>.
        </b-message>

        <Example :component="ExNonReadonly" :code="ExNonReadonlyCode" vertical/>

        <hr>
        <h2 class="title">Range</h2>
        <p class="content">You can limit the date range with <code>min-date</code> and <code>max-date</code> props.</p>

        <Example :component="ExRange" :code="ExRangeCode" vertical/>

        <hr>
        <h2 class="title">Footer</h2>
        <p class="content">Any slots are added to the footer of the datepicker.</p>
        <Example :component="ExFooter" :code="ExFooterCode" vertical/>

        <hr>
        <h2 class="title">Inline</h2>
        <p class="content">Datepicker can also be shown inline with the <code>inline</code> prop, input is removed, set a <code>v-model</code> to get the date.</p>
        <Example :component="ExInline" :code="ExInlineCode" vertical/>

        <hr>

        <h2 class="title">Events</h2>
        <div class="tags has-addons">
            <span class="tag is-success">New!</span>
            <span class="tag is-info">0.6.2</span>
        </div>
        <p class="content">Dates can be passed to the datepicker with the <code>events</code> prop and shown with indicators.</p>
        <Example :component="ExEvents" :code="ExEventsCode" vertical/>

        <hr>

        <h2 class="title">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/Datepicker'

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
                ExInline,
                ExInlineCode,
                ExEvents,
                ExEventsCode
            }
        }
    }
</script>
