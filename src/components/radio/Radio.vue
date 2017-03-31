<template>
    <p class="control">
        <label class="radio" :class="{ 'is-disabled': disabled }">
            <input
                type="radio"
                :disabled="disabled"
                :checked="isChecked"
                :name="name"
                :value="this.label"
                @change="changed">
            <span><slot></slot></span>
        </label>
    </p>
</template>

<script>
    export default {
        name: 'bRadio',
        props: {
            disabled: Boolean,
            name: String,
            label: [String, Number, Boolean]
        },
        data() {
            return {
                isChecked: false
            }
        },
        methods: {
            changed() {
                this.$parent.updateValue(this.label)
            }
        }
    }
</script>
