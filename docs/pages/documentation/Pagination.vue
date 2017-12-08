<template>
    <div class="container">
        <h1 class="title is-spaced">Pagination</h1>
        <h2 class="subtitle">A responsive and flexible pagination</h2>
        <hr>

        <div class="example">
            <ex-simple/>
        </div>
        <CodeView :code="ExSimpleCode" bordered />

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiPagination'

    import ExSimple from '@/examples/pagination/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/pagination/ExSimple'

    export default {
        components: {
            ExSimple
        },
        data() {
            return {
                api,
                ExSimpleCode
            }
        }
    }
</script>
