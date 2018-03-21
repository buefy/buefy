import Vue from 'vue'

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
        tag: {
            type: String,
            default: 'div'
        },
        event: {
            type: String,
            default: 'updated'
        }
    },
    methods: {
        refresh() {
            this.$forceUpdate()
        },
        isVueComponent() {
            return this.component instanceof Vue
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
    render(h) {
        if (this.isVueComponent()) {
            const slots = this.component.$slots[this.name]
            return h(this.tag, {}, slots)
        }
    }
}
