<script>
export default {
    name: 'BSlotComponent',
    props: {
        component: Object,
        name: {
            type: String,
            default: () => 'default'
        },
        event: {
            type: String,
            default: () => 'updated'
        }
    },
    methods: {
        refresh() {
            this.$forceUpdate()
        }
    },
    created() {
        this.component.$on(this.event, this.refresh)
    },
    beforeDestroy() {
        this.component.$off(this.event, this.refresh)
    },
    render(h) {
        const slot = this.component.$slots[this.name][0]
        const tag = slot.tag
        return h(tag, slot.data, slot.children)
    }
}
</script>
