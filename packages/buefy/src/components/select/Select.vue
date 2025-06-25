<template>
    <div
        class="control"
        :class="{ 'is-expanded': expanded, 'has-icons-left': icon }"
        v-bind="rootAttrs"
    >
        <span class="select" :class="spanClasses">

            <select
                v-model="computedValue"
                ref="select"
                :multiple="multiple"
                :size="nativeSize"
                v-bind="fallthroughAttrs"
                @blur="onBlur"
                @focus="$emit('focus', $event)"
            >

                <template v-if="placeholder">
                    <option
                        v-if="computedValue == null"
                        :value="null"
                        disabled
                        hidden
                    >
                        {{ placeholder }}
                    </option>
                </template>

                <slot />

            </select>
        </span>

        <b-icon
            v-if="icon"
            class="is-left"
            :icon="icon"
            :pack="iconPack"
            :size="iconSize"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import BIcon from '../icon/Icon.vue'
import CompatFallthroughMixin from '../../utils/CompatFallthroughMixin'
import FormElementMixin from '../../utils/FormElementMixin'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ModelValue = any

export default defineComponent({
    name: 'BSelect',
    components: {
        BIcon
    },
    mixins: [CompatFallthroughMixin, FormElementMixin],
    props: {
        modelValue: {
            type: [
                String, Number, Boolean, Object, Array, Function, Date, null
            ] as PropType<ModelValue>,
            default: null
        },
        placeholder: String,
        multiple: Boolean,
        nativeSize: [String, Number]
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        blur: (_event: FocusEvent) => true,
        focus: (_event: FocusEvent) => true,
        'update:modelValue': (_value: ModelValue) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            selected: this.modelValue,
            _elementRef: 'select'
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.selected
            },
            set(value: ModelValue) {
                this.selected = value
                this.$emit('update:modelValue', value)
                !this.isValid && this.checkHtml5Validity()
            }
        },
        spanClasses() {
            return [this.size, this.statusType, {
                'is-fullwidth': this.expanded,
                'is-loading': this.loading,
                'is-multiple': this.multiple,
                'is-rounded': this.rounded,
                'is-empty': this.selected === null
            }]
        }
    },
    watch: {
        /*
        * When v-model is changed:
        *   1. Set the selected option.
        *   2. If it's invalid, validate again.
        */
        modelValue(value) {
            this.selected = value
            !this.isValid && this.checkHtml5Validity()
        }
    }
})
</script>
