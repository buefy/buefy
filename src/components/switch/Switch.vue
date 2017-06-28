<template>
    <label class="switch"
        :class="[size, { 'is-disabled': disabled }]"
        ref="label"
        :disabled="disabled"
        :tabindex="disabled ? false : 0"
        @keydown.prevent.enter.space="updateValue(!newValue, $event)"
        @mousedown="isMouseDown = true"
        @mouseup="isMouseDown = false"
        @mouseout="isMouseDown = false"
        @blur="isMouseDown = false"
        >
        <input
            type="checkbox"
            :name="name"
            :disabled="disabled"
            v-model="newValue"
            @change="updateValue(newValue, $event)">
        <span class="check" :class="{ 'is-elastic': isMouseDown }"></span>
        <span class="control-label"><slot></slot></span>
    </label>
</template>

<script>
    export default {
        name: 'bSwitch',
        props: {
            value: Boolean,
            disabled: Boolean,
            name: String,
            checked: Boolean,
            size: String
        },
        data() {
            return {
                newValue: this.value || this.checked,
                isMouseDown: false
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
        },
        methods: {
            /**
             * Set the newValue.
             * Emit change event.
             */
            updateValue(newValue, $event) {
                this.newValue = newValue
                this.$emit('change', newValue, $event)
            }
        }
    }
</script>
