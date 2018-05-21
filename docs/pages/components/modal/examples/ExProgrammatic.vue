<template>
    <section>
        <b-button text="Launch image modal (HTML)" btn="is-primary" size="is-medium" @click="imageModal()" />

        <b-button text="Launch card modal (HTML)" btn="is-primary" size="is-medium" @click="cardModal()" />
    </section>
</template>

<script>
    const ModalForm = {
        props: ['email', 'password'],
        template: `
            <form action="">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Login</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Email">
                            <b-input
                                type="email"
                                :value="email"
                                placeholder="Your email"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Password">
                            <b-input
                                type="password"
                                :value="password"
                                password-reveal
                                placeholder="Your password"
                                required>
                            </b-input>
                        </b-field>

                        <b-checkbox>Remember me</b-checkbox>
                    </section>
                    <footer class="modal-card-foot">
                        <b-button text="Close" @click="$parent.close()" />
                        <b-button text="Login" btn="is-primary" @click="$parent.close()" />
                    </footer>
                </div>
            </form>
        `
    }

    export default {
        methods: {
            imageModal() {
                this.$modal.open(
                    `<p class="image is-4by3">
                        <img src="https://buefy.github.io/static/img/placeholder-1280x960.png">
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
