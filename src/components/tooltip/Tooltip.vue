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
        }]"
        :style="{'transition-delay': `${newDelay}ms`}">
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
        },
        delay: Number
    },
    computed: {
        newType() {
            return this.type || config.defaultTooltipType
        },
        newAnimated() {
            return this.animated || config.defaultTooltipAnimated
        },
        newDelay() {
            return this.delay || config.defaultTooltipDelay
        }
    }
}
</script>

<style scoped lang="scss">
    @mixin tooltip($direction) {
        &.#{$direction} {
            &:before,
            &:after {
                @if ($direction == "is-top") {
                    top: auto;
                    right: auto;
                    bottom: calc(100% + #{$tooltip-arrow-size} + #{$tooltip-arrow-margin});
                    left: 50%;
                    transform: translateX(-50%);
                } @else if ($direction == "is-bottom") {
                    top: calc(100% + #{$tooltip-arrow-size} + #{$tooltip-arrow-margin});
                    right: auto;
                    bottom: auto;
                    left: 50%;
                    transform: translateX(-50%);
                } @else if ($direction == "is-right") {
                    top: 50%;
                    right: auto;
                    bottom: auto;
                    left: calc(100% + #{$tooltip-arrow-size} + #{$tooltip-arrow-margin});
                    transform: translateY(-50%);
                } @else if ($direction == "is-left") {
                    top: 50%;
                    right: calc(100% + #{$tooltip-arrow-size} + #{$tooltip-arrow-margin});
                    bottom: auto;
                    left: auto;
                    transform: translateY(-50%);
                }
            }
            @each $name, $pair in $colors {
                $color: nth($pair, 1);
                &.is-#{$name}:before {
                    @include tooltip-arrow($direction, $color)
                }
            }
            &.is-multiline {
                @each $name, $size in $tooltip-multiline-sizes {
                    &.is-#{$name}:after {
                        width: $size;
                    }
                }
            }
        }
    }

    @mixin tooltip-arrow($direction, $color) {
        @if ($direction == "is-top") {
            border-top: $tooltip-arrow-size solid $color;
            border-right: $tooltip-arrow-size solid transparent;
            border-left: $tooltip-arrow-size solid transparent;
            bottom: calc(100% + #{$tooltip-arrow-margin});
        } @else if ($direction == "is-bottom") {
            border-right: $tooltip-arrow-size solid transparent;
            border-bottom: $tooltip-arrow-size solid $color;
            border-left: $tooltip-arrow-size solid transparent;
            top: calc(100% + #{$tooltip-arrow-margin});
        } @else if ($direction == "is-right") {
            border-top: $tooltip-arrow-size solid transparent;
            border-right: $tooltip-arrow-size solid $color;
            border-bottom: $tooltip-arrow-size solid transparent;
            left: calc(100% + #{$tooltip-arrow-margin});
        } @else if ($direction == "is-left") {
            border-top: $tooltip-arrow-size solid transparent;
            border-bottom: $tooltip-arrow-size solid transparent;
            border-left: $tooltip-arrow-size solid $color;
            right: calc(100% + #{$tooltip-arrow-margin});
        }
    }

    // Base
    .b-tooltip {
        @include tooltip("is-top");
        @include tooltip("is-right");
        @include tooltip("is-bottom");
        @include tooltip("is-left");
        position: relative;
        display: inline-flex;
        &:before,
        &:after {
            position: absolute;
            content: "";
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }
        &:before {
            z-index: 39;
        }
        &:after {
            content: attr(data-label);
            width: auto;
            padding: 0.35rem 0.75rem;
            border-radius: $radius-large;
            font-size: 0.85rem;
            font-weight: $weight-normal;
            box-shadow: 0px 1px 2px 1px rgba(0, 1, 0, 0.2);
            z-index: 38;
            white-space: nowrap;
        }
        &:not([data-label=""]):hover:before,
        &:not([data-label=""]):hover:after {
            transition-delay: inherit;
            opacity: 1;
            visibility: visible;
        }
        // Modifiers
        @each $name, $pair in $colors {
            $color: nth($pair, 1);
            $color-invert: nth($pair, 2);
            &.is-#{$name}:after {
                background: $color;
                color: $color-invert;
            }
        }
        &:not([data-label=""]).is-always {
            &:before,
            &:after {
                opacity: 1;
                visibility: visible;
            }
        }
        &.is-multiline {
            &:after {
                display: flex-block;
                text-align: center;
                white-space: normal;
            }
        }
        &.is-dashed {
            border-bottom: 1px dashed $grey-light;
            cursor: default;
        }
        &.is-square {
            &:after {
                border-radius: 0;
            }
        }
        &.is-animated {
            &:before,
            &:after {
                transition: opacity $speed $easing, visibility $speed $easing;
            }
        }
    }
</style>
