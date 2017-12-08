<template>
    <b-timepicker v-model="time" inline></b-timepicker>
</template>

<script>
    export default {
        data() {
            return {
                time: new Date()
            }
        }
    }
</script>
