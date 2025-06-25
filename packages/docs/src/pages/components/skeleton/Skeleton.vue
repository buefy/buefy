<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExMediaTemplate" :code="ExMediaTemplateCode" title="Media" vertical/>

        <Example :component="ExCardTemplate" :code="ExCardTemplateCode" title="Card" vertical/>

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

    import api from './api/skeleton'
    import variables from './variables/skeleton'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExMediaTemplate from './examples/ExMediaTemplate.vue'
    import ExMediaTemplateCode from './examples/ExMediaTemplate.vue?raw'

    import ExCardTemplate from './examples/ExCardTemplate.vue'
    import ExCardTemplateCode from './examples/ExCardTemplate.vue?raw'

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
                    ExMediaTemplate,
                    ExCardTemplate
                }),
                ExSimpleCode,
                ExMediaTemplateCode,
                ExCardTemplateCode
            }
        }
    })
</script>
