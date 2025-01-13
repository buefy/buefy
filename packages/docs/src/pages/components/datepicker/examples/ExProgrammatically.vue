<template>
    <section>
        <b-field>
            <b-datepicker
                ref="datepicker"
                expanded
                placeholder="Select a date">
            </b-datepicker>
            <b-button
                @click="($refs.datepicker as InstanceType<typeof BDatepicker>).toggle()"
                icon-left="calendar-today"
                type="is-primary" />
        </b-field>
    </section>
</template>

<script setup lang="ts">
import { BButton, BDatepicker, BField } from '@ntohq/buefy-next'
</script>
