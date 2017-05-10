<template>
    <label class="switch" :disabled="disabled" :class="{ 'is-disabled': disabled }">
        <input
            :class="{ 'is-on-off': onOff }"
            type="checkbox"
            :name="name"
            :disabled="disabled"
            v-model="newValue"
            @change="$emit('change', newValue, $event)">
        <span><slot></slot></span>
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
