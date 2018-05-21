<template>
    <b-field label="Select a date">
        <b-datepicker v-model="date"
            :first-day-of-week="1"
            placeholder="Click to select...">

            <b-button
                text="Today"
                btn="is-primary"
                icon="calendar-today"
                @click="date = new Date()"
            />

            <b-button
                text="Clear"
                btn="is-danger"
                icon="close"
                @click="date = null"
            />
        </b-datepicker>
    </b-field>
</template>

<script>
    export default {
        data() {
            return {
                date: new Date()
            }
        }
    }
</script>
