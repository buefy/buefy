<template>
<div class="datepicker-row">
    <div
      v-for="day in week"
      :key="day.getDate()"
      class="datepicker-cell"
      :class="classObject(day)"
      @click="emitChosenDate(day)">
        {{day.getDate()}}
    </div>
</div>
</template>

<script>
export default {
    name: 'bDatepickerTableRow',
    props: {
        selectedDate: Date,
        week: {
            type: Array,
            required: true
        },
        month: {
            type: Number,
            required: true
        },
        earliestDate: Date,
        latestDate: Date
    },
    methods: {
        /*
         * Check that selected day is within earliest/latest params and
         * is within this month
         */
        selectableDate(day) {
            const validity = []

            if (this.earliestDate) {
                validity.push(day >= this.earliestDate)
            }

            if (this.latestDate) {
                validity.push(day <= this.latestDate)
            }

            validity.push(day.getMonth() === this.month);

            return !validity.includes(false)
        },

        /*
         * Emit select event with chosen date as payload
         */
        emitChosenDate(day) {
            if (this.selectableDate(day)) {
                this.$emit('select', day)
            }
        },

        /*
         * Build classObject for cell using validations
         */
        classObject(day) {
            function dateMatch(dateOne, dateTwo) {
                // if either date is null or undefined, return false
                if (!dateOne || !dateTwo) {
                  return false
                }

                return (dateOne.getDate() === dateTwo.getDate() &&
                    dateOne.getFullYear() === dateTwo.getFullYear() &&
                    dateOne.getMonth() === dateTwo.getMonth())
            }

            return {
                selected: dateMatch(day, this.selectedDate),
                today: dateMatch(day, new Date()),
                selectable: this.selectableDate(day),
                unselectable: !this.selectableDate(day)
            }
        }
    }
}
</script>
