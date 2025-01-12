import type { App } from 'vue'
import Autocomplete from './Autocomplete.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Autocomplete)
    }
}

export default Plugin

export {
    Autocomplete as BAutocomplete
}
