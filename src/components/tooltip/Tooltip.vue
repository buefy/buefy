<template>
    <span
        class="tooltip"
        :data-label="label"
        :class="[type, position, size, {
            'is-square': square,
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
            square: Boolean,
            dashed: Boolean,
            multilined: Boolean,
            size: {
                type: String,
                default: 'is-medium'
            }
        }
    }
</script>
