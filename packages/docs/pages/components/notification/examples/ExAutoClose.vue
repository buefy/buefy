<template>
    <section>
        <b-button
            label="Show"
            :disabled="isActive"
            @click="isActive = true" />
        <b-notification
            auto-close 
            type="is-danger"
            v-model="isActive"
            aria-close-label="Close notification">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </b-notification>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isActive: false
            }
        }
    }
</script>
