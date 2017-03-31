<template>
    <label class="switch" :class="{ 'is-disabled': disabled }">
        <input
            :class="{ 'is-on-off': isOnOff }"
            type="checkbox"
            :name="name"
            :disabled="disabled"
            v-model="newValue">
        <span><slot></slot></span>
    </label>
</template>

<script>
    export default {
        name: 'bSwitch',
        props: {
            value: Boolean,
            disabled: Boolean,
            isOnOff: Boolean,
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
