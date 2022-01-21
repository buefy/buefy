<template>
    <div
        v-if="active"
        class="b-skeleton"
        :class="[ customClass, size, position, { 'is-animated': animated } ]"
    >
        <div
            v-for="index in count"
            :key="index"
            class="b-skeleton-item"
            :class="{ 'is-rounded': rounded }"
            :style="styles"
        />
    </div>
</template>

<script>
export default {
    name: 'BSkeleton',
    props: {
        active: {
            type: Boolean,
            default: true
        },
        customClass: {
            type: String,
            default: ''
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
                ].includes(value)
            }
        },
        size: String
    },
    computed: {
        styles() {
            const { width, height } = this
            return {
                height: height === undefined ? null
                    : (isNaN(height) ? height : height + 'px'),
                width: width === undefined ? null
                    : (isNaN(width) ? width : width + 'px'),
                borderRadius: this.circle ? '50%' : null
            }
        }
    }
}
</script>
