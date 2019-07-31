<template>
    <b-field label="Select a date">
        <b-datepicker
            placeholder="Click to select..."
            v-model="dates"
            range>
        </b-datepicker>
    </b-field>
</template>

<script>
export default {
    data() {
        const today = new Date()
        return {
            dates: [
                today,
                new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)
            ]
        }
    }
}
</script>
