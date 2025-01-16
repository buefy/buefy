<template>
    <b-field label="Select a date">
        <b-datepicker v-model="date"
            :first-day-of-week="1"
            placeholder="Click to select...">

            <b-button
                label="Today"
                type="is-primary"
                icon-left="calendar-today"
                @click="date = new Date()" />

            <b-button
                label="Clear"
                type="is-danger"
                icon-left="close"
                outlined
                @click="date = null" />
        </b-datepicker>
    </b-field>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BButton, BDatepicker, BField } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BButton,
            BDatepicker,
            BField
        },
        data() {
            return {
                date: new Date() as Date | null
            }
        }
    })
</script>
