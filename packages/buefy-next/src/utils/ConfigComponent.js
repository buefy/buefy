import config, { setOptions } from './config'
import { merge } from './helpers'

export default {
    getOptions() {
        return config
    },
    setOptions(options) {
        setOptions(merge(config, options, true))
    }
}
