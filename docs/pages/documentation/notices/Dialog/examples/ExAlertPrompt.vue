<template>
    <section>
        <button class="button is-medium is-dark" @click="prompt">
            Launch prompt
        </button>
    </section>
</template>

<script>
    export default {
        methods: {
            prompt() {
                this.$dialog.prompt({
                    message: `What's your name?`,
                    inputMaxlength: 20,
                    inputPlaceholder: 'e.g. John Doe',
                    inputDefaultValue: 'Walter',
                    onConfirm: (value) => this.$toast.open('Your name is: ' + value)
                })
            }
        }
    }
</script>
