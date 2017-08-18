<template>
    <div class="block">
        <button class="button is-medium is-primary" @click="alert">
            Alert (default)
        </button>
        <button class="button is-medium is-primary" @click="alertCustom">
            Alert (custom)
        </button>
    </div>
</template>

<script>
    export default {
        methods: {
            alert() {
                this.$dialog.alert('Everything looks fine!')
            },
            alertCustom() {
                this.$dialog.alert({
                    title: 'Title Alert',
                    message: 'I have a title, a custom button and <b>HTML</b>!',
                    confirmText: 'Cool!'
                })
            }
        }
    }
</script>
