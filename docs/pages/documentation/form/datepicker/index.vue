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
                <pre v-highlight><code class="html">{{ ExSimpleCode }}</code></pre>
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
                <pre v-highlight><code class="html">{{ ExRangeCode }}</code></pre>
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
                <pre v-highlight><code class="html">{{ ExFooterCode }}</code></pre>
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
                <pre v-highlight><code class="html">{{ ExInlineCode }}</code></pre>
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

    import ExRange from './examples/ExRange'
    import ExRangeCode from '!!raw-loader!./examples/ExRange'

    import ExFooter from './examples/ExFooter'
    import ExFooterCode from '!!raw-loader!./examples/ExFooter'

    import ExInline from './examples/ExInline'
    import ExInlineCode from '!!raw-loader!./examples/ExInline'

    export default {
        components: {
            ExSimple,
            ExRange,
            ExFooter,
            ExInline
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExRangeCode,
                ExFooterCode,
                ExInlineCode
            }
        }
    }
</script>
