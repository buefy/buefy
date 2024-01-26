<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExMediaTemplate" :code="ExMediaTemplateCode" title="Media" vertical/>

        <Example :component="ExCardTemplate" :code="ExCardTemplateCode" title="Card" vertical/>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/skeleton'
    import variables from './variables/skeleton'
    import { shallowFields } from '@/utils'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExMediaTemplate from './examples/ExMediaTemplate'
    import ExMediaTemplateCode from './examples/ExMediaTemplate.vue?raw'

    import ExCardTemplate from './examples/ExCardTemplate'
    import ExCardTemplateCode from './examples/ExCardTemplate.vue?raw'

    export default {
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
    }
</script>
