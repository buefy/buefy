<template>
<div class="datepicker-row">
    <div v-for="day in week"
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
        selectedDate: {
            type: Date,
            required: true
        },
        week: {
            type: Array,
            required: true
        },
        month: {
            type: Number,
            required: true
        }
    },
    methods: {
        emitChosenDate(day) {
            if (day.getMonth() === this.month) {
                this.$emit('select', day)
            }
        },
        classObject(day) {
            function dateMatch(dateOne, dateTwo) {
              return (dateOne.getDate() === dateTwo.getDate() &&
                  dateOne.getFullYear() === dateTwo.getFullYear() &&
                  dateOne.getMonth() === dateTwo.getMonth())
            }

            return {
                selected: dateMatch(day, this.selectedDate),
                today: dateMatch(day, new Date()),
                selectable: (day.getMonth() === this.month),
                unselectable: (day.getMonth() !== this.month)
            }
        }
    }
}

</script>
