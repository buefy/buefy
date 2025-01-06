<script setup lang="ts">
    import { BField, BSwitch } from '@ntohq/buefy-next'
</script>

<template>
    <section>
        <b-field>
            <b-switch size="is-small">Small</b-switch>
        </b-field>
        <b-field>
            <b-switch>Default</b-switch>
        </b-field>
        <b-field>
            <b-switch size="is-medium">Medium</b-switch>
        </b-field>
        <b-field>
            <b-switch size="is-large">Large</b-switch>
        </b-field>
    </section>
</template>
