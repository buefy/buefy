<template>
    <component
        :is="computedTag"
        class="button"
        v-bind="$attrs"
        :type="['button', 'input'].includes(computedTag) ? nativeType : undefined"
        :class="[size, type, {
            'is-rounded': rounded,
            'is-loading': loading,
            'is-outlined': outlined,
            'is-fullwidth': expanded,
            'is-inverted': inverted,
            'is-focused': focused,
            'is-active': active,
            'is-hovered': hovered,
            'is-selected': selected
        }]"
    >
        <b-icon
            v-if="iconLeft"
            :pack="iconPack"
            :icon="iconLeft"
            :size="iconSize"
        />
        <span v-if="label">{{ label }}</span>
        <span v-else-if="$slots.default">
            <slot />
        </span>
        <b-icon
            v-if="iconRight"
            :pack="iconPack"
            :icon="iconRight"
            :size="iconSize"
        />
    </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import BIcon from '../icon/Icon.vue'
import config from '../../utils/config'

// Allowed native types.
const NATIVE_TYPES = [
    'button',
    'submit',
    'reset'
] as const
export type ButtonNativeType = typeof NATIVE_TYPES[number]

export default defineComponent({
    name: 'BButton',
    components: { BIcon },
    inheritAttrs: false,
    props: {
        type: [String, Object],
        size: String,
        label: String,
        iconPack: String,
        iconLeft: String,
        iconRight: String,
        rounded: {
            type: Boolean,
            default: () => {
                return config.defaultButtonRounded
            }
        },
        loading: Boolean,
        outlined: Boolean,
        expanded: Boolean,
        inverted: Boolean,
        focused: Boolean,
        active: Boolean,
        hovered: Boolean,
        selected: Boolean,
        nativeType: {
            type: String as PropType<ButtonNativeType>,
            default: 'button',
            validator: (value: unknown) => {
                return NATIVE_TYPES.indexOf(value as ButtonNativeType) >= 0
            }
        },
        tag: {
            type: String,
            default: 'button',
            validator: (value: unknown) => {
                return config.defaultLinkTags.indexOf(value as string) >= 0
            }
        }
    },
    computed: {
        computedTag() {
            if (this.$attrs.disabled !== undefined && this.$attrs.disabled !== false) {
                return 'button'
            }
            return this.tag
        },
        iconSize() {
            if (!this.size || this.size === 'is-medium') {
                return 'is-small'
            } else if (this.size === 'is-large') {
                return 'is-medium'
            }
            return this.size
        }
    }
})
</script>
