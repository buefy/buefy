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
                v-model="newValue"
                type="checkbox"
                :disabled="disabled"
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
            name: String,
            size: String,
            type: {
                type: String,
                default: 'is-primary'
            }
        },
        computed: {
            newValue: {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                }
            },
            checked() {
                if (Array.isArray(this.newValue)) {
                    return this.newValue.indexOf(this.nativeValue) >= 0
                }
                return this.newValue === this.nativeValue
            }
        }
    }
</script>
