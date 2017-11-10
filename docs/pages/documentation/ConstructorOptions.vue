<template>
    <div>
        <h1 class="title is-spaced">Constructor options</h1>
        <h2 class="subtitle">These are global default options, which are set on Buefy initialization</h2>

        <hr>

        <div class="example is-paddingless">
            <CodeView :code="usage | pre" lang="javascript" />
        </div>

        <hr>

        <h3 class="subtitle">Options</h3>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiConstructorOptions'

    export default {
        data() {
            return {
                api,
                usage: `
                Vue.use(Buefy, {
                    defaultIconPack: 'fa',
                    defaultContainerElement: '#content',
                    // ...
                })`
            }
        }
    }
</script>
