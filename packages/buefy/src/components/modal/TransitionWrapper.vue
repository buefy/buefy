<template>
  <Modal
    :model-value="isShown"
    v-bind="modal"
    @after-leave="$emit('after-leave')"
    @cancel="isShown = false"
    @close="isShown = false"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import type { ExtractComponentProps } from '../../utils/helpers'
import Modal from './Modal.vue'

const TransitionWrapper = defineComponent({
  props: {
    modal: { required: true, type: Object },
  },
  components: {
    Modal,
  },
  emits: ['after-leave'],
  data() {
    return { isShown: false }
  },
  mounted() {
    this.isShown = true;
  },
})

export type TransitionWrapperProps = ExtractComponentProps<typeof TransitionWrapper>

export default TransitionWrapper
</script>
