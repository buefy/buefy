<script>
    export default {
        name: 'BFieldBody',
        render(h) {
            return h('div', { attrs: { 'class': 'field-body' } }, this.$slots.default.map((v) => {
                // skip returns and comments
                if (!v.tag) {
                    return v
                }
                return h('b-field', [v])
            }))
        }
    }
</script>
