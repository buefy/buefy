<template>
    <section>
        <button class="button block" @click="isActive = true" :disabled="isActive">Show</button>
        <b-message auto-close title="Error!" type="is-danger" has-icon :active.sync="isActive" aria-close-label="Close message">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </b-message>
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
