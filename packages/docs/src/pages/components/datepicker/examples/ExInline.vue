<template>
    <b-datepicker v-model="date" 
        inline 
        :unselectable-days-of-week="[0, 6]">
    </b-datepicker>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BDatepicker } from '@ntohq/buefy-next'

    export default defineComponent({
        components: { BDatepicker },
        data() {
            return {
                date: new Date()
            }
        }
    })
</script>
