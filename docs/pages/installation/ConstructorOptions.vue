<template>
    <div>
        <div class="example is-paddingless">
            <CodeView :code="usage | pre" lang="javascript" expanded/>
        </div>
        
        <b-message type="is-warning">
            If using components individually, set global options like this:<br>
            <code>import config from 'buefy/src/utils/config';</code><br>
            <code>config.defaultIconPack = 'fas'; // or any other constructor option</code>
        </b-message>

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
