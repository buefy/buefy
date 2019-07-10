<template>
    <div>
        <p>test</p>

        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <Example :component="ExRange" :code="ExRangeCode"/>

        <ApiView :data="api"/>
    </div>

</template>

<script>
    import api from './api/slider'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'
    import ExRange from './examples/ExRange'
    import ExRangeCode from '!!raw-loader!./examples/ExRange'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode,
                ExRange,
                ExRangeCode
            }
        }
    }
</script>
