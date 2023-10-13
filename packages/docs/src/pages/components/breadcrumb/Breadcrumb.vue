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

<script>
import api from './api/breadcrumb'
import variables from './variables/breadcrumb'
import { shallowFields } from '@/utils'

import ExAlignments from './examples/ExAlignments'
import ExAlignmentsCode from './examples/ExAlignments.vue?raw'

import ExSeparators from './examples/ExSeparators'
import ExSeparatorsCode from './examples/ExSeparators.vue?raw'

import ExSizes from './examples/ExSizes'
import ExSizesCode from './examples/ExSizes.vue?raw'

export default {

    name: 'Breadcrumb',

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
}
</script>

<style lang="css" scoped>
</style>
