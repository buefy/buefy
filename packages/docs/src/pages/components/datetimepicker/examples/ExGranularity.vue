<template>
    <b-field label="Select datetime">
        <b-datetimepicker
            placeholder="Select a date"
            icon="calendar-today"
            :timepicker="timepicker"
            >
        </b-datetimepicker>
    </b-field>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { BDatetimepicker, BField } from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BDatetimepicker,
        BField
    },
    data() {
        return {
            timepicker: {
                incrementMinutes: 15,
                incrementHours: 2
            }
        }
    },
})
</script>
