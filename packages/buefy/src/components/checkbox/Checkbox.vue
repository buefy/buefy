<template>
    <label
        class="b-checkbox checkbox"
        :class="[size, { 'is-disabled': disabled }]"
        ref="label"
        :disabled="disabledOrUndefined"
        @click="focus"
        @keydown.prevent.enter="($refs.label as HTMLElement).click()"
        @keydown.prevent.space="($refs.label as HTMLElement).click()"
    >
        <!-- Checkbox needs to listen for a space event instead of a just a
             click and enter event so that that using the keyboard spacebar will also
             trigger the checkbox change in the b-table -->
        <input
            v-model="computedValue"
            :id="inputId"
            :indeterminate.prop="indeterminate"
            type="checkbox"
            ref="input"
            @click.stop
            :autocomplete="autocomplete"
            :disabled="disabledOrUndefined"
            :required="requiredOrUndefined"
            :name="name"
            :value="nativeValue"
            :true-value="trueValue"
            :false-value="falseValue"
            :aria-labelledby="ariaLabelledby"
        >
        <span class="check" :class="type" />
        <span :id="ariaLabelledby" class="control-label"><slot /></span>
    </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CheckRadioMixin from '../../utils/CheckRadioMixin'

export default defineComponent({
    name: 'BCheckbox',
    mixins: [CheckRadioMixin],
    props: {
        indeterminate: Boolean,
        ariaLabelledby: String,
        trueValue: {
            type: [String, Number, Boolean, Function, Object, Array],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean, Function, Object, Array],
            default: false
        },
        autocomplete: {
            type: String,
            default: 'on'
        },
        inputId: {
            type: String,
            default: ''
        }
    }
})
</script>
