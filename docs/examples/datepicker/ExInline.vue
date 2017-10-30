<template>
    <b-datepicker v-model="date" inline></b-datepicker>
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
