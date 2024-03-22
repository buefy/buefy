import config from './config'

export default {
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
                    style: this.$attrs.style,
                    id: this.$attrs.id
                }
                : {}
        },
        fallthroughAttrs() {
            if (this.compatFallthrough) {
                const { style: _1, class: _2, id: _3, ...rest } = this.$attrs
                return rest
            } else {
                return this.$attrs
            }
        }
    }
}
