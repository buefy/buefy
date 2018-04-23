import Tag from './Tag'
import Taglist from './Taglist'

import { registerComponentsAsPlugin } from '../../utils/plugins'

registerComponentsAsPlugin([Tag, Taglist])

export {
    Tag,
    Taglist
}
