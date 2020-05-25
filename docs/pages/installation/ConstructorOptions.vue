<template>
    <div>
        <div class="block">
            <CodeView title="Full bundle" :code="usageBundle | pre" lang="javascript" expanded/>
        </div>

        <div class="block">
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
                import { ConfigProgrammatic, Table, Input } from 'buefy'

                Vue.use(Table)
                Vue.use(Input)
                ConfigProgrammatic.setOptions({
                    defaultIconPack: 'fas',
                    defaultContainerElement: '#content',
                    // ...
                })`
            }
        }
    }
</script>
