<template>
    <b-field label="Select datetime">
        <b-datetimepicker v-model="datetime"
            placeholder="Click to select...">
            <template slot="left">
                <button class="button is-primary"
                    @click="datetime = new Date()">
                    <b-icon icon="clock"></b-icon>
                    <span>Now</span>
                </button>
            </template>
            <template slot="right">
                <button class="button is-danger"
                    @click="datetime = null">
                    <b-icon icon="close"></b-icon>
                    <span>Clear</span>
                </button>
            </template>
        </b-datetimepicker>
    </b-field>
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
