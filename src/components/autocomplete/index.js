import Autocomplete from './Autocomplete'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Autocomplete)
    }
}

use(Plugin)

export default Plugin

export {
    Autocomplete as BAutocomplete
}
