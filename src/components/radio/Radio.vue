<template>
    <label class="radio"
        :class="{ 'is-disabled': disabled }"
        ref="label"
        :disabled="disabled"
        :tabindex="disabled ? false : 0"
        @keydown.prevent.enter.space="$parent.updateValue(value)">
        <input
            type="radio"
            :disabled="disabled"
            :checked="isChecked"
            :name="name"
            :value="value"
            @change="changed">
        <span class="check"></span>
        <span class="control-label"><slot></slot></span>
    </label>
</template>

<script>
    export default {
        name: 'bRadio',
        props: {
            value: [String, Number, Boolean, Object, Array, Symbol, Function],
            disabled: Boolean,
            name: String
        },
        data() {
            return {
                isChecked: false
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
                throw new Error('You should wrap bRadio on a bRadioGroup')
            }
        }
    }
</script>
