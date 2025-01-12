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

<script lang="ts">
import { defineComponent } from 'vue'
import { BClockpicker, BField, BSwitch } from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BClockpicker,
        BField,
        BSwitch
    },
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
})
</script>
