<script>
    export default {
        name: 'bFieldBody',
        render(h) {
            return h('div', { attrs: { 'class': 'field-body' }}, this.$slots.default.map(v => {
                // skip returns and comments
                if (!v.tag) {
                    return v
                }
                return h('div', { attrs: { 'class': 'field' }}, [v])
            }))
        }
    }
</script>
