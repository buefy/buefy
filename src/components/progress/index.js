import Progress from './Progress'
import ProgressBar from './ProgressBar'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Progress)
        registerComponent(Vue, ProgressBar)
    }
}

use(Plugin)

export default Plugin

export {
    Progress as BProgress,
    ProgressBar as BProgressBar
}
