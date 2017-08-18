<template>
    <div class="block">
        <button class="button is-medium" @click="toast">
            Toast (default)
        </button>

        <button class="button is-medium is-success" @click="success">
            Toast (custom)
        </button>

        <button class="button is-medium is-danger" @click="danger">
            Toast (custom)
        </button>
    </div>
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
