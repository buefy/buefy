<template>
    <section>
        <b-field label="Simple">
            <b-slider v-model="value"></b-slider>
        </b-field>

        <b-field label="Disabled">
            <b-slider disabled></b-slider>
        </b-field>

        <p>Temporary test for use with horizontal field</p>
        <b-field label="slider" horizontal>
            <b-slider></b-slider>
        </b-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                value: 5
            }
        }
    }
</script>
