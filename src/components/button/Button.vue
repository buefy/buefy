<template>
    <component
        :is="computedTag"
        class="button"
        v-bind="$attrs"
        :type="nativeType"
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
        v-on="$listeners"
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

<script>
import Icon from '../icon/Icon'
import config from '../../utils/config'

export default {
    name: 'BButton',
    components: {
        [Icon.name]: Icon
    },
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
            type: String,
            default: 'button',
            validator: (value) => {
                return [
                    'button',
                    'submit',
                    'reset'
                ].indexOf(value) >= 0
            }
        },
        tag: {
            type: String,
            default: 'button',
            validator: (value) => {
                return config.defaultLinkTags.indexOf(value) >= 0
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
}
</script>
