import type { ModalProps } from './Modal.vue'
import type { ModalCancellableOption } from '../../utils/config'

export type ModalOpenParams = Omit<ModalProps, 'programmatic' | 'cancelCallback'> & {
  onCancel?: (method: ModalCancellableOption) => void
}
