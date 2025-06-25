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

<script lang="ts">
    import { defineComponent } from 'vue'

    import { shallowFields } from '@/utils'
    import ApiView from '@/components/ApiView.vue'
    import Example from '@/components/Example.vue'
    import VariablesView from '@/components/VariablesView.vue'

    import api from './api/radio'
    import variables from './variables/radio'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExSizes from './examples/ExSizes.vue'
    import ExSizesCode from './examples/ExSizes.vue?raw'

    import ExTypes from './examples/ExTypes.vue'
    import ExTypesCode from './examples/ExTypes.vue?raw'

    import ExRadioButton from './examples/ExRadioButton.vue'
    import ExRadioButtonCode from './examples/ExRadioButton.vue?raw'

    export default defineComponent({
        components: {
            ApiView,
            Example,
            VariablesView
        },
        data() {
            return {
                api,
                variables,
                ...shallowFields({
                    ExSimple,
                    ExSizes,
                    ExTypes,
                    ExRadioButton
                }),
                ExSimpleCode,
                ExSizesCode,
                ExTypesCode,
                ExRadioButtonCode
            }
        }
    })
</script>
