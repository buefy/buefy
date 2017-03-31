<template>
    <p class="control">
        <button
            class="radio radio-button button"
            :class="[isChecked ? type : '', { 'is-disabled': disabled }]"
            @click="changed">
            <slot></slot>
            <input
                type="radio"
                :disabled="disabled"
                :checked="isChecked"
                :name="name"
                :value="this.label">
        </button>
    </p>
</template>

<script>
    export default {
        name: 'bRadioButton',
        props: {
            type: {
                type: String,
                default: 'is-primary'
            },
            disabled: Boolean,
            name: String,
            label: [String, Number, Boolean]
        },
        data() {
            return {
                isChecked: false,
                isRadioButton: true
            }
        },
        methods: {
            changed() {
                this.$parent.updateValue(this.label)
            }
        }
    }
</script>
