<template>
    <div class="container">
        <h1 class="title is-spaced">Radio</h1>
        <h2 class="subtitle">Select an option from a set</h2>
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
        <h2 class="title">Radio Button</h2>
        <p class="content">You have to wrap them on a <router-link to="/documentation/field">Field</router-link>.</p>
        <div class="example">
            <ex-radio-button></ex-radio-button>
        </div>
        <code-view :code="ExRadioButtonCode" bordered></code-view>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExRadioButton from './examples/ExRadioButton'
    import ExRadioButtonCode from '!!raw-loader!./examples/ExRadioButton'

    export default {
        components: {
            ExSimple,
            ExRadioButton
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExRadioButtonCode
            }
        }
    }
</script>
