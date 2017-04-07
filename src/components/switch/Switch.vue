<template>
    <label class="switch" :class="{ 'is-disabled': disabled }">
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
                newValue: this.value
            }
        },
        watch: {
            newValue(value) {
                this.$emit('input', value)
            }
        },
        mounted() {
            if (this.checked) {
                this.newValue = this.checked
            }
        }
    }
</script>
