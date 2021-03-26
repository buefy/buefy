<template>
    <div class="b-numberinput field" :class="fieldClasses">
        <p
            v-for="control in controlsLeft"
            :key="control"
            :class="['control', control]"
            @mouseup="onStopLongPress"
            @mouseleave="onStopLongPress"
            @touchend="onStopLongPress"
            @touchcancel="onStopLongPress"
        >
            <button
                type="button"
                class="button"
                :class="buttonClasses"
                :disabled="disabled || control === 'plus' ? disabledMax : disabledMin"
                :aria-label="control === 'plus' ? ariaPlusLabel : ariaMinusLabel"
                @mousedown="onStartLongPress($event, control === 'plus')"
                @touchstart.prevent="onStartLongPress($event, control === 'plus')"
                @click="onControlClick($event, control === 'plus')"
            >
                <b-icon
                    both
                    :icon="control"
                    :pack="iconPack"
                    :size="iconSize" />
            </button>
        </p>
        <b-input
            type="number"
            ref="input"
            v-model="computedValue"
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
            v-for="control in controlsRight"
            :key="control"
            :class="['control', control]"
            @mouseup="onStopLongPress"
            @mouseleave="onStopLongPress"
            @touchend="onStopLongPress"
            @touchcancel="onStopLongPress"
        >
            <button
                type="button"
                class="button"
                :class="buttonClasses"
                :disabled="disabled || control === 'plus' ? disabledMax : disabledMin"
                :aria-label="control === 'plus' ? ariaPlusLabel : ariaMinusLabel"
                @mousedown="onStartLongPress($event, control === 'plus')"
                @touchstart.prevent="onStartLongPress($event, control === 'plus')"
                @click="onControlClick($event, control === 'plus')"
            >
                <b-icon
                    both
                    :icon="control"
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
        controlsAlignment: {
            type: String,
            default: 'center',
            validator: (value) => {
                return [
                    'left',
                    'right',
                    'center'
                ].indexOf(value) >= 0
            }
        },
        controlsRounded: {
            type: Boolean,
            default: false
        },
        controlsPosition: String,
        placeholder: [Number, String],
        ariaMinusLabel: String,
        ariaPlusLabel: String
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
                    if (this.minNumber !== undefined) {
                        newValue = this.minNumber
                    } else {
                        newValue = null
                    }
                }
                this.newValue = newValue
                if (!isNaN(newValue) && newValue !== null && newValue !== '-0') {
                    this.$emit('input', Number(newValue))
                }
                !this.isValid && this.$refs.input.checkHtml5Validity()
            }
        },
        controlsLeft() {
            if (this.controls && this.controlsAlignment !== 'right') {
                return this.controlsAlignment === 'left' ? ['minus', 'plus'] : ['minus']
            }
            return []
        },
        controlsRight() {
            if (this.controls && this.controlsAlignment !== 'left') {
                return this.controlsAlignment === 'right' ? ['minus', 'plus'] : ['plus']
            }
            return []
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
                if (this.computedValue === null || typeof this.computedValue === 'undefined') {
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
                if (this.computedValue === null || typeof this.computedValue === 'undefined') {
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
