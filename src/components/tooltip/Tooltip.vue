<template>
    <span
        class="tooltip"
        :data-label="label"
        :class="[type, position, multilineSize, {
            'is-rounded': rounded,
            'is-animated': animated,
            'is-always': always,
            'is-multiline': multilined,
            'is-dashed': dashed
        }]">
        <slot></slot>
    </span>
</template>

<script>
    export default {
        name: 'bTooltip',
        props: {
            type: {
                type: String,
                default: 'is-primary'
            },
            label: String,
            position: {
                type: String,
                default: 'is-top'
            },
            always: Boolean,
            animated: Boolean,
            rounded: {
                type: Boolean,
                default: true
            },
            dashed: Boolean,
            multilined: Boolean,
            multilineSize: {
                type: String,
                default: 'is-medium'
            }
        }
    }
</script>
