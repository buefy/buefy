<template>
    <div class="default-container">
        <h1 class="title is-spaced">Input</h1>
        <h2 class="subtitle">
            Get user Input.
            Use with <strong><router-link to="/documentation/field">Field</router-link></strong> to access all functionalities
        </h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExTypesStates" :code="ExTypesStatesCode" title="Types and states" vertical/>

        <Example :component="ExIcons" :code="ExIconsCode" title="Icons" vertical/>

        <Example :component="ExValidation" :code="ExValidationCode" title="Validation" vertical>
            <p>Automatic HTML5 validation on-blur.</p>
        </Example>

        <Example :component="ExPassword" :code="ExPasswordCode" title="Password" vertical>
            <p>You can use the <code>password-reveal</code> prop to add a button that reveals password.</p>
        </Example>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/input'

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
