<template>
    <transition
        appear
        appear-active-class="fadeIn"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut">

        <div class="dialog modal is-active" v-if="isActive">
            <div class="modal-background"></div>

            <transition
                appear
                appear-active-class="zoomIn"
                enter-active-class="zoomIn">

                <div class="modal-card" v-if="isActive">
                    <header class="modal-card-head">
                        <p class="modal-card-title">{{ title }}</p>
                    </header>
                    <section class="modal-card-body" v-html="message"></section>
                    <footer class="modal-card-foot">
                        <a class="button is-light" @click="cancel" v-if="canCancel">Cancel</a>
                        <a class="button" :class="dialogType !== 'is-alert' ? type : null" @click="confirm">{{ confirmText }}</a>
                    </footer>
                </div>

            </transition>

        </div>

        </transition>
</template>

<script>
    export default {
        props: {
            title: String,
            message: String,
            type: {
                type: String,
                default: 'is-primary'
            },
            confirmText: {
                type: String,
                default: 'OK'
            },
            cancelText: {
                type: String,
                default: 'Cancel'
            },
            canCancel: {
                type: Boolean,
                default: true
            },
            onConfirm: Function,
            onCancel: Function
        },
        data() {
            return {
                isActive: true
            }
        },
        methods: {
            confirm() {
                if (this.onConfirm) {
                    this.onConfirm()
                }
                this.close()
            },
            cancel() {
                if (this.onCancel) {
                    this.onCancel()
                }
                this.close()
            },
            close() {
                this.isActive = false

                // Timeout for the animation complete before destroying
                setTimeout(() => {
                    this.$destroy()
                    this.$el.remove()
                }, 150)
            }
        },
        beforeMount() {
            document.body.appendChild(this.$el)
        }
    }
</script>
