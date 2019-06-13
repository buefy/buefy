<template>
    <component
        :is="tag"
        class="button"
        v-bind="$attrs"
        :type="nativeType"
        :class="[size, type, {
            'is-rounded': rounded,
            'is-loading': loading,
            'is-outlined': outlined,
            'is-inverted': inverted,
            'is-focused': focused,
            'is-active': active,
            'is-hovered': hovered,
            'is-selected': selected
        }]"
        @click="$emit('click', $event)"
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

    export default {
        name: 'BButton',
        components: {
            [Icon.name]: Icon
        },
        props: {
            type: [String, Object],
            size: String,
            label: String,
            iconPack: String,
            iconLeft: String,
            iconRight: String,
            rounded: Boolean,
            loading: Boolean,
            outlined: Boolean,
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
                    return [
                        'button',
                        'a',
                        'input',
                        'router-link'
                    ].indexOf(value) >= 0
                }
            }
        },
        computed: {
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
