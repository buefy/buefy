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
    import { shallowFields } from '@/utils'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExFull from './examples/ExFull'
    import ExFullCode from './examples/ExFull.vue?raw'

    export default {
        data() {
            return {
                api,
                variables,
                ...shallowFields({
                    ExSimple,
                    ExFull
                }),
                ExSimpleCode,
                ExFullCode
            }
        }
    }
</script>
