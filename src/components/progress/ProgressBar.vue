<template>
    <div
        class="progress-bar"
        :class="newType"
        role="progressbar"
        :aria-valuenow="value"
        :aria-valuemax="parent.max"
        aria-valuemin="0"
        :style="{width: barWidth}"
    >
        <p
            v-if="newShowValue"
            class="progress-value">
            <slot>{{ newValue }}</slot>
        </p>
    </div>
</template>

<script>
import InjectedChildMixin from '../../utils/InjectedChildMixin'

export default {
    name: 'BProgressBar',
    mixins: [InjectedChildMixin('progress')],
    props: {
        type: {
            type: [String, Object],
            default: undefined
        },
        value: {
            type: Number,
            default: undefined
        },
        showValue: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        newType() {
            return [
                this.parent.size,
                this.type || this.parent.type
            ]
        },
        newShowValue() {
            return this.showValue || this.parent.showValue
        },
        newValue() {
            return this.parent.calculateValue(this.value)
        },
        barWidth() {
            return `${this.value * 100 / this.parent.max}%`
        }
    }
}
</script>
