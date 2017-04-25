export default {
    name: 'bOption',
    props: {
        value: [String, Number],
        label: String,
        group: String,
        separator: Boolean,
        disabled: Boolean,
        subheader: Boolean,
        icon: String,
        iconPack: String
    },
    data() {
        return {
            option: {}
        }
    },
    computed: {
        hasLabel() {
            return (this.$slots.default !== undefined && this.$slots.default.length > 0) || this.label
        }
    },
    created() {
        this.option = {
            uid: this._uid,
            value: this.value,
            label: this.hasLabel ? this.label || this.$slots.default[0].text.trim() : this.value,
            group: this.group,
            separator: this.separator,
            disabled: this.disabled,
            subheader: this.subheader,
            icon: this.icon,
            iconPack: this.iconPack
        }

        if (!this.$parent.isSelectComponent && !this.$parent.isDropdownComponent) {
            this.$destroy()
            throw new Error('You should wrap Option on a Select or Dropdown')
        }
        this.$parent.options.push(this.option)
    },
    render(h) {
        return
    }
}
