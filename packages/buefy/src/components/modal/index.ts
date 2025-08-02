import { ref } from 'vue'
import type { App, Ref } from 'vue'

import Modal from './Modal.vue'
import ModalOrchestrator from './ModalOrchestrator.vue'
import { PROVIDE_KEY } from './variables'
import type { ModalOpenParams } from './modal-open-params'

import { registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

class ModalProgrammatic {
    private modals: Ref<ModalOpenParams[]>

    constructor(app: App) {
        this.modals = ref([])
        app.provide(PROVIDE_KEY, this.modals)
    }

    open(params: ModalOpenParams | string) {
        if (typeof params === 'string') {
            params = {
                content: params
            }
        }

        let slot: ModalOpenParams['content']
        if (Array.isArray(params.content)) {
            slot = params.content
            delete params.content
        }
        const propsData = params

        this.modals.value.push(propsData)
    }
}

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Modal)
        registerComponent(Vue, ModalOrchestrator)
        registerComponentProgrammatic(Vue, 'modal', new ModalProgrammatic(Vue))
    }
}

export default Plugin

export {
    ModalProgrammatic,
    Modal as BModal,
    ModalOrchestrator as BModalOrchestrator
}
