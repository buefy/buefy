<template>
    <label class="switch"
        :class="[size, { 'is-disabled': disabled }]"
        ref="label"
        :disabled="disabled"
        :tabindex="disabled ? false : 0"
        @keydown.prevent.enter.space="newValue = !newValue">
        <input
            type="checkbox"
            :name="name"
            :disabled="disabled"
            v-model="newValue"
            @change="$emit('change', newValue, $event)">
        <span class="check" ref="check"></span>
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
        },
        mounted() {
            // Wait the animation time before setting the duration
            // or else it'll fire at page load
            setTimeout(() => {
                // With <keep-alive> the check is undefined
                if (this.$refs.check === undefined) return

                this.$refs.check.classList.add('is-animated')
            }, 500)
        }
    }
</script>
