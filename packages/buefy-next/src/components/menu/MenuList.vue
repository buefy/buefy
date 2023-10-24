<script>
import { h as createElement, resolveComponent } from 'vue'

const BMenuList = (props, context) => {
    let vlabel = null
    const slots = context.slots
    if (props.label || slots.label) {
        vlabel = createElement(
            'p',
            { class: 'menu-label' },
            props.label
                ? props.icon
                    ? [
                        createElement(resolveComponent('b-icon'), {
                            icon: props.icon,
                            pack: props.iconPack,
                            size: props.size
                        }),
                        createElement('span', {}, props.label)
                    ]
                    : props.label
                : slots.label()
        )
    }
    const vnode = createElement(
        'ul',
        {
            class: 'menu-list',
            role: props.ariaRole === 'menu' ? props.ariaRole : null
        },
        typeof slots.default === 'function' ? slots.default() : slots.default
    )
    return vlabel ? [vlabel, vnode] : vnode
}

BMenuList.props = {
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
}

export default BMenuList
</script>
