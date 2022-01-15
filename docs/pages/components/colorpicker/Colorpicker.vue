<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>
    </div>
</template>

<script>
    import api from './api/colorpicker'
    import variables from './variables/colorpicker'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    export default {
        data() {
            return {
                api,
                variables,

                ExSimple,
                ExSimpleCode
            }
        }
    }
</script>