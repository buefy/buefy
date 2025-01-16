<template>
    <b-field label="Select time">
        <b-timepicker v-model="time"
            placeholder="Click to select...">

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
        </b-timepicker>
    </b-field>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BButton, BField, BTimepicker } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BButton,
            BField,
            BTimepicker
        },
        data() {
            return {
                time: new Date() as Date | null
            }
        }
    })
</script>
