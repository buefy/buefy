<template>
    <div class="control">
        <label
            class="b-radio radio button"
            ref="label"
            :class="[newValue === nativeValue ? type : null, size]"
            :disabled="disabled"
            :tabindex="disabled ? false : 0"
            @keydown.prevent.enter.space="$refs.label.click()">
            <slot/>
            <input
                v-model="computedValue"
                type="radio"
                :disabled="disabled"
                :required="required"
                :name="name"
                :value="nativeValue">
        </label>
    </div>
</template>

<script>
    export default {
        name: 'BRadioButton',
        props: {
            value: [String, Number, Boolean, Function, Object, Array, Symbol],
            nativeValue: [String, Number, Boolean, Function, Object, Array, Symbol],
            type: {
                type: String,
                default: 'is-primary'
            },
            disabled: Boolean,
            required: Boolean,
            name: String,
            size: String
        },
        data() {
            return {
                newValue: this.value
            }
        },
        computed: {
            computedValue: {
                get() {
                    return this.newValue
                },
                set(value) {
                    this.newValue = value
                    this.$emit('input', value)
                }
            }
        },
        watch: {
            /**
             * When v-model change, set internal value.
             */
            value(value) {
                this.newValue = value
            }
        }
    }
</script>
