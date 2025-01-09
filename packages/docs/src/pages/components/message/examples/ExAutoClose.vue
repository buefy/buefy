<template>
    <section>
        <b-button
            label="Show"
            :disabled="isActive"
            @click="isActive = true" />
        <b-message
            auto-close title="Error!"
            type="is-danger"
            has-icon
            v-model="isActive"
            aria-close-label="Close message"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </b-message>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BButton, BMessage } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BButton,
            BMessage
        },
        data() {
            return {
                isActive: false
            }
        }
    })
</script>
