import config, { setOptions } from './config'
import type { BuefyConfigOptions } from './config'
import { merge } from './helpers'

export default {
    getOptions() {
        return config
    },
    setOptions(options: BuefyConfigOptions) {
        setOptions(merge(config, options, true))
    }
}
