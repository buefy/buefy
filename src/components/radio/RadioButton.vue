<template>
    <div class="control" :class="{ 'is-expanded': expanded }">
        <label
            class="b-radio radio button"
            ref="label"
            :class="labelClass"
            :disabled="disabled"
            @click="focus"
            @keydown.prevent.enter="$refs.label.click()">
            <slot/>
            <input
                v-model="computedValue"
                type="radio"
                ref="input"
                @click.stop
                :disabled="disabled"
                :required="required"
                :name="name"
                :value="nativeValue"
                @focus="isFocused = true"
                @blur="isFocused = false">
        </label>
    </div>
</template>

<script>
import CheckRadioMixin from '../../utils/CheckRadioMixin.js'

export default {
    name: 'BRadioButton',
    mixins: [CheckRadioMixin],
    props: {
        type: {
            type: String,
            default: 'is-primary'
        },
        expanded: Boolean
    },
    data() {
        return {
            isFocused: false
        }
    },
    computed: {
        isSelected() {
            return this.newValue === this.nativeValue
        },
        labelClass() {
            return [
                this.isSelected ? this.type : null,
                this.size,
                {
                    'is-selected': this.isSelected,
                    'is-disabled': this.disabled,
                    'is-focused': this.isFocused
                }
            ]
        }
    }
}
</script>
