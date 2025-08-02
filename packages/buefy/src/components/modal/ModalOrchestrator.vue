<template>
    <TransitionWrapper
        v-for="(modal, index) in modals"
        :key="index"
        :modal="modal"
        @after-leave="modals.splice(index, 1)"
    />
</template>
  
<script lang="ts">
import { defineComponent, inject } from 'vue'
import type { Ref } from 'vue'

import { PROVIDE_KEY } from './variables'
import TransitionWrapper from './TransitionWrapper.vue'
import type { ExtractComponentProps } from '../../utils/helpers'
import type { ModalOpenParams } from './modal-open-params'

const ModalOrchestrator = defineComponent({
    name: 'BModalOrchestrator',
    components: {
        TransitionWrapper,
    },
    setup() {
        const modals = inject<Ref<ModalOpenParams[]>>(PROVIDE_KEY)!
        return { modals }
    }
})

export type ModalOrchestratorProps = ExtractComponentProps<typeof ModalOrchestrator>

export default ModalOrchestrator
</script>
