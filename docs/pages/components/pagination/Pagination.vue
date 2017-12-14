<template>
    <div class="default-container">
        <h1 class="title is-spaced">Pagination</h1>
        <h2 class="subtitle">A responsive and flexible pagination</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/pagination'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode
            }
        }
    }
</script>
