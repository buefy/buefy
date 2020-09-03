<script>
export default {
    name: 'BMenuList',
    functional: true,
    props: {
        label: String,
        icon: String,
        iconPack: String,
        ariaRole: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'is-small'
        }
    },
    render(createElement, context) {
        let vlabel = null
        const slots = context.slots()
        if (context.props.label || slots.label) {
            vlabel = createElement('p', { attrs: { 'class': 'menu-label' } },
                context.props.label
                    ? context.props.icon
                        ? [
                            createElement('b-icon', {
                                props: {
                                    'icon': context.props.icon,
                                    'pack': context.props.iconPack,
                                    'size': context.props.size
                                }
                            }),
                            createElement('span', {}, context.props.label)
                        ] : context.props.label
                    : slots.label)
        }
        const vnode = createElement('ul', { attrs: { 'class': 'menu-list', 'role': context.props.ariaRole === 'menu' ? context.props.ariaRole : null } }, slots.default)
        return vlabel ? [ vlabel, vnode ] : vnode
    }
}
</script>
