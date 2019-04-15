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
                editable>
            </b-clockpicker>
        </b-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            isAmPm: false
        }
    },
    computed: {
        format() {
            return this.isAmPm ? '12' : '24'
        }
    }
}
</script>
