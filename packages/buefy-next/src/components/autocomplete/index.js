import Autocomplete from './Autocomplete.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Autocomplete)
    }
}

export default Plugin

export {
    Autocomplete as BAutocomplete
}
