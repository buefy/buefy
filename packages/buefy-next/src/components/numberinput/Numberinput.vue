<template>
    <div
        class="b-numberinput field"
        :class="fieldClasses"
        v-bind="rootAttrs"
    >
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
                :disabled="isDisabled(control) || undefined"
                :aria-label="control === 'plus' ? ariaPlusLabel : ariaMinusLabel"
                @mousedown="
                    !isDisabled(control) && onStartLongPress($event, control === 'plus')
                "
                @touchstart.prevent="
                    !isDisabled(control) && onStartLongPress($event, control === 'plus')
                "
                @click="
                    !isDisabled(control) && onControlClick($event, control === 'plus')
                "
            >
                <b-icon
                    both
                    :icon="control"
                    :pack="iconPack"
                    :size="iconSize"
                />
            </button>
        </p>
        <b-input
            type="number"
            ref="input"
            v-model="computedValue"
            v-bind="fallthroughAttrs"
            :step="minStepNumber"
            :max="max"
            :min="min"
            :size="size"
            :disabled="disabledOrUndefined"
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
                :disabled="isDisabled(control) || undefined"
                :aria-label="control === 'plus' ? ariaPlusLabel : ariaMinusLabel"
                @mousedown="
                    !isDisabled(control) && onStartLongPress($event, control === 'plus')
                "
                @touchstart.prevent="
                    !isDisabled(control) && onStartLongPress($event, control === 'plus')
                "
                @click="
                    !isDisabled(control) && onControlClick($event, control === 'plus')
                "
            >
                <b-icon
                    both
                    :icon="control"
                    :pack="iconPack"
                    :size="iconSize"
                />
            </button>
        </p>
    </div>
</template>

<script>
import Icon from '../icon/Icon.vue'
import Input from '../input/Input.vue'
import CompatFallthroughMixin from '../../utils/CompatFallthroughMixin'
import FormElementMixin from '../../utils/FormElementMixin'

export default {
    name: 'BNumberinput',
    components: {
        [Icon.name]: Icon,
        [Input.name]: Input
    },
    mixins: [CompatFallthroughMixin, FormElementMixin],
    inject: {
        field: {
            from: 'BField',
            default: false
        }
    },
    props: {
        modelValue: Number,
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
        ariaPlusLabel: String,
        longPress: {
            type: Boolean,
            default: true
        }
    },
    emits: ['blur', 'focus', 'update:modelValue'],
    data() {
        return {
            newValue: this.modelValue,
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
                // Parses the number, so that "0" => 0, and "invalid" => null
                let newValue = (Number(value) === 0) ? 0 : (Number(value) || null)
                if (value === '' || value === undefined || value === null) {
                    newValue = null
                }
                this.newValue = newValue
                if (newValue === null) {
                    this.$emit('update:modelValue', newValue)
                } else if (!isNaN(newValue) && newValue !== '-0') {
                    this.$emit('update:modelValue', Number(newValue))
                }
                this.$nextTick(() => {
                    if (this.$refs.input) {
                        this.$refs.input.checkHtml5Validity()
                    }
                })
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
            if (this.newStep === 'any') {
                return 1
            }
            return typeof this.newStep === 'string' ? parseFloat(this.newStep) : this.newStep
        },
        minStepNumber() {
            if (this.newStep === 'any' && typeof this.newMinStep === 'undefined') {
                return 'any'
            }
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
        },

        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it,
            // `null` or `undefined` has to be given to remove it.
            return this.disabled || undefined
        }
    },
    watch: {
    /**
     * When v-model is changed:
     *   1. Set internal value.
     */
        modelValue: {
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
        isDisabled(control) {
            return this.disabled || (control === 'plus' ? this.disabledMax : this.disabledMin)
        },
        decrement() {
            if (this.computedValue === null || typeof this.computedValue === 'undefined') {
                if (this.maxNumber !== null && typeof this.maxNumber !== 'undefined') {
                    this.computedValue = this.maxNumber
                    return
                }
                this.computedValue = 0
            }
            if (typeof this.minNumber === 'undefined' || (this.computedValue - this.stepNumber) >= this.minNumber) {
                const value = this.computedValue - this.stepNumber
                this.computedValue = parseFloat(value.toFixed(this.stepDecimals))
            }
        },
        increment() {
            if (this.computedValue === null || typeof this.computedValue === 'undefined' || this.computedValue < this.minNumber) {
                if (this.minNumber !== null && typeof this.minNumber !== 'undefined') {
                    this.computedValue = this.minNumber
                    return
                }
                this.computedValue = 0
            }
            if (typeof this.maxNumber === 'undefined' || (this.computedValue + this.stepNumber) <= this.maxNumber) {
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

            if (!this.longPress) return
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
    },
    mounted() {
        // tells the field that it is wrapping a number input
        // if the field is the direct parent.
        if (this.field === this.$parent) {
            this.$parent.wrapNumberinput({
                controlsPosition: this.controlsPosition,
                size: this.size
            })
        }
    },

    beforeUnmount() {
        clearTimeout(this._$intervalRef)
    }
}
</script>
