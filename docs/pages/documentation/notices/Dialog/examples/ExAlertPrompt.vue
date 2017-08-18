<template>
    <div class="block">
        <button class="button is-medium is-dark" @click="prompt">
            Prompt
        </button>
    </div>
</template>

<script>
    export default {
        methods: {
            prompt() {
                this.$dialog.prompt({
                    message: `What's your name?`,
                    inputMaxlength: 20,
                    inputPlaceholder: 'e.g. John Doe',
                    onConfirm: (value) => {
                        this.$toast.open('Your name is: ' + value)
                    }
                })
            }
        }
    }
</script>
