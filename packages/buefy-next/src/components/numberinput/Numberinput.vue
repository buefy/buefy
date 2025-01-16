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
            @focus="$emit('focus', $event!)"
            @blur="$emit('blur', $event!)"
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

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import BField from '../field/Field.vue'
import BIcon from '../icon/Icon.vue'
import BInput from '../input/Input.vue'
import CompatFallthroughMixin from '../../utils/CompatFallthroughMixin'
import FormElementMixin from '../../utils/FormElementMixin'

type BFieldInstance = InstanceType<typeof BField>
type BInputInstance = InstanceType<typeof BInput>

export const CONTROLS_ALIGNMENTS = ['left', 'right', 'center'] as const
export type ControlsAlignment = typeof CONTROLS_ALIGNMENTS[number]

const CONTROL_OPERATIONS = ['plus', 'minus'] as const
export type ControlOperation = typeof CONTROL_OPERATIONS[number]

export default defineComponent({
    name: 'BNumberinput',
    components: {
        BIcon,
        BInput
    },
    mixins: [CompatFallthroughMixin, FormElementMixin],
    inject: {
        field: {
            from: 'BField',
            default: false
        }
    },
    props: {
        modelValue: [Number, null] as PropType<number | null>,
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
            type: String as PropType<ControlsAlignment>,
            default: 'center',
            validator: (value: ControlsAlignment) => {
                return CONTROLS_ALIGNMENTS.indexOf(value) >= 0
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
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        blur: (_event: Event) => true,
        focus: (_event: Event) => true,
        'update:modelValue': (_value: number | null | undefined) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            newValue: this.modelValue,
            newStep: this.step || 1,
            newMinStep: this.minStep,
            timesPressed: 1,
            _elementRef: 'input',
            _$intervalRef: undefined as ReturnType<typeof setTimeout> | undefined
        }
    },
    computed: {
        computedValue: {
            // getter has to include `string` in the return type so that the
            // setter can accept `string`
            get(): number | string | null | undefined {
                return this.newValue
            },
            set(value: number | string | null | undefined) {
                // Parses the number, so that "0" => 0, and "invalid" => null
                let newValue = (Number(value) === 0) ? 0 : (Number(value) || null)
                if (value === '' || value === undefined || value === null) {
                    newValue = null
                }
                this.newValue = newValue
                if (newValue === null) {
                    this.$emit('update:modelValue', newValue)
                // I decided to comment out `newValue !== '-0'` until we fix
                // the regression of https://github.com/buefy/buefy/pull/3170
                } else if (!isNaN(newValue)/* && newValue !== '-0' */) {
                    this.$emit('update:modelValue', Number(newValue))
                }
                this.$nextTick(() => {
                    if (this.$refs.input) {
                        (this.$refs.input as BInputInstance).checkHtml5Validity()
                    }
                })
            }
        },
        controlsLeft(): ControlOperation[] {
            if (this.controls && this.controlsAlignment !== 'right') {
                return this.controlsAlignment === 'left' ? ['minus', 'plus'] : ['minus']
            }
            return []
        },
        controlsRight(): ControlOperation[] {
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
            return +this.computedValue! - this.stepNumber < this.minNumber!
        },
        disabledMax() {
            return +this.computedValue! + this.stepNumber > this.maxNumber!
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
    /*
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
        isDisabled(control: ControlOperation) {
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
            if (typeof this.minNumber === 'undefined' || (+this.computedValue - this.stepNumber) >= this.minNumber) {
                const value = +this.computedValue - this.stepNumber
                this.computedValue = parseFloat(value.toFixed(this.stepDecimals))
            }
        },
        increment() {
            if (this.computedValue === null || typeof this.computedValue === 'undefined' || +this.computedValue < this.minNumber!) {
                if (this.minNumber !== null && typeof this.minNumber !== 'undefined') {
                    this.computedValue = this.minNumber
                    return
                }
                this.computedValue = 0
            }
            if (typeof this.maxNumber === 'undefined' || (+this.computedValue + this.stepNumber) <= this.maxNumber) {
                const value = +this.computedValue + this.stepNumber
                this.computedValue = parseFloat(value.toFixed(this.stepDecimals))
            }
        },
        onControlClick(event: MouseEvent, inc: boolean) {
            // IE 11 -> filter click event
            if (event.detail !== 0 || event.type !== 'click') return
            if (inc) this.increment()
            else this.decrement()
        },
        longPressTick(inc: boolean) {
            if (inc) this.increment()
            else this.decrement()

            if (!this.longPress) return
            this._$intervalRef = setTimeout(() => {
                this.longPressTick(inc)
            }, this.exponential ? (250 / (+this.exponential * this.timesPressed++)) : 250)
        },
        onStartLongPress(event: MouseEvent | TouchEvent, inc: boolean) {
            if ((event as MouseEvent).button !== 0 && (event as TouchEvent).type !== 'touchstart') return
            clearTimeout(this._$intervalRef)
            this.longPressTick(inc)
        },
        onStopLongPress() {
            if (!this._$intervalRef) return
            this.timesPressed = 1
            clearTimeout(this._$intervalRef)
            this._$intervalRef = undefined
        }
    },
    mounted() {
        // tells the field that it is wrapping a number input
        // if the field is the direct parent.
        if (this.field === this.$parent) {
            (this.$parent as BFieldInstance).wrapNumberinput({
                controlsPosition: this.controlsPosition,
                size: this.size
            })
        }
    },

    beforeUnmount() {
        clearTimeout(this._$intervalRef)
    }
})
</script>
