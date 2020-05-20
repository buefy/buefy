<script>
export default {
    name: 'BSkeleton',
    functional: true,
    props: {
        active: {
            type: Boolean,
            default: true
        },
        animated: {
            type: Boolean,
            default: true
        },
        width: [Number, String],
        height: [Number, String],
        circle: Boolean,
        rounded: {
            type: Boolean,
            default: true
        },
        count: {
            type: Number,
            default: 1
        },
        position: {
            type: String,
            default: '',
            validator(value) {
                return [
                    '',
                    'is-centered',
                    'is-right'
                ].indexOf(value) > -1
            }
        },
        size: String
    },
    render(createElement, context) {
        if (!context.props.active) return
        const items = []
        const width = context.props.width
        const height = context.props.height
        for (let i = 0; i < context.props.count; i++) {
            items.push(createElement('div', {
                staticClass: 'b-skeleton-item',
                class: { 'is-rounded': context.props.rounded },
                key: i,
                style: {
                    height: height === undefined ? null
                        : (isNaN(height) ? height : height + 'px'),
                    width: width === undefined ? null
                        : (isNaN(width) ? width : width + 'px'),
                    borderRadius: context.props.circle ? '50%' : null
                }
            }))
        }
        return createElement('div', {
            staticClass: 'b-skeleton',
            class: [ context.props.size, context.props.position, { 'is-animated': context.props.animated } ]
        }, items)
    }
}
</script>
