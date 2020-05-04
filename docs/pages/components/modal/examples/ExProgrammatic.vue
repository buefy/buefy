<template>
    <section>
        <div class="buttons">
            <button class="button is-primary is-medium"
                @click="imageModal()">
                Launch image modal (HTML)
            </button>
            <button class="button is-primary is-medium"
                @click="cardModal()">
                Launch card modal (Component)
            </button>
        </div>
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
                        <button class="button" type="button" @click="$parent.close()">Close</button>
                        <button class="button is-primary">Login</button>
                    </footer>
                </div>
            </form>
        `
    }

    export default {
        methods: {
            imageModal() {
                const h = this.$createElement
                const vnode = h('p', { class: "image is-4by3" }, [
                    h('img', { attrs: { src: 'https://buefy.org/static/img/placeholder-1280x960.png' }})
                ])
                this.$buefy.modal.open({
                    content: [ vnode ]
                })
            },
            cardModal() {
                this.$buefy.modal.open({
                    parent: this,
                    component: ModalForm,
                    hasModalCard: true,
                    customClass: 'custom-class custom-class-2',
                    trapFocus: true
                })
            }
        }
    }
</script>
