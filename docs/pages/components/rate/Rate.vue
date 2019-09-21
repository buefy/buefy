<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExFull" :code="ExFullCode" title="Custom Rate"/>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/rate'
    import variables from './variables/rate'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExFull from './examples/ExFull'
    import ExFullCode from '!!raw-loader!./examples/ExFull'

    export default {
        data() {
            return {
                api,
                variables,
                ExSimple,
                ExFull,
                ExSimpleCode,
                ExFullCode
            }
        }
    }
</script>
