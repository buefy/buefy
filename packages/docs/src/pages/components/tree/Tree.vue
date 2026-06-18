<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" title="Basic usage" vertical />

        <Example
            :component="ExFieldMapping"
            :code="ExFieldMappingCode"
            title="Custom field mapping"
            vertical
        />

        <Example
            :component="ExCheckbox"
            :code="ExCheckboxCode"
            title="Checkbox selection with tri-state"
            vertical
        />

        <Example
            :component="ExLazyLoad"
            :code="ExLazyLoadCode"
            title="Lazy (async) child loading"
            vertical
        />

        <Example
            :component="ExCustomNode"
            :code="ExCustomNodeCode"
            title="Custom node slot"
            vertical
        />

        <ApiView :data="api" />
        <VariablesView :data="variables" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { shallowFields } from '@/utils'
import ApiView from '@/components/ApiView.vue'
import Example from '@/components/Example.vue'
import VariablesView from '@/components/VariablesView.vue'

import api from './api/tree'
import variables from './variables/tree'

import ExSimple from './examples/ExSimple.vue'
import ExSimpleCode from './examples/ExSimple.vue?raw'
import ExFieldMapping from './examples/ExFieldMapping.vue'
import ExFieldMappingCode from './examples/ExFieldMapping.vue?raw'
import ExCheckbox from './examples/ExCheckbox.vue'
import ExCheckboxCode from './examples/ExCheckbox.vue?raw'
import ExLazyLoad from './examples/ExLazyLoad.vue'
import ExLazyLoadCode from './examples/ExLazyLoad.vue?raw'
import ExCustomNode from './examples/ExCustomNode.vue'
import ExCustomNodeCode from './examples/ExCustomNode.vue?raw'

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
                ExFieldMapping,
                ExCheckbox,
                ExLazyLoad,
                ExCustomNode
            }),
            ExSimpleCode,
            ExFieldMappingCode,
            ExCheckboxCode,
            ExLazyLoadCode,
            ExCustomNodeCode
        }
    }
})
</script>
