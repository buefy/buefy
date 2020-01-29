<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode"/>


        <Example title="Vue Router">
            <p>To work with Vue Router properly, you will need to pass <code>parent</code> to each navbar item</p>
            <p>You can then safely wrap <code>b-navbar-item</code>s in <code>router-link</code> tags</p>
            <Example :component="ExRouter" :code="ExRouterCode"/>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>


<script>
    import api from './api/navbar'
    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'
    import ExRouter from './examples/ExRouter'
    import ExRouterCode from '!!raw-loader!./examples/ExRouter'
    
    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode,
                ExRouter,
                ExRouterCode
            }
        },
    }
</script>
