import Numberinput from './Numberinput'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Numberinput)
    }
}

use(Plugin)

export default Plugin

export {
    Numberinput as BNumberinput
}
