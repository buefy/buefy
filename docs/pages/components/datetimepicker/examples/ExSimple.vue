<template>
    <section>
        <b-field grouped group-multiline>
            <div class="control">
                <b-switch v-model="showWeekNumber">Show week number</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="formatAmPm">AM/PM</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="enableSeconds">Enable seconds</b-switch>
            </div>
        </b-field>
        <b-field label="Select datetime">
            <b-datetimepicker
                rounded
                placeholder="Click to select..."
                icon="calendar-today"
                :datepicker="{ showWeekNumber }"
                :timepicker="{ enableSeconds, hourFormat: format }"
                horizontal-time-picker>
            </b-datetimepicker>
        </b-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            showWeekNumber: false,
            formatAmPm: false,
            enableSeconds: false
        }
    },
    computed: {
        format() {
            return this.formatAmPm ? '12' : '24'
        }
    }
}
</script>
