<template>
    <section>
        <b-field>
            <b-switch v-model="formatAmPm">AM/PM</b-switch>
        </b-field>
        <b-field label="Select time">
            <b-timepicker
                rounded
                placeholder="Click to select..."
                icon="clock"
                :hour-format="format">
            </b-timepicker>
        </b-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            formatAmPm: false
        }
    },
    computed: {
        format() {
            return this.formatAmPm ? '12' : '24'
        }
    }
}
</script>
