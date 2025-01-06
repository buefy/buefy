<script setup lang="ts">
    import { BProgress } from '@ntohq/buefy-next'
</script>

<template>
    <section>
        <b-progress
            :rounded="false"
            :value="40"
            type="is-success"
            show-value
        ></b-progress>

        <b-progress
            :rounded="false"
            :value="80"
            type="is-success"
            show-value
            format="percent"
        ></b-progress>
    </section>
</template>
