export default {
    name: 'bOption',

    props: {
        value: [String, Number],
        disabled: Boolean,
        subheader: Boolean
    },

    data() {
        return {
            option: {}
        }
    },

    mounted() {
        if (!this.$parent.isSelectComponent) {
            this.$destroy()
            throw new Error('You should wrap Option on a Select')
        }
        this.$parent.options.push(this.option)
    },

    created() {
        const hasLabel = this.$slots.default !== undefined && this.$slots.default.length > 0

        this.option = {
            value: this.value,
            label: hasLabel ? this.$slots.default[0].text : this.value,
            disabled: this.disabled,
            subheader: this.subheader
        }
    },

    render(h) {
        return
    }
}
