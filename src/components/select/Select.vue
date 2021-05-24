<template>
    <div
        class="control"
        :class="{ 'is-expanded': expanded, 'has-icons-left': icon }"
    >
        <span class="select" :class="spanClasses">

            <select
                v-model="computedValue"
                ref="select"
                :multiple="multiple"
                :size="nativeSize"
                v-bind="$attrs"
                @blur="$emit('blur', $event) && checkHtml5Validity()"
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

<script>
import Icon from '../icon/Icon'
import FormElementMixin from '../../utils/FormElementMixin'

export default {
    name: 'BSelect',
    components: {
        [Icon.name]: Icon
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [String, Number, Boolean, Object, Array, Function, Date],
            default: null
        },
        placeholder: String,
        multiple: Boolean,
        nativeSize: [String, Number]
    },
    emits: ['blur', 'focus', 'update:modelValue'],
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
            set(value) {
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
        /**
        * When v-model is changed:
        *   1. Set the selected option.
        *   2. If it's invalid, validate again.
        */
        modelValue(value) {
            this.selected = value
            !this.isValid && this.checkHtml5Validity()
        }
    }
}
</script>
