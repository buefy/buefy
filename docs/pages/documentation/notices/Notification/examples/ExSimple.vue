<template>
    <div>
        <button class="button block" @click="isActive = !isActive">Toggle</button>
        <b-notification :active.sync="isActive">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </b-notification>
    </div>
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
