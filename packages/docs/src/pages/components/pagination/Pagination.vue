<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <Example :component="ExSlot" :code="ExSlotCode" title="Custom pagination buttons">
            <p>You can customize the buttons using <b><code>b-pagination-button</code></b> as scoped slot.</p>
            <p>For example, you can customize the inner text or use <code>router-link</code> as tag.</p>
            <b-message type="is-warning" has-icon>
                You have to switch <code>tag</code> between <code>router-link</code> and <code>a</code>, or whichever tag you specify to <code>router-link</code>, according to <code>page.disabled</code> flag in the scoped slot props to prevent navigation to disabled or non-existing pages.
            </b-message>
        </Example>

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

    import api from './api/pagination'
    import variables from './variables/pagination'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExSlot from './examples/ExSlot.vue'
    import ExSlotCode from './examples/ExSlot.vue?raw'

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
                    ExSlot
                }),
                ExSimpleCode,
                ExSlotCode
            }
        }
    })
</script>
