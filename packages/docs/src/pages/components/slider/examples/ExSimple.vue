<template>
    <section>
        <b-field label="Simple">
            <b-slider v-model="value"></b-slider>
        </b-field>

        <b-field label="Disabled">
            <b-slider :model-value="30" disabled></b-slider>
        </b-field>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BField, BSlider } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BField,
            BSlider
        },
        data() {
            return {
                value: 5
            }
        }
    })
</script>
