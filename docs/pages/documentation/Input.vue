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
                <CodeView :code="ExSimpleCode" />
            </div>
        </div>

        <hr>
        <h2 class="title">Types and states</h2>
        <div class="columns">
            <div class="column">
                <ex-types-states></ex-types-states>
            </div>
            <div class="column">
                <CodeView :code="ExTypesStatesCode" />
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
        <h2 class="title is-spaced">Validation</h2>
        <h3 class="subtitle">Automatic HTML5 validation on-blur</h3>
        <div class="columns">
            <div class="column">
                <ex-validation></ex-validation>
            </div>
            <div class="column">
                <CodeView :code="ExValidationCode" />
            </div>
        </div>

        <hr>
        <h2 class="title">Password</h2>
        <p class="content">You can use the <code>password-reveal</code> prop to add a button that reveals password</p>
        <div class="columns">
            <div class="column">
                <ex-password></ex-password>
            </div>
            <div class="column">
                <CodeView :code="ExPasswordCode" />
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
    import api from '@/apis/apiInput'

    import ExSimple from '@/examples/input/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/input/ExSimple'

    import ExTypesStates from '@/examples/input/ExTypesStates'
    import ExTypesStatesCode from '!!raw-loader!@/examples/input/ExTypesStates'

    import ExIcons from '@/examples/input/ExIcons'
    import ExIconsCode from '!!raw-loader!@/examples/input/ExIcons'

    import ExValidation from '@/examples/input/ExValidation'
    import ExValidationCode from '!!raw-loader!@/examples/input/ExValidation'

    import ExPassword from '@/examples/input/ExPassword'
    import ExPasswordCode from '!!raw-loader!@/examples/input/ExPassword'

    import ExSizes from '@/examples/input/ExSizes'
    import ExSizesCode from '!!raw-loader!@/examples/input/ExSizes'

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
