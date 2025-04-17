import { defineComponent, h as createElement } from 'vue'

export default defineComponent({
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
        }
    },
    methods: {
        refresh() {
            this.$forceUpdate()
        }
    },
    render() {
        return createElement(this.tag, {},
            this.component.$slots
                ? this.scoped
                    ? this.component.$slots[this.name](this.props)
                    : this.component.$slots[this.name]()
                : undefined)
    }
})
