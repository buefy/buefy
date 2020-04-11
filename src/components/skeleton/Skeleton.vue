<script>
export default {
    name: 'BSkeleton',
    functional: true,
    props: {
        active: {
            type: Boolean,
            default: true
        },
        width: [Number, String],
        height: [Number, String],
        circle: Boolean,
        count: {
            type: Number,
            default: 1
        }
    },
    render(createElement, context) {
        if (!context.props.active) return
        const items = []
        const width = context.props.width
        const height = context.props.height
        for (let i = 0; i < context.props.count; i++) {
            items.push(createElement('div', {
                staticClass: 'b-skeleton-item',
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
        return createElement('div', { staticClass: 'b-skeleton' }, items)
    }
}
</script>
