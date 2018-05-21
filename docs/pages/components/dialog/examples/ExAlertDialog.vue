<template>
    <section>
        <b-button
            text="Launch alert (default)"
            btn="is-primary"
            size="is-medium"
            @click="alert"
        />
        <b-button
            text="Launch alert (custom)"
            btn="is-primary"
            size="is-medium"
            @click="alertCustom"
        />
        <b-button
            text="Launch alert (error)"
            btn="is-danger"
            size="is-medium"
            @click="alertCustomError"
        />
    </section>
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
            },
            alertCustomError() {
                this.$dialog.alert({
                    title: 'Error',
                    message: 'Something\'s not good but I have a custom <b>icon</b> and <b>type</b>',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa'
                })
            }
        }
    }
</script>
