import { isVueComponent } from './helpers'

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
    render(createElement) {
        if (isVueComponent(this.component)) {
            return createElement(this.tag, {},
                this.scoped ? this.component.$scopedSlots[this.name](this.props)
                    : this.component.$slots[this.name])
        }
    }
}
