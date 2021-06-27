<template>
    <section>
        <div class="buttons">
            <b-button
                label="Launch image modal (HTML)"
                type="is-primary"
                size="is-medium"
                @click="imageModal" />
            <b-button
                label="Launch card modal (Component)"
                type="is-primary"
                size="is-medium"
                @click="cardModal" />
        </div>
    </section>
</template>

<script>
    import { h } from 'vue'

    // `modal.open` can no longer resolve components registered in
    // the current app because it creates a brand-new app.
    // so components referenced from the component specified to the `component`
    // option have to be explicitly registered.
    import { BButton } from '../../../../../src/components/button'
    import { BCheckbox } from '../../../../../src/components/checkbox'
    import { BField } from '../../../../../src/components/field'
    import { BInput } from '../../../../../src/components/input'

    const ModalForm = {
        // see above
        components: { BButton, BCheckbox, BField, BInput },
        props: ['email', 'password'],
        template: `
            <form action="">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Login</p>
                        <button
                            type="button"
                            class="delete"
                            @click="$emit('close')"/>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Email">
                            <b-input
                                type="email"
                                :model-value="email"
                                placeholder="Your email"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Password">
                            <b-input
                                type="password"
                                :model-value="password"
                                password-reveal
                                placeholder="Your password"
                                required>
                            </b-input>
                        </b-field>

                        <b-checkbox>Remember me</b-checkbox>
                    </section>
                    <footer class="modal-card-foot">
                        <b-button
                            label="Close"
                            @click="$emit('close')" />
                        <b-button
                            label="Login"
                            type="is-primary" />
                    </footer>
                </div>
            </form>
        `
    }

    export default {
        methods: {
            imageModal() {
                const vnode = h(
                  'p',
                  { class: "image is-4by3" },
                  [
                    h('img', {
                      src: 'https://buefy.org/static/img/placeholder-1280x960.png'
                    })
                  ]
                )
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
