<template>
    <p class="control">
        <button
            type="button"
            class="radio button"
            :disabled="disabled"
            :class="[isChecked ? type : null, size]"
            @click="changed">
            <slot></slot>
            <input
                type="radio"
                :disabled="disabled"
                :checked="isChecked"
                :name="name"
                :value="value">
        </button>
    </p>
</template>

<script>
    export default {
        name: 'bRadioButton',
        props: {
            value: [String, Number, Boolean],
            type: {
                type: String,
                default: 'is-primary'
            },
            disabled: Boolean,
            name: String
        },
        data() {
            return {
                size: null,
                isChecked: false,
                _isRadioButton: true // Used internally by Radio Group
            }
        },
        methods: {
            /**
             * Input change listener.
             * Call updateValue from parent.
             */
            changed(event) {
                this.$parent.updateValue(this.value, event)
            }
        },
        created() {
            if (!this.$parent.$data._isRadioGroup) {
                this.$destroy()
                throw new Error('You should wrap bRadioButton on a bRadioGroup')
            }
        }
    }
</script>
