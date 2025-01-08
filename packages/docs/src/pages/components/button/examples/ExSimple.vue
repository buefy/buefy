<template>
    <section>
        <b-button @click="clickMe">Click Me</b-button>
    </section>
</template>

<script lang="ts">
    import { BButton } from '@ntohq/buefy-next'

    export default {
        components: { BButton },
        methods: {
            clickMe() {
                this.$buefy.notification.open('Clicked!!')
            }
        }
    }
</script>
