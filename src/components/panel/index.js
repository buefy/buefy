import Panel from './Panel'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Panel)
    }
}

use(Plugin)

export default Plugin
