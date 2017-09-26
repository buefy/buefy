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
                <code-view :code="ExSimpleCode"></code-view>
            </div>
        </div>

        <hr>

        <h2 class="title">Types</h2>
        <div class="columns">
            <div class="column">
                <ex-types></ex-types>
            </div>
            <div class="column">
                <code-view :code="ExTypesCode"></code-view>
            </div>
        </div>

        <hr>

        <h2 class="title">Sizes</h2>
        <div class="columns">
            <div class="column">
                <ex-sizes></ex-sizes>
            </div>
            <div class="column">
                <code-view :code="ExSizesCode"></code-view>
            </div>
        </div>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

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
