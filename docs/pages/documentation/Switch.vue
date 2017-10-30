<template>
    <div class="container">
        <h1 class="title is-spaced">Switch</h1>
        <h2 class="subtitle">Switch between two opposing states</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <ex-simple></ex-simple>
            </div>
            <div class="column">
                <CodeView :code="ExSimpleCode" />
            </div>
        </div>

        <hr>

        <h2 class="title">Types</h2>
        <div class="columns">
            <div class="column">
                <ex-types></ex-types>
            </div>
            <div class="column">
                <CodeView :code="ExTypesCode" />
            </div>
        </div>

        <hr>

        <h2 class="title">Sizes</h2>
        <div class="columns">
            <div class="column">
                <ex-sizes></ex-sizes>
            </div>
            <div class="column">
                <CodeView :code="ExSizesCode" />
            </div>
        </div>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiSwitch'

    import ExSimple from '@/examples/switch/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/switch/ExSimple'

    import ExTypes from '@/examples/switch/ExTypes'
    import ExTypesCode from '!!raw-loader!@/examples/switch/ExTypes'

    import ExSizes from '@/examples/switch/ExSizes'
    import ExSizesCode from '!!raw-loader!@/examples/switch/ExSizes'

    export default {
        components: {
            ExSimple,
            ExTypes,
            ExSizes
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExTypesCode,
                ExSizesCode
            }
        }
    }
</script>
