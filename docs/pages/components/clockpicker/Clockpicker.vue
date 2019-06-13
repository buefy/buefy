<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExNonReadonly" :code="ExNonReadonlyCode" title="Non read-only" vertical>
            <p>Use <code>editable</code> to let the user type a time.</p>
        </Example>

        <Example :component="ExRange" :code="ExRangeCode" title="Range" vertical>
            <p>You can limit the time range with <code>min-time</code> and <code>max-time</code> props.</p>
        </Example>

        <Example :component="ExFooter" :code="ExFooterCode" title="Footer" vertical>
            <p>Any slots are added to the footer of the clockpicker.</p>
        </Example>

        <Example :component="ExColors" :code="ExColorsCode" title="Colors" vertical>
            <p>
                Clockpicker supports all <code>is-&lt;color&gt;</code> classes from Bulma, including custom colors added at build time.
                This can be specified in the <code>class</code> property or in the <code>type</code> property. 
                Inline display is also availble by specifying the <code>inline</code> prop.
            </p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/clockpicker'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExNonReadonly from './examples/ExNonReadonly'
    import ExNonReadonlyCode from '!!raw-loader!./examples/ExNonReadonly'

    import ExRange from './examples/ExRange'
    import ExRangeCode from '!!raw-loader!./examples/ExRange'

    import ExFooter from './examples/ExFooter'
    import ExFooterCode from '!!raw-loader!./examples/ExFooter'

    import ExColors from './examples/ExColors'
    import ExColorsCode from '!!raw-loader!./examples/ExColors'

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
                ExColors,
                ExColorsCode
            }
        }
    }
</script>
