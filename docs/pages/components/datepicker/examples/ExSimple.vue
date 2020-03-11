<template>
    <section>
        <b-field>
            <div class="control">
                <b-switch v-model="showWeekNumber">Show week number</b-switch>
            </div>
        </b-field>
        <b-field label="Select a date">
            <b-datepicker
                :show-week-number="showWeekNumber"
                placeholder="Click to select..."
                icon="calendar-today"
                trap-focus>
            </b-datepicker>
        </b-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            showWeekNumber: false
        }
    }
}
</script>

