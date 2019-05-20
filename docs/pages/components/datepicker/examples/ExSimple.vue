<template>
    <b-field label="Select a date">
        <b-datepicker v-model="time"
            placeholder="Click to select..."
            icon="calendar-today">
        </b-datepicker>
        {{!time ? 'nd' : time.toString()}}
    </b-field>
</template>

<script>
export default {
    data() {
        return {
            time: null
        }
    }
}
</script>
