<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types" vertical/>

        <Example :component="ExRadioButton" :code="ExRadioButtonCode" title="Radio Button">
            <p>You have to wrap them on a <router-link to="/documentation/field">Field</router-link>.</p>
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/radio'
    import variables from './variables/radio'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from './examples/ExSizes.vue?raw'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from './examples/ExTypes.vue?raw'

    import ExRadioButton from './examples/ExRadioButton'
    import ExRadioButtonCode from './examples/ExRadioButton.vue?raw'

    export default {
        data() {
            return {
                api,
                variables,
                ExSimple,
                ExSizes,
                ExTypes,
                ExRadioButton,
                ExSimpleCode,
                ExSizesCode,
                ExTypesCode,
                ExRadioButtonCode
            }
        }
    }
</script>
