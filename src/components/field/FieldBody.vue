<script>
    export default {
        name: 'BFieldBody',
        props: {
            message: {
                type: [String]
            },
            type: {
                type: [String]
            }
        },
        render(h) {
            return h('div', { attrs: { 'class': 'field-body' } }, this.$slots.default.map((v) => {
                // skip returns and comments
                if (!v.tag) {
                    return v
                }
                if (this.message) {
                    return h('b-field', { attrs: { message: this.message, 'type': this.type } }, [v])
                }
                return h('b-field', { attrs: { 'type': this.type } }, [v])
            }))
        }
    }
</script>
