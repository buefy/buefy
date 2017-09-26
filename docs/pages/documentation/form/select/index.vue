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
                <code-view :code="ExSimpleCode"></code-view>
            </div>
        </div>

        <hr>
        <h2 class="title is-spaced">Multiple</h2>
        <div class="tags has-addons">
            <span class="tag is-success">New!</span>
            <span class="tag is-info">0.5.1</span>
        </div>
        <div class="columns">
            <div class="column">
                <ex-multiple></ex-multiple>
            </div>
            <div class="column">
                <code-view :code="ExMultipleCode"></code-view>
            </div>
        </div>

        <hr>
        <h2 class="title">Icons</h2>
        <div class="columns">
            <div class="column">
                <ex-icons></ex-icons>
            </div>
            <div class="column">
                <code-view :code="ExIconsCode"></code-view>
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

    import ExMultiple from './examples/ExMultiple'
    import ExMultipleCode from '!!raw-loader!./examples/ExMultiple'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from '!!raw-loader!./examples/ExIcons'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

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
