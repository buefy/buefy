<template>
    <section>
        <div class="buttons">
            <b-button
                label="Launch alert (default)"
                type="is-primary"
                size="is-medium"
                @click="alert" />

            <b-button
                label="Launch alert (custom)"
                type="is-primary"
                size="is-medium"
                @click="alertCustom" />

            <b-button
                label="Launch alert (custom)"
                type="is-danger"
                size="is-medium"
                @click="alertCustomError" />
        </div>
    </section>
</template>

<script>
    export default {
        methods: {
            alert() {
                this.$buefy.dialog.alert('Everything looks fine!')
            },
            alertCustom() {
                this.$buefy.dialog.alert({
                    title: 'Title Alert',
                    message: 'I have a title, a custom button and <b>HTML</b>!',
                    confirmText: 'Cool!'
                })
            },
            alertCustomError() {
                this.$buefy.dialog.alert({
                    title: 'Error',
                    message: 'Something\'s not good but I have a custom <b>icon</b> and <b>type</b>',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
            }
        }
    }
</script>
