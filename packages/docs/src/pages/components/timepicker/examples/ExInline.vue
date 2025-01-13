<template>
    <b-timepicker v-model="time" inline></b-timepicker>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BTimepicker } from '@ntohq/buefy-next'

    export default {
        components: { BTimepicker },
        data() {
            return {
                time: new Date()
            }
        }
    }
</script>
