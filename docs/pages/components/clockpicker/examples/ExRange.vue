<template>
    <div>
        <div class="columns">
            <div class="column">
                <b-field>
                    <b-switch v-model="isAmPm">AM/PM</b-switch>
                </b-field>
            </div>
            <div class="column">
                <b-field label="Min Time">
                    <b-clockpicker v-model="minTime" :hour-format="format"></b-clockpicker>
                </b-field>
            </div>
            <div class="column">
                <b-field label="Max Time">
                    <b-clockpicker v-model="maxTime" :hour-format="format"></b-clockpicker>
                </b-field>
            </div>
        </div>
        <b-field label="Select time">
            <b-clockpicker
                placeholder="Click to select..."
                :hour-format="format"
                :min-time="minTime"
                :max-time="maxTime">
            </b-clockpicker>
        </b-field>

    </div>
</template>

<script>
export default {
    data() {
        const min = new Date()
        min.setHours(9)
        min.setMinutes(0)
        const max = new Date()
        max.setHours(18)
        max.setMinutes(0)
        return {
            minTime: min,
            maxTime: max,
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
