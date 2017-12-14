<template>
    <div class="default-container">
        <h1 class="title is-spaced">Notification</h1>
        <h2 class="subtitle">Bold notification blocks to alert your users of something</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types" vertical/>

        <Example :component="ExIcons" :code="ExIconsCode" title="Icons" vertical/>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/notification'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from '!!raw-loader!./examples/ExIcons'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExTypes,
                ExIcons,
                ExSimpleCode,
                ExTypesCode,
                ExIconsCode
            }
        }
    }
</script>
