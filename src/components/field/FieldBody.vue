<script>
    export default {
        name: 'BFieldBody',
        props: {
            message: {
                type: String
            },
            type: {
                type: [String, Object]
            }
        },
        render(createElement) {
            return createElement('div', { attrs: { 'class': 'field-body' } }, this.$slots.default.map((element) => {
                // skip returns and comments
                if (!element.tag) {
                    return element
                }
                if (this.message) {
                    return createElement('b-field', { attrs: { message: this.message, 'type': this.type } }, [element])
                }
                return createElement('b-field', { attrs: { 'type': this.type } }, [element])
            }))
        }
    }
</script>
