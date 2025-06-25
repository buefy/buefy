<template>
    <div class="control" :class="{ 'is-expanded': expanded }">
        <label
            class="b-radio radio button"
            ref="label"
            :class="labelClass"
            :disabled="disabledOrUndefined"
            @click="focus"
            @keydown.prevent.enter="($refs.label as HTMLElement).click()"
        >
            <slot />
            <input
                v-model="computedValue"
                type="radio"
                ref="input"
                @click.stop
                :disabled="disabledOrUndefined"
                :required="requiredOrUndefined"
                :name="name"
                :value="nativeValue"
                @focus="isFocused = true"
                @blur="isFocused = false"
            >
        </label>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { ExtractComponentProps } from '../../utils/helpers'
import CheckRadioMixin from '../../utils/CheckRadioMixin'

const RadioButon = defineComponent({
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
})

export type RadioButonProps = ExtractComponentProps<typeof RadioButon>

export default RadioButon
</script>
