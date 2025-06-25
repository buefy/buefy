import { defineComponent } from 'vue'
import type { StyleValue } from 'vue'

import config from './config'

export default defineComponent({
    inheritAttrs: false,
    props: {
        compatFallthrough: {
            type: Boolean,
            default: () => config.defaultCompatFallthrough
        }
    },
    computed: {
        rootAttrs() {
            return this.compatFallthrough
                ? {
                    class: this.$attrs.class,
                    style: this.$attrs.style as StyleValue,
                    id: this.$attrs.id as string | undefined
                }
                : {}
        },
        fallthroughAttrs() {
            if (this.compatFallthrough) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { style: _1, class: _2, id: _3, ...rest } = this.$attrs
                return rest
            } else {
                return this.$attrs
            }
        }
    }
})
