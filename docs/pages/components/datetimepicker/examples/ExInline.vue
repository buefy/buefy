<template>
    <b-datetimepicker v-model="datetime" inline></b-datetimepicker>
</template>

<script>
    export default {
        data() {
            return {
                datetime: new Date()
            }
        }
    }
</script>
