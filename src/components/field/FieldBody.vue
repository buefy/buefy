<script>
export default {
    name: 'BFieldBody',
    props: {
        message: {
            type: [String, Array]
        },
        type: {
            type: [String, Object]
        }
    },
    render(createElement) {
        let first = true
        return createElement('div', { attrs: { 'class': 'field-body' } }, this.$slots.default.map((element) => {
            // skip returns and comments
            if (!element.tag) {
                return element
            }
            let message
            if (first) {
                message = this.message
                first = false
            }
            return createElement('b-field', { attrs: { type: this.type, message } }, [element])
        }))
    }
}
</script>
