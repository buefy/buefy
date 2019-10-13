<template>
    <b-field label="Select a date">
        <b-datepicker
            placeholder="Click to select..."
            v-model="dates"
            multiple>
        </b-datepicker>
    </b-field>
</template>

<script>
export default {
    data() {
        return {
            dates: []
        }
    }
}
</script>
