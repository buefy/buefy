<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/menu'
    import variables from './variables/menu'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

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
