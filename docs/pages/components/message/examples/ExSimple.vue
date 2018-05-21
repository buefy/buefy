<template>
    <section>
        <b-button text="Toggle" class="block" size="is-medium" @click="isActive = !isActive" />
        <b-message title="Default" :active.sync="isActive">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </b-message>
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
