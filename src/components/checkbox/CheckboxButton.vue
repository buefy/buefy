<template>
    <div class="control">
        <label
            class="b-checkbox checkbox button"
            ref="label"
            :class="[checked ? type : null, size, { 'is-disabled': disabled }]"
            :disabled="disabled"
            :tabindex="disabled ? false : 0"
            @keydown.prevent.enter.space="$refs.label.click()">
            <slot/>
            <input
                v-model="computedValue"
                type="checkbox"
                :disabled="disabled"
                :required="required"
                :name="name"
                :value="nativeValue">
        </label>
    </div>
</template>

<script>
    export default {
        name: 'BCheckboxButton',
        props: {
            value: [String, Number, Boolean, Function, Object, Array, Symbol],
            nativeValue: [String, Number, Boolean, Function, Object, Array, Symbol],
            disabled: Boolean,
            required: Boolean,
            name: String,
            size: String,
            type: {
                type: String,
                default: 'is-primary'
            }
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
            },
            checked() {
                if (Array.isArray(this.newValue)) {
                    return this.newValue.indexOf(this.nativeValue) >= 0
                }
                return this.newValue === this.nativeValue
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
