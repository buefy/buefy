<template>
    <section>
        <b-button
            label="Toggle"
            class="block"
            @click="isActive = !isActive" />
        <b-notification 
            v-model="isActive" 
            aria-close-label="Close notification">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </b-notification>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BButton, BNotification } from '@ntohq/buefy-next'

    export default {
        components: {
            BButton,
            BNotification
        },
        data() {
            return {
                isActive: true
            }
        }
    }
</script>
