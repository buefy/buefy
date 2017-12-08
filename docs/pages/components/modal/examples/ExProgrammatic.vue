<template>
    <section>
        <button class="button is-primary is-medium"
            @click="imageModal()">
            Launch image modal (HTML)
        </button>
        <button class="button is-primary is-medium"
            @click="cardModal()">
            Launch card modal (Component)
        </button>
    </section>
</template>

<script>
    import ModalForm from './ModalForm'

    export default {
        methods: {
            imageModal() {
                this.$modal.open(
                    `<p class="image is-4by3">
                        <img src="./static/img/placeholder-1280x960.png">
                    </p>`
                )
            },
            cardModal() {
                this.$modal.open({
                    parent: this,
                    component: ModalForm,
                    hasModalCard: true
                })
            }
        }
    }
</script>
