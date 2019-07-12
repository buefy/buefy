<template>
    <section>
        <b-field>
            <b-slider type="is-primary" v-model="number"></b-slider>
        </b-field>
            <b-slider size="is-large" v-model="number2" :showTooltip="false"></b-slider>
        <b-field>
            <b-slider></b-slider>
        </b-field>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                number: NaN,
                number2: 12
            }
        }
    }
</script>
