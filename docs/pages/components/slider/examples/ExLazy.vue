<template>
    <section>
        <b-field grouped>
            <b-field expanded>
                <b-slider v-model="value" lazy></b-slider>
            </b-field>
            <b-field>
                <b-input v-model="value" type="number"></b-input>
            </b-field>
        </b-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                value: 20
            }
        }
    }
</script>
