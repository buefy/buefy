<template>
    <section>
        <b-button
            text="Launch prompt (default)"
            btn="is-dark"
            size="is-medium"
            @click="prompt"
        />
        <b-button
            text="Launch prompt (custom)"
            btn="is-dark"
            size="is-medium"
            @click="promptNumber"
        />
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
