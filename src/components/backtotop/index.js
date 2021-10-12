import Backtotop from './Backtotop'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Backtotop)
    }
}

use(Plugin)

export default Plugin

export {
    Backtotop as BBacktotop
}
