<template>
    <section>
        <div class="buttons">
            <button class="button is-medium is-primary" @click="alert">
                Launch alert (default)
            </button>
            <button class="button is-medium is-primary" @click="alertCustom">
                Launch alert (custom)
            </button>
            <button class="button is-medium is-danger" @click="alertCustomError">
                Launch alert (custom)
            </button>
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
