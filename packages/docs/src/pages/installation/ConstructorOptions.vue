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

<script>
    import { preformat } from '@/utils'
    import api from './api/constructor-options'

    export default {
        data() {
            return {
                api,
                usageBundle: `
                Vue.use(Buefy, {
                    defaultIconPack: 'fas',
                    // ...
                })`,
                usageComponents: `
                import { ConfigProgrammatic, Table, Input } from 'buefy'

                Vue.use(Table)
                Vue.use(Input)
                ConfigProgrammatic.setOptions({
                    defaultIconPack: 'fas',
                    // ...
                })`,
                usageCdn: `
                // When using CDN, Buefy automatically attaches itself on Vue
                Vue.prototype.$buefy.config.setOptions({
                    defaultIconPack: 'fas',
                    // ...
                })
                `
            }
        },
        methods: { preformat }
    }
</script>
