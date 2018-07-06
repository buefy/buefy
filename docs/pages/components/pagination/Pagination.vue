<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/pagination'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode
            }
        }
    }
</script>
