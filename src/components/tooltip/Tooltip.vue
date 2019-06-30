<template>
    <span
        :data-label="label"
        :class="[newType, position, size, {
            'b-tooltip': active,
            'is-square': square,
            'is-animated': newAnimated,
            'is-always': always,
            'is-multiline': multilined,
            'is-dashed': dashed
    }]">
        <slot/>
    </span>
</template>

<script>
    import config from '../../utils/config'

    export default {
        name: 'BTooltip',
        props: {
            active: {
                type: Boolean,
                default: true
            },
            type: String,
            label: String,
            position: {
                type: String,
                default: 'is-top',
                validator(value) {
                    return [
                        'is-top',
                        'is-bottom',
                        'is-left',
                        'is-right'
                    ].indexOf(value) > -1
                }
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
        },
        computed: {
            newType() {
                return this.type || config.defaultTooltipType
            },
            newAnimated() {
                return this.animated || config.defaultTooltipAnimated
            }
        }
    }
</script>
