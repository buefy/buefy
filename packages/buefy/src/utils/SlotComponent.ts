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
            type: [String, Object],
            default: 'div'
        }
    },
    methods: {
        refresh() {
            this.$forceUpdate()
        }
    },
    render() {
        const slot = this.component.$slots?.[this.name]
        return createElement(this.tag, {},
            slot
                ? this.scoped
                    ? slot(this.props)
                    : slot()
                : undefined)
    }
})
