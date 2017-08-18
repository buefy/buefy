<template>
    <div>
        <div class="content">
            <p>The Loading will be closed after about 10 seconds or by pressing escape or clicking outside</p>
            <button class="button is-primary is-medium" @click="openLoading">Show Loading</button>
            <b-loading :active.sync="isLoading" :canCancel="true"></b-loading>
        </div>
    </div>
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
