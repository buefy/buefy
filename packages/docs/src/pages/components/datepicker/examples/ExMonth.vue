<template>
    <b-field label="Select a date">
        <b-datepicker
            type="month"
            placeholder="Click to select..."
            icon="calendar-today"
            trap-focus>
        </b-datepicker>
    </b-field>
</template>

<script setup lang="ts">
import { BDatepicker, BField } from '@ntohq/buefy-next'
</script>
