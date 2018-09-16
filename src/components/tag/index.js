import Tag from './Tag'
import Taglist from './Taglist'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Tag)
        registerComponent(Vue, Taglist)
    }
}

use(Plugin)

export default Plugin

export {
    Tag,
    Taglist
}
