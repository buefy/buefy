<template>
    <section>
        <b-field>
            <b-switch v-model="isAmPm">AM/PM</b-switch>
        </b-field>
        <b-field label="Select timepicker">
            <b-clockpicker
                placeholder="Type or select a date..."
                icon="clock"
                :hour-format="format"
                :readonly="false">
            </b-clockpicker>
        </b-field>
    </section>
</template>

<script>
import PeriodSelectMixin from './PeriodSelectMixin'

export default {
    mixins: [ PeriodSelectMixin ]
}
</script>
