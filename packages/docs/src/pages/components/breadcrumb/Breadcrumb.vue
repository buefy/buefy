<template>
    <section>
        <Example
            :component="ExAlignments"
            :code="ExAlignmentsCode"
            title="Alignments"
        />

        <Example
            :component="ExSeparators"
            :code="ExSeparatorsCode"
            title="Separators"
        />

        <Example
            :component="ExSizes"
            :code="ExSizesCode"
            title="Sizes"
        />

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { shallowFields } from '@/utils'
import ApiView from '@/components/ApiView.vue'
import Example from '@/components/Example.vue'
import VariablesView from '@/components/VariablesView.vue'

import api from './api/breadcrumb'
import variables from './variables/breadcrumb'

import ExAlignments from './examples/ExAlignments.vue'
import ExAlignmentsCode from './examples/ExAlignments.vue?raw'

import ExSeparators from './examples/ExSeparators.vue'
import ExSeparatorsCode from './examples/ExSeparators.vue?raw'

import ExSizes from './examples/ExSizes.vue'
import ExSizesCode from './examples/ExSizes.vue?raw'

export default defineComponent({

    name: 'Breadcrumb',

    components: {
        ApiView,
        Example,
        VariablesView
    },

    data () {
        return {
            api,
            variables,
            ...shallowFields({
                ExAlignments,
                ExSeparators,
                ExSizes
            }),
            ExAlignmentsCode,
            ExSeparatorsCode,
            ExSizesCode,
        }
    }
})
</script>

<style lang="css" scoped>
</style>
