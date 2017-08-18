<template>
    <div class="content">
        <p>When you want to close the Loading, call the 'close' method from the component</p>
        <button class="button is-primary is-medium" @click="openProgrammaticallyLoading">Show Loading</button>
    </div>
</template>

<script>
    export default {
        methods: {
            openProgrammaticallyLoading() {
                const loadingComponent = this.$loading.open()
                setTimeout(() => {
                    loadingComponent.close()
                }, 3 * 1000)
            }
        }
    }
</script>
