<template>
    <tag
        class="button"
        :is="renderTag"
        :to="to"
        :href="href"
        :type="type"
        :class="[size, btn, {
            'is-outlined': isOutlined,
            'is-inverted': isInverted,
            'is-rounded': isRounded,
            'is-hovered': isHovered,
            'is-focused': isFocused,
            'is-active': isActive,
            'is-loading': isLoading
        }]"
        :value="type ? text : null"
        :target="target"
        @click="$emit('click', $event)"
    >
        <template v-if="!type">
            <b-icon
                v-if="icon && iconPosition === 'before'"
                :icon="icon"
                :size="iconSize || size || 'is-large'"
                :pack="iconPack"
            />
            <span v-html="text" />
            <b-icon
                v-if="icon && iconPosition === 'after'"
                :icon="icon"
                :size="iconSize || size || 'is-large'"
                :pack="iconPack"
            />
        </template>
    </tag>
</template>

<script>
    export default {
        name: 'BButton',
        props: {
            text: { type: String, default: null },
            to: { type: String, default: null },
            href: { type: String, default: null },
            type: { type: String, default: null },
            target: { type: String, default: null },
            btn: { type: String, default: null },
            size: { type: String, default: 'is-normal' },
            icon: { type: String, default: null },
            iconSize: { type: String, default: null },
            iconPosition: { type: String, default: 'before' },
            iconPack: { type: String, default: null },
            isOutlined: { type: Boolean, default: false },
            isInverted: { type: Boolean, default: false },
            isRounded: { type: Boolean, default: false },
            isHovered: { type: Boolean, default: false },
            isFocused: { type: Boolean, default: false },
            isActive: { type: Boolean, default: false },
            isLoading: { type: Boolean, default: false }
        },
        computed: {
            renderTag() {
                return (this.to)
                    ? 'router-link' : (this.href)
                        ? 'a' : (this.type)
                            ? 'input' : 'button'
            }
        }
    }
</script>
