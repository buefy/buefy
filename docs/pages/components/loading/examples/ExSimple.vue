<template>
    <section>
        <b-field>
            <b-button text="Launch loading" btn="is-primary" size="is-medium" @click="openLoading" />
        </b-field>
        <b-field>
            <b-switch v-model="isFullPage">Display loader over full page</b-switch>
        </b-field>
        <b-notification :closable="false">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
            <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :canCancel="true"></b-loading>
        </b-notification>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isLoading: false,
                isFullPage: true
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
