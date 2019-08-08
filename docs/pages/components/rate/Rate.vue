<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExFull" :code="ExFullCode" title="Custom Icon and other"/>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/rate'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExFull from './examples/ExFull'
    import ExFullCode from '!!raw-loader!./examples/ExFull'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExFull,
                ExSimpleCode,
                ExFullCode
            }
        }
    }
</script>
