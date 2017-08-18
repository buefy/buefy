<template>
    <section>
        <button class="button is-primary is-medium"
            @click="openLoading">
            Launch loading
        </button>

        <b-loading :active.sync="isLoading" :canCancel="true"></b-loading>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isLoading: false
            }
        },
        methods: {
            openLoading() {
                const vm = this
                vm.isLoading = true
                setTimeout(() => {
                    vm.isLoading = false
                }, 10 * 1000)
            }
        }
    }
</script>
