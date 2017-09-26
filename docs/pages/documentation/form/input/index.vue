<template>
    <div class="container">
        <h1 class="title is-spaced">Input</h1>
        <h2 class="subtitle">
            Get user Input.
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
        <h2 class="title">Types and states</h2>
        <div class="columns">
            <div class="column">
                <ex-types-states></ex-types-states>
            </div>
            <div class="column">
                <code-view :code="ExTypesStatesCode"></code-view>
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
        <h2 class="title is-spaced">Validation</h2>
        <h3 class="subtitle">Automatic HTML5 validation on-blur</h3>
        <div class="columns">
            <div class="column">
                <ex-validation></ex-validation>
            </div>
            <div class="column">
                <code-view :code="ExValidationCode"></code-view>
            </div>
        </div>

        <hr>
        <h2 class="title">Password</h2>
        <div class="columns">
            <div class="column">
                <ex-password></ex-password>
            </div>
            <div class="column">
                <code-view :code="ExPasswordCode"></code-view>
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

    import ExTypesStates from './examples/ExTypesStates'
    import ExTypesStatesCode from '!!raw-loader!./examples/ExTypesStates'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from '!!raw-loader!./examples/ExIcons'

    import ExValidation from './examples/ExValidation'
    import ExValidationCode from '!!raw-loader!./examples/ExValidation'

    import ExPassword from './examples/ExPassword'
    import ExPasswordCode from '!!raw-loader!./examples/ExPassword'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    export default {
        components: {
            ExSimple,
            ExTypesStates,
            ExIcons,
            ExValidation,
            ExPassword,
            ExSizes
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExTypesStatesCode,
                ExIconsCode,
                ExValidationCode,
                ExPasswordCode,
                ExSizesCode
            }
        }
    }
</script>
