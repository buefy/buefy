<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExFull" :code="ExFullCode" title="Custom Rate"/>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import { shallowFields } from '@/utils'
    import ApiView from '@/components/ApiView.vue'
    import Example from '@/components/Example.vue'
    import VariablesView from '@/components/VariablesView.vue'

    import api from './api/rate'
    import variables from './variables/rate'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExFull from './examples/ExFull.vue'
    import ExFullCode from './examples/ExFull.vue?raw'

    export default defineComponent({
        components: {
            ApiView,
            Example,
            VariablesView
        },
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
    })
</script>
