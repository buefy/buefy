export default {
    name: 'bOption',

    props: {
        value: [String, Number],
        label: String,
        group: String,
        separator: Boolean,
        icon: String,
        iconPack: String
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
        const hasLabel = (this.$slots.default !== undefined && this.$slots.default.length > 0) ||
            this.label

        this.option = {
            value: this.value,
            label: hasLabel ? this.label || this.$slots.default[0].text.trim() : this.value,
            disabled: this.disabled,
            group: this.group,
            separator: this.separator,
            icon: this.icon,
            iconPack: this.iconPack
        }
    },

    render(h) {
        return
    }
}
