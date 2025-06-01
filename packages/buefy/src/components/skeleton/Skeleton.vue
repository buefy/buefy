<script lang="ts">
import { h as createElement } from 'vue'
import type { DefineComponent } from 'vue'

const SKELETON_POSITIONS = ['', 'is-centered', 'is-right']
type SkeletonPosition = typeof SKELETON_POSITIONS[number]

export interface SkeletonProps {
    active: boolean
    animated: boolean
    width?: number | string
    height?: number | string
    circle?: boolean
    rounded: boolean
    count: number
    position: SkeletonPosition
    size?: string
}

const BSkeleton = (props: SkeletonProps) => {
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
                    : (isNaN(+height) ? height : height + 'px'),
                width: width === undefined
                    ? null
                    : (isNaN(+width) ? width : width + 'px'),
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

BSkeleton.props = {
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
        validator(value: SkeletonPosition) {
            return SKELETON_POSITIONS.indexOf(value) > -1
        }
    },
    size: String
}

/* eslint-disable @typescript-eslint/ban-types */
// `defineComponent(BSkeleton)` did not work.
// forcefully casting as `DefineComponent` is the only way I came up with to
// type a functional component
export default BSkeleton as unknown as DefineComponent<
    typeof BSkeleton.props, // P(rops)
    {}, // B (raw bindings)
    {}, // D(ata)
    {} // C(omputed). default `ComputedOptions` did not work
>
/* eslint-enable @typescript-eslint/ban-types */
</script>
