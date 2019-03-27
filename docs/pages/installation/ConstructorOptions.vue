<template>
    <div>
        <div class="example is-paddingless">
            <CodeView :code="usage | pre" lang="javascript" expanded/>
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
                usage: `
                Vue.use(Buefy, {
                    defaultIconPack: 'fas',
                    defaultContainerElement: '#content',
                    // ...
                })`
            }
        }
    }
</script>
