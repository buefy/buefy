<template>
    <b-field label="Select datetime">
        <b-datetimepicker
            placeholder="Click to select..."
            :min-datetime="minDatetime"
            :max-datetime="maxDatetime">
        </b-datetimepicker>
    </b-field>
</template>

<script>
    export default {
        data() {
            const min = new Date()
            min.setDate(min.getDate() - 7)
            min.setHours(9)
            min.setMinutes(0)
            min.setSeconds(0)
            const max = new Date()
            max.setDate(max.getDate() + 7)
            max.setHours(18)
            max.setMinutes(0)
            max.setSeconds(0)
            return {
                minDatetime: min,
                maxDatetime: max
            }
        }
    }
</script>
