<script>
export default {
    name: 'BMenuList',
    functional: true,
    props: {
        label: String
    },
    render(createElement, context) {
        let vlabel = null
        const slots = context.slots()
        if (context.props.label || slots.label) {
            vlabel = createElement('p', { attrs: { 'class': 'menu-label' } },
                context.props.label ? context.props.label : slots.label)
        }
        const vnode = createElement('ul', { attrs: { 'class': 'menu-list' } }, slots.default)
        return vlabel ? [ vlabel, vnode ] : vnode
    }
}
</script>
