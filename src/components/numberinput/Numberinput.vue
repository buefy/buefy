<template>
    <div class="b-numberinput field" :class="fieldClasses">
        <p
            v-if="controls"
            class="control minus"
            @mouseup="onStopLongPress(false)"
            @mouseleave="onStopLongPress(false)"
            @touchend="onStopLongPress(false)"
            @touchcancel="onStopLongPress(false)"
        >
            <button
                type="button"
                class="button"
                :class="buttonClasses"
                :disabled="disabled || disabledMin"
                @mousedown="onStartLongPress($event, false)"
                @touchstart.prevent="onStartLongPress($event, false)"
                @click="onControlClick($event, false)"
            >
                <b-icon
                    icon="minus"
                    both
                    :pack="iconPack"
                    :size="iconSize" />
            </button>
        </p>
        <b-input
            type="number"
            ref="input"
            v-model.number="computedValue"
            v-bind="$attrs"
            :step="minStepNumber"
            :max="max"
            :min="min"
            :size="size"
            :disabled="disabled"
            :readonly="!editable"
            :loading="loading"
            :rounded="rounded"
            :icon="icon"
            :icon-pack="iconPack"
            :autocomplete="autocomplete"
            :expanded="expanded"
            :placeholder="placeholder"
            :use-html5-validation="useHtml5Validation"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)"
        />
        <p
            v-if="controls"
            class="control plus"
            @mouseup="onStopLongPress(true)"
            @mouseleave="onStopLongPress(true)"
            @touchend="onStopLongPress(true)"
            @touchcancel="onStopLongPress(true)"
        >
            <button
                type="button"
                class="button"
                :class="buttonClasses"
                :disabled="disabled || disabledMax"
                @mousedown="onStartLongPress($event, true)"
                @touchstart.prevent="onStartLongPress($event, true)"
                @click="onControlClick($event, true)"
            >
                <b-icon
                    icon="plus"
                    both
                    :pack="iconPack"
                    :size="iconSize" />
            </button>
        </p>
    </div>
</template>

<script>
import Icon from '../icon/Icon'
import Input from '../input/Input'
import FormElementMixin from '../../utils/FormElementMixin'

export default {
    name: 'BNumberinput',
    components: {
        [Icon.name]: Icon,
        [Input.name]: Input
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
        value: Number,
        min: {
            type: [Number, String]
        },
        max: [Number, String],
        step: [Number, String],
        minStep: [Number, String],
        exponential: [Boolean, Number],
        disabled: Boolean,
        type: {
            type: String,
            default: 'is-primary'
        },
        editable: {
            type: Boolean,
            default: true
        },
        controls: {
            type: Boolean,
            default: true
        },
        controlsRounded: {
            type: Boolean,
            default: false
        },
        controlsPosition: String,
        placeholder: [Number, String]
    },
    data() {
        return {
            newValue: this.value,
            newStep: this.step || 1,
            newMinStep: this.minStep,
            timesPressed: 1,
            _elementRef: 'input'
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                let newValue = value
                if (value === '' || value === undefined || value === null) {
                    newValue = this.minNumber || null
                }
                this.newValue = newValue
                this.$emit('input', newValue)
                !this.isValid && this.$refs.input.checkHtml5Validity()
            }
        },
        fieldClasses() {
            return [
                { 'has-addons': this.controlsPosition === 'compact' },
                { 'is-grouped': this.controlsPosition !== 'compact' },
                { 'is-expanded': this.expanded }
            ]
        },
        buttonClasses() {
            return [this.type, this.size, { 'is-rounded': this.controlsRounded }]
        },
        minNumber() {
            return typeof this.min === 'string' ? parseFloat(this.min) : this.min
        },
        maxNumber() {
            return typeof this.max === 'string' ? parseFloat(this.max) : this.max
        },
        stepNumber() {
            return typeof this.newStep === 'string' ? parseFloat(this.newStep) : this.newStep
        },
        minStepNumber() {
            const step = typeof this.newMinStep !== 'undefined' ? this.newMinStep : this.newStep
            return typeof step === 'string' ? parseFloat(step) : step
        },
        disabledMin() {
            return this.computedValue - this.stepNumber < this.minNumber
        },
        disabledMax() {
            return this.computedValue + this.stepNumber > this.maxNumber
        },
        stepDecimals() {
            const step = this.minStepNumber.toString()
            const index = step.indexOf('.')
            if (index >= 0) {
                return step.substring(index + 1).length
            }
            return 0
        }
    },
    watch: {
    /**
     * When v-model is changed:
     *   1. Set internal value.
     */
        value: {
            immediate: true,
            handler(value) {
                this.newValue = value
            }
        },
        step(value) {
            this.newStep = value
        },
        minStep(value) {
            this.newMinStep = value
        }
    },
    methods: {
        decrement() {
            if (typeof this.minNumber === 'undefined' || this.computedValue - this.stepNumber >= this.minNumber) {
                if (!this.computedValue) {
                    if (this.maxNumber) {
                        this.computedValue = this.maxNumber
                        return
                    }
                    this.computedValue = 0
                }
                const value = this.computedValue - this.stepNumber
                this.computedValue = parseFloat(value.toFixed(this.stepDecimals))
            }
        },
        increment() {
            if (typeof this.maxNumber === 'undefined' || this.computedValue + this.stepNumber <= this.maxNumber) {
                if (!this.computedValue) {
                    if (this.minNumber) {
                        this.computedValue = this.minNumber
                        return
                    }
                    this.computedValue = 0
                }
                const value = this.computedValue + this.stepNumber
                this.computedValue = parseFloat(value.toFixed(this.stepDecimals))
            }
        },
        onControlClick(event, inc) {
            // IE 11 -> filter click event
            if (event.detail !== 0 || event.type !== 'click') return
            if (inc) this.increment()
            else this.decrement()
        },
        longPressTick(inc) {
            if (inc) this.increment()
            else this.decrement()

            this._$intervalRef = setTimeout(() => {
                this.longPressTick(inc)
            }, this.exponential ? (250 / (this.exponential * this.timesPressed++)) : 250)
        },
        onStartLongPress(event, inc) {
            if (event.button !== 0 && event.type !== 'touchstart') return
            clearTimeout(this._$intervalRef)
            this.longPressTick(inc)
        },
        onStopLongPress() {
            if (!this._$intervalRef) return
            this.timesPressed = 1
            clearTimeout(this._$intervalRef)
            this._$intervalRef = null
        }
    }
}
</script>
