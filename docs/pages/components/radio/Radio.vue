<template>
    <div class="default-container">
        <h1 class="title is-spaced">Radio</h1>
        <h2 class="subtitle">Select an option from a set</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types" vertical/>

        <Example :component="ExRadioButton" :code="ExRadioButtonCode" title="Radio Button">
            <p>You have to wrap them on a <router-link to="/documentation/field">Field</router-link>.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/radio'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    import ExRadioButton from './examples/ExRadioButton'
    import ExRadioButtonCode from '!!raw-loader!./examples/ExRadioButton'

    export default {
        data() {
            return {
                api,
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
