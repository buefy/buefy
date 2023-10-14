<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <Example :component="ExStatic" :code="ExStaticCode" title="Static"/>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>


<script>
    import api from './api/sidebar'
    import variables from './variables/sidebar'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'
    import ExStatic from './examples/ExStatic'
    import ExStaticCode from './examples/ExStatic.vue?raw'
    
    export default {
        data() {
            return {
                api,
                variables,
                ExSimple,
                ExSimpleCode,
                ExStatic,
                ExStaticCode
            }
        },
    }
</script>
