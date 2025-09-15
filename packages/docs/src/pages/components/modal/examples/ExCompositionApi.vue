<template>
    <section>
        <div class="buttons">
            <b-button
                label="Launch image modal"
                type="is-primary"
                size="is-medium"
                @click="launchImageModal"
            />

            <b-button
                label="Launch card modal (component)"
                type="is-primary"
                size="is-medium"
                @click="launchCardModal"
            />
        </div>
    </section>
</template>
<script setup>
import { defineComponent, h } from "vue";
import { BButton, useModal } from "buefy";

const Modal = useModal();

function launchImageModal() {
    const vnode = h("p", { class: "image is-4by3" }, [
        h("img", {
            src: "https://buefy.org/static/img/placeholder-1280x960.png",
        }),
    ]);
    Modal.open({
        content: [vnode],
    });
}


const ModalForm = defineComponent({
    props: ["email", "password"],
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
        `,
});

function launchCardModal() {
    Modal.open({
        component: ModalForm,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true,
    });
}
</script>
