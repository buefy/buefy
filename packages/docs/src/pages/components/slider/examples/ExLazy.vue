<template>
    <section>
        <b-field grouped>
            <b-input v-model="value" type="number"></b-input>
        </b-field>
        <b-field>
            <b-slider v-model="value" lazy></b-slider>
        </b-field>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BField, BInput, BSlider } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BField,
            BInput,
            BSlider
        },
        data() {
            return {
                value: 20
            }
        }
    })
</script>
