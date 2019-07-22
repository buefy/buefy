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
        },
        isVueComponent() {
            return this.component && this.component._isVue
        }
    },
    created() {
        if (this.isVueComponent()) {
            this.component.$on(this.event, this.refresh)
        }
    },
    beforeDestroy() {
        if (this.isVueComponent()) {
            this.component.$off(this.event, this.refresh)
        }
    },
    render(createElement) {
        if (this.isVueComponent()) {
            return createElement(this.tag, {},
                this.scoped ? this.component.$scopedSlots[this.name](this.props)
                    : this.component.$slots[this.name])
        }
    }
}
