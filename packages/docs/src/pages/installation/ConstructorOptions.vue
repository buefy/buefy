<template>
    <div>
        <div class="block">
            <CodeView title="Full bundle" :code="preformat(usageBundle)" lang="javascript" expanded/>
        </div>

        <div class="block">
            <CodeView title="Individual components" :code="preformat(usageComponents)" lang="javascript" expanded/>
        </div>
        
         <div class="block">
            <CodeView title="CDN bundle" :code="preformat(usageCdn)" lang="javascript" expanded/>
         </div>

        <ApiView :data="api"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import ApiView from '@/components/ApiView.vue'
    import CodeView from '@/components/CodeView.vue'
    import { preformat } from '@/utils'

    import api from './api/constructor-options'
    import {
        usageBundle,
        usageCdn,
        usageComponents,
    } from './usage/constructor-options'

    export default defineComponent({
        components: {
            ApiView,
            CodeView
        },
        data() {
            return {
                api,
                usageBundle,
                usageComponents,
                usageCdn,
            }
        },
        methods: { preformat }
    })
</script>
