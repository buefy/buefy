<template>
    <b-field label="Select time">
        <b-timepicker v-model="time"
            placeholder="Click to select...">

            <button class="button is-primary"
                @click="time = new Date()">
                <b-icon icon="access_time"></b-icon>
                <span>Now</span>
            </button>

            <button class="button is-danger"
                @click="time = null">
                <b-icon icon="clear"></b-icon>
                <span>Clear</span>
            </button>
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
