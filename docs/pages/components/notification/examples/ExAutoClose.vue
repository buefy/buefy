<template>
    <section>
        <button class="button block" @click="isActive = true" :disabled="isActive">Show</button>
        <b-notification
            auto-close type="is-danger"
            :active.sync="isActive"
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
