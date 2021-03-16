import { isVueComponent, getSlot } from './helpers'
import {h as createElement} from 'vue-demi'

export default {
    name: 'BSlotComponent',
    props: {
        component: {
            type: Object,
            required: true
        },
        name: {
            type: String,
            default: 'default'
        },
        scoped: {
            type: Boolean
        },
        props: {
            type: Object
        },
        tag: {
            type: String,
            default: 'div'
        },
        event: {
            type: String,
            default: 'hook:updated'
        }
    },
    methods: {
        refresh() {
            this.$forceUpdate()
        }
    },
    created() {
        if (isVueComponent(this.component)) {
            this.component.$on(this.event, this.refresh)
        }
    },
    beforeDestroy() {
        if (isVueComponent(this.component)) {
            this.component.$off(this.event, this.refresh)
        }
    },
    render() {
        if (isVueComponent(this.component)) {
            const scopedSlots = this.component.scoped
                ? (this.component.$scopedSlots | this.component.$slots)
                : this.component.$slots

            return createElement(this.tag, {}, getSlot(scopedSlots, this.name, this.props)
            )
        }
    }
}
