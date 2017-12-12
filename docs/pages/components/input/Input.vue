<template>
    <div class="is-clipped">
        <h1 class="title is-spaced">Input</h1>
        <h2 class="subtitle">
            Get user Input.
            Use with <strong><router-link to="/documentation/field">Field</router-link></strong> to access all functionalities
        </h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <hr>
        <h2 class="title">Types and states</h2>
        <Example :component="ExTypesStates" :code="ExTypesStatesCode" vertical/>

        <hr>
        <h2 class="title">Icons</h2>
        <Example :component="ExIcons" :code="ExIconsCode" vertical/>

        <hr>
        <h2 class="title is-spaced">Validation</h2>
        <h3 class="subtitle">Automatic HTML5 validation on-blur</h3>
        <Example :component="ExValidation" :code="ExValidationCode" vertical/>

        <hr>
        <h2 class="title">Password</h2>
        <p class="content">You can use the <code>password-reveal</code> prop to add a button that reveals password</p>
        <Example :component="ExPassword" :code="ExPasswordCode" vertical/>

        <hr>
        <h2 class="title">Sizes</h2>
        <Example :component="ExSizes" :code="ExSizesCode" vertical/>

        <hr>
        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/Input'

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
        data() {
            return {
                api,
                ExSimple,
                ExTypesStates,
                ExIcons,
                ExValidation,
                ExPassword,
                ExSizes,
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
