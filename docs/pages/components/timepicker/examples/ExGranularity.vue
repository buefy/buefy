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
<script>
export default {
    data() {
        return {
            minutesGranularity: 15,
            hoursGranularity: 2
        }
    }
}
</script>>