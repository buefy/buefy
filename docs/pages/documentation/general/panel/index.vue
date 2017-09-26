<template>
    <div class="container">
        <b-message type="is-danger">
            This component has been <strong>deprecated</strong> and will be deleted soon.
            You should use the <router-link to="/documentation/collapse">new collapse component</router-link> instead.
        </b-message>

        <h1 class="title is-spaced">Panel</h1>
        <h2 class="subtitle">A simple and collapsible panel</h2>
        <hr>

        <div class="example">
            <ex-simple></ex-simple>
        </div>
        <code-view :code="ExSimpleCode" bordered></code-view>

        <hr>

        <div class="example">
            <ex-custom-template></ex-custom-template>
        </div>
        <code-view :code="ExCustomTemplateCode" bordered></code-view>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExCustomTemplate from './examples/ExCustomTemplate'
    import ExCustomTemplateCode from '!!raw-loader!./examples/ExCustomTemplate'

    export default {
        components: {
            ExSimple,
            ExCustomTemplate
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExCustomTemplateCode
            }
        }
    }
</script>
