import Progress from './Progress'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Progress)
    }
}

use(Plugin)

export default Plugin

export {
    Progress as BProgress
}
