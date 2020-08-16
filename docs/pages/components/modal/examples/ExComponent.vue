<template>
    <section>
        <button class="button is-primary is-medium"
            @click="isComponentModalActive = true">
            Launch component modal
        </button>

        <b-modal 
            v-model="isComponentModalActive"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal>
            <template #default="props">
                <modal-form v-bind="formProps" @close="props.close"></modal-form>
            </template>
        </b-modal>
    </section>
</template>

<script>
    const ModalForm = {
        props: ['email', 'password', 'canCancel'],
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
                        <button class="button" type="button" @click="$emit('close')">Close</button>
                        <button class="button is-primary">Login</button>
                    </footer>
                </div>
            </form>
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
