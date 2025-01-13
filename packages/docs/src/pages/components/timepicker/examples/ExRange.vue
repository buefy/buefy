<template>
    <b-field label="Select time">
        <b-timepicker
            placeholder="Click to select..."
            :min-time="minTime"
            :max-time="maxTime">
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
            const min = new Date()
            min.setHours(9)
            min.setMinutes(0)
            const max = new Date()
            max.setHours(18)
            max.setMinutes(0)
            return {
                minTime: min,
                maxTime: max
            }
        }
    })
</script>
