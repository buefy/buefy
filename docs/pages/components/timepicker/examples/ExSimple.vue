<template>
    <section>
        <b-field grouped group-multiline>
            <div class="control">
                <b-switch v-model="formatAmPm">AM/PM</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="enableSeconds">Enable seconds</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="isReset">Reset on change</b-switch>
            </div>
        </b-field>
        <b-field label="Select time">
            <b-timepicker
                rounded
                placeholder="Click to select..."
                icon="clock"
                :enable-seconds="enableSeconds"
                :hour-format="format"
                :reset-on-meridian-change="isReset">
            </b-timepicker>
        </b-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            formatAmPm: false,
            enableSeconds: false,
            isReset: false
        }
    },
    computed: {
        format() {
            return this.formatAmPm ? '12' : '24'
        }
    }
}
</script>
