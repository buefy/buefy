<template>
    <section>
        <b-button
            label="Launch component modal"
            type="is-primary"
            size="is-medium"
            @click="isComponentModalActive = true" />

        <b-modal
            ref="modal"
            v-model="isComponentModalActive"
            has-modal-card
            full-screen
            :can-cancel="false">
            <modal-form v-bind="formProps" @close="$refs.modal.close()"></modal-form>
        </b-modal>
    </section>
</template>

<script>
    const ModalForm = {
        props: ['email', 'password'],
        emits: ['close'],
        template: `
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Login</p>
                </header>
                <section class="modal-card-body">
                    <b-field label="Email">
                        <b-input
                            type="email"
                            :modelValue="email"
                            placeholder="Your email"
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="Password">
                        <b-input
                            type="password"
                            :modelValue="password"
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
        `
    }

    export default {
        components: {
            ModalForm
        },
        data() {
            return {
                isComponentModalActive: false,
                formProps: {
                    email: 'evan@you.com',
                    password: 'testing'
                }
            }
        }
    }
</script>
