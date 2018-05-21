<template>
    <b-field label="Select time">
        <b-timepicker v-model="time"
            placeholder="Click to select...">

            <b-button text="Now" btn="is-primary" icon="clock" @click="time = new Date()" />

            <b-button text="Clear" btn="is-danger" icon="clock" @click="time = null" />
        </b-timepicker>
    </b-field>
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
