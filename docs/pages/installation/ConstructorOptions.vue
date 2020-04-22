<template>
    <div>
        <div class="example is-paddingless">
            <CodeView title="Full bundle" :code="usageBundle | pre" lang="javascript" expanded/>
        </div>

        <div class="example is-paddingless">
            <CodeView title="Individual components" :code="usageComponents | pre" lang="javascript" expanded/>
        </div>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/constructor-options'

    export default {
        data() {
            return {
                api,
                usageBundle: `
                Vue.use(Buefy, {
                    defaultIconPack: 'fas',
                    defaultContainerElement: '#content',
                    // ...
                })`,
                usageComponents: `
                import { BuefyProgrammatic, Table, Input } from 'buefy'

                Vue.use(BuefyProgrammatic, {
                    defaultIconPack: 'fas',
                    defaultContainerElement: '#content',
                    // ...
                })
                Vue.use(Table)
                Vue.use(Input)`
            }
        }
    }
</script>
