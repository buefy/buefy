<template>
    <div class="container">
        <h1 class="title is-spaced">Datepicker</h1>
        <h2 class="subtitle">An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <ex-simple></ex-simple>
            </div>
            <div class="column">
                <code-view :code="ExSimpleCode"></code-view>
            </div>
        </div>

        <hr>
        <h2 class="title">Non read-only</h2>
        <p class="content">Use <code>:readonly="false"</code> to let the user type a date.</p>
        <b-message type="is-warning" has-icon>
            Note that the default date parser is
            <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/parse" target="_blank">Date.parse()</a>
            and it only works for <b>mm-dd-yyyy</b> format. If your locale is different, you have to pass a custom one with
            <code>date-parser</code> prop, or by setting a <router-link to="/documentation/constructor-options">constructor option</router-link>.
        </b-message>
        <div class="columns">
            <div class="column">
                <ex-non-readonly></ex-non-readonly>
            </div>
            <div class="column">
                <code-view :code="ExNonReadonlyCode"></code-view>
            </div>
        </div>

        <hr>
        <h2 class="title">Range</h2>
        <p class="content">You can limit the date range with <code>min-date</code> and <code>max-date</code> props.</p>
        <div class="columns">
            <div class="column">
                <ex-range></ex-range>
            </div>
            <div class="column">
                <code-view :code="ExRangeCode"></code-view>
            </div>
        </div>

        <hr>
        <h2 class="title">Footer</h2>
        <p class="content">Any slots are added to the footer of the datepicker.</p>

        <div class="columns">
            <div class="column">
                <ex-footer></ex-footer>
            </div>
            <div class="column">
                <code-view :code="ExFooterCode"></code-view>
            </div>
        </div>

        <hr>
        <h2 class="title">Inline</h2>
        <p class="content">Datepicker can also be shown inline with the <code>inline</code> prop, input is removed, set a <code>v-model</code> to get the date.</p>
        <div class="columns">
            <div class="column">
                <ex-inline></ex-inline>
            </div>
            <div class="column">
                <code-view :code="ExInlineCode"></code-view>
            </div>
        </div>

        <hr>
        <h2 class="title">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

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
        components: {
            ExSimple,
            ExNonReadonly,
            ExRange,
            ExFooter,
            ExInline
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExNonReadonlyCode,
                ExRangeCode,
                ExFooterCode,
                ExInlineCode
            }
        }
    }
</script>
