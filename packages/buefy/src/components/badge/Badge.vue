<template>
    <component
        :is="tag"
        class="b-badge"
    >
        <slot />

        <span
            v-if="isActive"
            class="b-badge-badge tag"
            :class="[type, size, position, { 'is-rounded': rounded, 'is-dot': dot }]"
        >
            <slot
                v-if="!dot"
                name="badge"
            >
                {{ displayValue }}
            </slot>
        </span>
    </component>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export type BadgePosition = 'is-top-right' | 'is-top-left' | 'is-bottom-right' | 'is-bottom-left'

const BADGE_POSITIONS: BadgePosition[] = ['is-top-right', 'is-top-left', 'is-bottom-right', 'is-bottom-left']

export default defineComponent({
    name: 'BBadge',
    props: {
        value: [String, Number],
        type: [String, Object],
        size: String,
        rounded: Boolean,
        position: {
            type: String as PropType<BadgePosition>,
            default: 'is-top-right',
            validator: (value: BadgePosition) => BADGE_POSITIONS.indexOf(value) >= 0
        },
        dot: Boolean,
        max: Number,
        visible: {
            type: Boolean,
            default: true
        },
        tag: {
            type: String,
            default: 'div'
        }
    },
    computed: {
        hasBadgeContent(): boolean {
            return (this.value !== undefined && this.value !== null && this.value !== '') || !!this.$slots.badge
        },
        isActive(): boolean {
            return this.visible && (this.dot || this.hasBadgeContent)
        },
        displayValue(): string | number | undefined {
            if (typeof this.value === 'number' && typeof this.max === 'number' && this.value > this.max) {
                return `${this.max}+`
            }
            return this.value
        }
    }
})
</script>
