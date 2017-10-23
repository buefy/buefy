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
        <h2 class="title is-spaced">Masks</h2>
        <h3 class="subtitle">
            Here we used <a href="https://nosir.github.io/cleave.js/" target="_blank">Cleave.js</a>
            to create a custom directive
        </h3>
        <div class="columns">
            <div class="column">
                <b-message type="is-info">
                    <strong>Cleave.js is not included in Buefy</strong>, you have to install it:
                    <code>npm install cleave.js</code>
                    <small class="content">
                        Refer to its <a href="https://github.com/nosir/cleave.js/blob/master/doc/options.md" target="_blank">documentation</a>
                        for more options details and examples.
                    </small>
                </b-message>
                <ex-mask></ex-mask>
            </div>
            <div class="column">
                <code-view :code="ExMaskCode"></code-view>
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

    import ExMask from './examples/ExMask'
    import ExMaskCode from '!!raw-loader!./examples/ExMask'

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
            ExMask,
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
                ExMaskCode,
                ExPasswordCode,
                ExSizesCode
            }
        }
    }
</script>
