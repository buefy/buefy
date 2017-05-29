<template>
    <label class="switch"
        :class="{ 'is-disabled': disabled }"
        ref="label"
        :disabled="disabled"
        :tabindex="disabled ? false : 0"
        @keydown.prevent.enter.space="newValue = !newValue">
        <input
            :class="{ 'is-on-off': onOff }"
            type="checkbox"
            :name="name"
            :disabled="disabled"
            v-model="newValue"
            @change="$emit('change', newValue, $event)">
        <span class="check"></span>
        <span class="label"><slot></slot></span>
    </label>
</template>

<script>
    export default {
        name: 'bSwitch',
        props: {
            value: Boolean,
            disabled: Boolean,
            onOff: Boolean,
            name: String,
            checked: Boolean
        },
        data() {
            return {
                newValue: this.value || this.checked
            }
        },
        watch: {
            /**
             * When v-model change, set internal value.
             */
            value(value) {
                this.newValue = value
            },

            /**
             * Emit input event to update the user v-model.
             */
            newValue(value) {
                this.$emit('input', value)
            }
        }
    }
</script>
