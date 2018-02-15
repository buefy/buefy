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
                v-model="newValue"
                type="radio"
                :disabled="disabled"
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
            name: String,
            size: String
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
