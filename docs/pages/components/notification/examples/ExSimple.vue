<template>
    <section>
        <b-button text="Toggle" class="block" btn="is-primary" @click="isActive = !isActive" />
        <b-notification :active.sync="isActive">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </b-notification>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isActive: true
            }
        }
    }
</script>
