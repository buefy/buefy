<template>
    <b-field label="Select a date">
        <b-datepicker v-model="date"
            :first-day-of-week="1"
            placeholder="Click to select...">

            <button class="button is-primary"
                @click="date = new Date()">
                <b-icon icon="calendar-today"></b-icon>
                <span>Today</span>
            </button>

            <button class="button is-danger"
                @click="date = null">
                <b-icon icon="close"></b-icon>
                <span>Clear</span>
            </button>
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
