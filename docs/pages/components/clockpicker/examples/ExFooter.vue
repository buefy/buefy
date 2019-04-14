<template>
    <section>
        <b-field>
            <b-switch v-model="isAmPm">AM/PM</b-switch>
        </b-field>
        <b-field label="Select time">
            <b-clockpicker
                v-model="time"
                placeholder="Click to select..."
                :hour-format="format">

                <button class="button is-primary"
                    @click="time = new Date()">
                    <b-icon icon="clock"></b-icon>
                    <span>Now</span>
                </button>

                <button class="button is-danger"
                    @click="time = null">
                    <b-icon icon="close"></b-icon>
                    <span>Clear</span>
                </button>
            </b-clockpicker>
        </b-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            time: new Date(),
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
