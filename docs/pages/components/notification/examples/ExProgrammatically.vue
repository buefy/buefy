<template>
    <section>
        <button class="button is-medium" @click="simple">
            Launch notification (default)
        </button>

        <button class="button is-medium is-success" @click="success">
            Launch notification (custom)
        </button>

        <button class="button is-medium is-danger" @click="danger">
            Launch notification (custom)
        </button>
    </section>
</template>

<script>
    export default {
        methods: {
            simple() {
                this.$notification.open('Something happened')
            },
            success() {
                this.$notification.open({
                    message: 'Something happened correctly!',
                    type: 'is-success'
                })
            },
            danger() {
                this.$notification.open({
                    duration: 5000,
                    message: `Something's not good, also I'm on bottom`,
                    position: 'is-bottom-right',
                    type: 'is-danger',
                    hasIcon: true
                })
            }
        }
    }
</script>
