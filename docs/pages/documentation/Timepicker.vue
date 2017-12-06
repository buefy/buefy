<template>
    <div class="container">
        <h1 class="title is-spaced">Timepicker</h1>
        <h2 class="subtitle">An input with a simple dropdown/modal for selecting a time, uses native timepicker for mobile</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <ex-simple></ex-simple>
            </div>
            <div class="column">
                <CodeView :code="ExSimpleCode" />
            </div>
        </div>

        <hr>
        <h2 class="title">Non read-only</h2>
        <p class="content">Use <code>:readonly="false"</code> to let the user type a time.</p>
        <div class="columns">
            <div class="column">
                <ex-non-readonly></ex-non-readonly>
            </div>
            <div class="column">
                <CodeView :code="ExNonReadonlyCode" />
            </div>
        </div>

        <hr>
        <h2 class="title">Range</h2>
        <p class="content">You can limit the date range with <code>min-time</code> and <code>max-time</code> props.</p>
        <div class="columns">
            <div class="column">
                <ex-range></ex-range>
            </div>
            <div class="column">
                <CodeView :code="ExRangeCode" />
            </div>
        </div>

        <hr>
        <h2 class="title">Footer</h2>
        <p class="content">Any slots are added to the footer of the timepicker.</p>

        <div class="columns">
            <div class="column">
                <ex-footer></ex-footer>
            </div>
            <div class="column">
                <CodeView :code="ExFooterCode" />
            </div>
        </div>

        <hr>
        <h2 class="title">Inline</h2>
        <p class="content">Timepicker can also be shown inline with the <code>inline</code> prop, input is removed, set a <code>v-model</code> to get the date.</p>
        <div class="columns">
            <div class="column">
                <ex-inline></ex-inline>
            </div>
            <div class="column">
                <CodeView :code="ExInlineCode" />
            </div>
        </div>

        <hr>
        <h2 class="title">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiTimepicker'

    import ExSimple from '@/examples/timepicker/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/timepicker/ExSimple'

    import ExNonReadonly from '@/examples/timepicker/ExNonReadonly'
    import ExNonReadonlyCode from '!!raw-loader!@/examples/timepicker/ExNonReadonly'

    import ExRange from '@/examples/timepicker/ExRange'
    import ExRangeCode from '!!raw-loader!@/examples/timepicker/ExRange'

    import ExFooter from '@/examples/timepicker/ExFooter'
    import ExFooterCode from '!!raw-loader!@/examples/timepicker/ExFooter'

    import ExInline from '@/examples/timepicker/ExInline'
    import ExInlineCode from '!!raw-loader!@/examples/timepicker/ExInline'

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
