import config, { setOptions } from './config'
import type { BuefyConfigOptions } from './config'
import { merge } from './helpers'
import { inject, type InjectionKey } from 'vue'

interface ConfigComponent {
    getOptions(): BuefyConfigOptions,
    setOptions(options: BuefyConfigOptions): void
}

export const configInjectionKey = Symbol('Buefy Config Component') as InjectionKey<ConfigComponent>

export function useConfigComponent() {
    return inject(configInjectionKey)
}

export default {
    getOptions() {
        return config
    },
    setOptions(options: BuefyConfigOptions) {
        setOptions(merge(config, options, true))
    }
} as ConfigComponent
