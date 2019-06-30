<template>
    <div class="control">
        <label
            class="b-checkbox checkbox button"
            ref="label"
            :class="[checked ? type : null, size, {
                'is-disabled': disabled,
                'is-focused': isFocused
            }]"
            :disabled="disabled"
            @keydown.prevent.enter="$refs.label.click()">
            <slot/>
            <input
                v-model="computedValue"
                type="checkbox"
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
                newValue: this.value,
                isFocused: false
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
