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

                <b-button
                    label="Now"
                    type="is-primary"
                    icon-left="clock"
                    @click="time = new Date()" />
                <b-button
                    label="Clear"
                    type="is-danger"
                    icon-left="close"
                    outlined
                    @click="time = null" />
            </b-clockpicker>
        </b-field>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BButton, BClockpicker, BField, BSwitch } from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BButton,
        BClockpicker,
        BField,
        BSwitch
    },
    data() {
        return {
            time: new Date() as Date | null,
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
