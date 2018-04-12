<template>
    <b-clockpicker v-model="time" inline></b-clockpicker>
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
