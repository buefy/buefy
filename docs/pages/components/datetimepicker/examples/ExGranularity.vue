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
<script>
export default {
    data() {
        return {
            timepicker: {
                incrementMinutes: 15,
                incrementHours: 2
            }
        }
    },
}
</script>