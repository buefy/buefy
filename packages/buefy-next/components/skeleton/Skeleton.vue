<script>
import { h as createElement } from 'vue'

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
    render(props) {
        if (!props.active) return
        const items = []
        const width = props.width
        const height = props.height
        for (let i = 0; i < props.count; i++) {
            items.push(createElement('div', {
                class: [
                    'b-skeleton-item',
                    { 'is-rounded': props.rounded }
                ],
                key: i,
                style: {
                    height: height === undefined
                        ? null
                        : (isNaN(height) ? height : height + 'px'),
                    width: width === undefined
                        ? null
                        : (isNaN(width) ? width : width + 'px'),
                    borderRadius: props.circle ? '50%' : null
                }
            }))
        }
        return createElement(
            'div',
            {
                class: [
                    'b-skeleton',
                    props.size,
                    props.position,
                    { 'is-animated': props.animated }
                ]
            },
            items
        )
    }
}
</script>
