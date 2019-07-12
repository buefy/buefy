<template>
    <section>
        <b-field>
            <b-slider v-model="values" :min="1" :max="15" :step="0.5"  @change="log" show-ticks>
            </b-slider>
        </b-field>

        <b-field>
            <b-slider v-model="values2" type="is-warning" :min="3" :max="8" :step="2" @change="log2" show-ticks>
            </b-slider>
        </b-field>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                number: 10,
                number2: 12,
                values: [2, 5],
                values2: [2, 7]
            }
        },
        methods: {
            log() {
                console.log("run")
            },
            log2(v) {
                console.log("change: " + v)
            }
        }
    }
</script>