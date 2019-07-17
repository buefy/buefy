<template>
    <section>
        <b-field>
            <b-slider v-model="numbers" :min="1" :max="15" :step="0.5" ticks>
            </b-slider>
        </b-field>

        <b-field>
            <b-slider v-model="numbers2" type="is-danger" :min="-2" :max="8" :step="2">
            </b-slider>
        </b-field>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                numbers: [2, 5],
                numbers2: [2, 6]
            }
        }
    }
</script>