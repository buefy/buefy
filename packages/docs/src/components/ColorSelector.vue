<template>
    <b-select v-model="color">
        <option value="is-primary">
            Primary
        </option>
        <option value="is-success">
            Success
        </option>
        <option value="is-danger">
            Danger
        </option>
        <option value="is-warning">
            Warning
        </option>
        <option value="is-info">
            Info
        </option>
        <option value="is-link">
            Link
        </option>
        <option value="is-light">
            Light
        </option>
        <option value="is-dark">
            Dark
        </option>
        <option value="is-text">
            Text
        </option>
        <option value="is-ghost">
            Ghost
        </option>
    </b-select>
</template>

<script>
export default {
    name: 'ColorSelector',

    props: {
        modelValue: {
            type: String,
            default: 'is-primary'
        }
    },

    emits: ['update:modelValue'],

    data() {
        return {
            color: 'is-primary'
        }
    },

    watch: {
        modelValue(value) {
            this.color = value
        },
        color(value) {
            this.$emit('update:modelValue', value)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
