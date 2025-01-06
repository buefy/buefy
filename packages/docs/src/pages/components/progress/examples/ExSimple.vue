<script setup lang="ts">
    import { BProgress } from '@ntohq/buefy-next'
</script>

<template>
    <section>
        <b-progress></b-progress>

        <b-progress :value="20"></b-progress>

        <b-progress :value="40" show-value></b-progress>

        <b-progress :value="80" show-value format="percent"></b-progress>
    </section>
</template>
