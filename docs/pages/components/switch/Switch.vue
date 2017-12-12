<template>
    <div class="is-clipped">
        <h1 class="title is-spaced">Switch</h1>
        <h2 class="subtitle">Switch between two opposing states</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <hr>

        <h2 class="title">Types</h2>
        <Example :component="ExTypes" :code="ExTypesCode" vertical/>

        <hr>

        <h2 class="title">Sizes</h2>
        <Example :component="ExSizes" :code="ExSizesCode" vertical/>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/switch'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExTypes,
                ExSizes,
                ExSimpleCode,
                ExTypesCode,
                ExSizesCode
            }
        }
    }
</script>
