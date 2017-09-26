<template>
    <div class="container">
        <h1 class="title is-spaced">Checkbox</h1>
        <h2 class="subtitle">Select a single or grouped options</h2>
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
        <h2 class="title">Grouped (Array)</h2>
        <p class="content">Just add the same <code>v-model</code> to multiple Checkboxes, and set a <code>native-value</code>.</p>
        <div class="columns">
            <div class="column">
                <ex-array></ex-array>
            </div>
            <div class="column">
                <code-view :code="ExArrayCode"></code-view>
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

    import ExArray from './examples/ExArray'
    import ExArrayCode from '!!raw-loader!./examples/ExArray'

    export default {
        components: {
            ExSimple,
            ExArray
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExArrayCode
            }
        }
    }
</script>
