<template>
    <div class="container">
        <h1 class="title is-spaced">Select</h1>
        <h2 class="subtitle">
            Select an item in a dropdown list.
            Use with <strong><router-link to="/documentation/field">Field</router-link></strong> to access all functionalities
        </h2>
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
        <h2 class="title is-spaced">Multiple</h2>
        <div class="columns">
            <div class="column">
                <ex-multiple></ex-multiple>
            </div>
            <div class="column">
                <CodeView :code="ExMultipleCode" />
            </div>
        </div>

        <hr>
        <h2 class="title">Icons</h2>
        <div class="columns">
            <div class="column">
                <ex-icons></ex-icons>
            </div>
            <div class="column">
                <CodeView :code="ExIconsCode" />
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
    import api from '@/apis/apiSelect'

    import ExSimple from '@/examples/select/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/select/ExSimple'

    import ExMultiple from '@/examples/select/ExMultiple'
    import ExMultipleCode from '!!raw-loader!@/examples/select/ExMultiple'

    import ExIcons from '@/examples/select/ExIcons'
    import ExIconsCode from '!!raw-loader!@/examples/select/ExIcons'

    import ExSizes from '@/examples/select/ExSizes'
    import ExSizesCode from '!!raw-loader!@/examples/select/ExSizes'

    export default {
        components: {
            ExSimple,
            ExMultiple,
            ExIcons,
            ExSizes
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExMultipleCode,
                ExIconsCode,
                ExSizesCode
            }
        }
    }
</script>
