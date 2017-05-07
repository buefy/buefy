<template>
    <label class="radio" :disabled="disabled" :class="{ 'is-disabled': disabled }">
        <input
            type="radio"
            :disabled="disabled"
            :checked="isChecked"
            :name="name"
            :value="this.value"
            @change="changed">
        <span><slot></slot></span>
    </label>
</template>

<script>
    export default {
        name: 'bRadio',
        props: {
            value: [String, Number, Boolean],
            disabled: Boolean,
            name: String
        },
        data() {
            return {
                isChecked: false
            }
        },
        methods: {
            changed(event) {
                this.$parent.updateValue(this.value, event)
            }
        },
        created() {
            if (!this.$parent.isRadioGroupComponent) {
                this.$destroy()
                throw new Error('You should wrap bRadio on a bRadioGroup')
            }
        }
    }
</script>
