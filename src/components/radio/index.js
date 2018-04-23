import Radio from './Radio'
import RadioButton from './RadioButton'

import { registerComponentsAsPlugin } from '../../utils/plugins'

registerComponentsAsPlugin([Radio, RadioButton])

export {
    Radio,
    RadioButton
}
