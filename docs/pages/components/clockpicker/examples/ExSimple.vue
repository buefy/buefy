<template>
    <section>
        <b-field>
            <b-switch v-model="isAmPm">AM/PM</b-switch>
        </b-field>
        <b-field label="Select time">
            <b-clockpicker
                rounded
                placeholder="Click to select..."
                icon="clock"
                :hour-format="format">
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
