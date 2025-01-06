<script setup lang="ts">
    import { BProgress } from '@ntohq/buefy-next'
</script>

<template>
    <section>
        <b-progress :value="20" show-value></b-progress>

        <b-progress
            type="is-danger"
            :value="40"
            show-value
        ></b-progress>

        <b-progress
            type="is-success"
            :value="60"
            show-value
        ></b-progress>

        <b-progress
            type="is-info"
            :value="80"
            show-value
        ></b-progress>

        <b-progress
            type="is-warning"
            :value="100"
            show-value
         ></b-progress>
    </section>
</template>
