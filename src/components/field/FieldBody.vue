<script>
    export default {
        name: 'BFieldBody',
        methods: {
            hasHelp() {
                return this.$slots.help || false
            }
        },
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
