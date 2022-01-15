<template>
    <section>
        <b-field label="Select a color">
            <b-colorpicker />
        </b-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            selected: '#FF0000'
        }
    },
    methods: {
        clearColor () {
            this.selected = null
        }
    }
}
</script>
