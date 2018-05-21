<template>
    <section>
        <b-button text="Launch toast (default)" size="is-medium" @click="toast" />

        <b-button text="Launch toast (custom)" size="is-medium" btn="is-success" @click="success" />

        <b-button text="Launch toast (custom)" size="is-medium" btn="is-danger" @click="danger" />
    </section>
</template>

<script>
    export default {
        methods: {
            toast() {
                this.$toast.open('Something happened')
            },
            success() {
                this.$toast.open({
                    message: 'Something happened correctly!',
                    type: 'is-success'
                })
            },
            danger() {
                this.$toast.open({
                    duration: 5000,
                    message: `Something's not good, also I'm on bottom`,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            }
        }
    }
</script>
