<template>
    <section>
        <b-field grouped group-multiline>
            <b-field>
                <div class="control">
                    <b-switch v-model="disableWeekends">No weekends</b-switch>
                </div>
            </b-field>
            <b-field>
                Dates after
                <b-input type="number" min="0" max="31" v-model.number="unselectableAfterDate" />
                are unselectable.
            </b-field>
        </b-field>
        <b-datepicker v-model="date"
            inline
            :unselectable-dates="unselectableDates"
            :unselectable-days-of-week="disableWeekends ? [0, 6] : null">
        </b-datepicker>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                date: new Date(),
                disableWeekends: false,
                unselectableAfterDate: 20
            }
        },
        methods: {
            unselectableDates(day) {
                return this.unselectableAfterDate < day.getDate()
            }
        }
    }
</script>
