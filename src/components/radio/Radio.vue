<template>
    <label
        ref="label"
        :class="[size, { 'is-disabled': disabled }, class]"
        :disabled="disabled"
        :tabindex="disabled ? false : 0"
        @keydown.prevent.enter.space="$refs.label.click()">
        <input
            v-model="newValue"
            type="radio"
            :disabled="disabled"
            :name="name"
            :value="nativeValue">
        <span class="check"/>
        <span class="control-label"><slot/></span>
    </label>
</template>

<script>
    export default {
        name: 'BRadio',
        props: {
            value: [String, Number, Boolean, Function, Object, Array, Symbol],
            nativeValue: [String, Number, Boolean, Function, Object, Array, Symbol],
            disabled: Boolean,
            name: String,
            size: String,
            class: {
                type: [String, Object],
                default: 'b-radio radio'
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
            }
        }
    }
</script>
