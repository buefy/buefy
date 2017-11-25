<template>
    <button class="button is-primary is-medium"
        @click="open">
        Launch loading
    </button>
</template>

<script>
    export default {
        methods: {
            open() {
                const loadingComponent = this.$loading.open()
                setTimeout(() => loadingComponent.close(), 3 * 1000)
            }
        }
    }
</script>
