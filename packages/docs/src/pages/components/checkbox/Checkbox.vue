<template>
    <div>
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
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/checkbox'
    import variables from './variables/checkbox'
    import { shallowFields } from '@/utils'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExArray from './examples/ExArray'
    import ExArrayCode from './examples/ExArray.vue?raw'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from './examples/ExSizes.vue?raw'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from './examples/ExTypes.vue?raw'

    import ExCheckboxButton from './examples/ExCheckboxButton'
    import ExCheckboxButtonCode from './examples/ExCheckboxButton.vue?raw'

    export default {
        data() {
            return {
                api,
                variables,
                ...shallowFields({
                    ExSimple,
                    ExArray,
                    ExSizes,
                    ExTypes,
                    ExCheckboxButton
                }),
                ExSimpleCode,
                ExArrayCode,
                ExSizesCode,
                ExTypesCode,
                ExCheckboxButtonCode
            }
        }
    }
</script>
