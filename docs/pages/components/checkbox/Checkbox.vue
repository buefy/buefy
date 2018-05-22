<template>
    <div class="default-container">
        <h1 class="title is-spaced">Checkbox</h1>
        <h2 class="subtitle">Select a single or grouped options</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExArray" :code="ExArrayCode" title="Grouped (Array)" vertical>
            <p>Just add the same <code>v-model</code> to multiple Checkboxes, and set a <code>native-value</code>.</p>
        </Example>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types" vertical/>

        <Example :component="ExCheckboxButton" :code="ExCheckboxButtonCode" title="Checkbox Button">
            <p>You have to wrap them on a <router-link to="/documentation/field">Field</router-link>.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/checkbox'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExArray from './examples/ExArray'
    import ExArrayCode from '!!raw-loader!./examples/ExArray'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    import ExCheckboxButton from './examples/ExCheckboxButton'
    import ExCheckboxButtonCode from '!!raw-loader!./examples/ExCheckboxButton'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode,
                ExArray,
                ExArrayCode,
                ExSizes,
                ExSizesCode,
                ExTypes,
                ExTypesCode,
                ExCheckboxButton,
                ExCheckboxButtonCode
            }
        }
    }
</script>
