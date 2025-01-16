<template>
    <section>
        <b-field label="Select a color">
            <b-colorpicker :model-value="selected" representation="square" inline/>
        </b-field>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BColorpicker, BField, Color } from '@ntohq/buefy-next'

export default defineComponent({
    data() {
        return {
            selected: Color.parse('red')
        }
    }
})
</script>
