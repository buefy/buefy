<template>
    <b-field label="Select timepicker">
        <b-timepicker
            placeholder="Click to select"
            icon="clock"
            :incrementMinutes="minutesGranularity"
            :incrementHours="hoursGranularity"
            >
        </b-timepicker>
    </b-field>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { BField, BTimepicker } from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BField,
        BTimepicker
    },
    data() {
        return {
            minutesGranularity: 15,
            hoursGranularity: 2
        }
    }
})
</script>>
