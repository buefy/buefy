<template>
    <section>
        <button class="button is-medium is-dark" @click="prompt">
            Launch prompt (default)
        </button>

        <button class="button is-medium is-dark" @click="promptNumber">
            Launch prompt (number)
        </button>
    </section>
</template>

<script>
    export default {
        methods: {
            prompt() {
                this.$dialog.prompt({
                    message: `What's your name?`,
                    inputAttrs: {
                        placeholder: 'e.g. Walter',
                        maxlength: 10
                    },
                    onConfirm: (value) => this.$toast.open(`Your name is: ${value}`)
                })
            },
            promptNumber() {
                this.$dialog.prompt({
                    message: `What's your age?`,
                    inputAttrs: {
                        type: 'number',
                        placeholder: 'Type your age',
                        value: '18',
                        maxlength: 2,
                        min: 18
                    },
                    onConfirm: (value) => this.$toast.open(`Your age is: ${value}`)
                })
            }
        }
    }
</script>
