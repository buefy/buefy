<template>
    <b-datetimepicker v-model="datetime" inline></b-datetimepicker>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BDatetimepicker } from "buefy";

export default defineComponent({
    components: { BDatetimepicker },
    data() {
        return {
            datetime: new Date(),
        };
    },
});
</script>
