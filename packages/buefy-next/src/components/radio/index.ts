import type { App } from 'vue'
import Radio from './Radio.vue'
import RadioButton from './RadioButton.vue'
import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Radio)
        registerComponent(Vue, RadioButton)
    }
}

export default Plugin

export {
    Radio as BRadio,
    RadioButton as BRadioButton
}
