<template>
    <b-field label="Select a date">
        <b-datepicker
            placeholder="Click to select..."
            v-model="dates"
            multiple>
        </b-datepicker>
    </b-field>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BDatepicker, BField } from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BDatepicker,
        BField
    },
    data() {
        return {
            dates: []
        }
    }
})
</script>
