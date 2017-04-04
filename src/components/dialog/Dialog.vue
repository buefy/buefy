<template>
    <transition
        appear
        appear-active-class="fadeIn"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut">

        <div class="dialog modal is-active" v-if="isActive">
            <div class="modal-background" @click="cancel"></div>

            <transition
                appear
                appear-active-class="zoomIn"
                enter-active-class="zoomIn">

                <div class="modal-card" v-if="isActive">
                    <header class="modal-card-head" v-if="title">
                        <p class="modal-card-title">{{ title }}</p>
                    </header>
                    <section class="modal-card-body" :class="{ 'is-titleless': !title }">
                        <b-icon
                            :icon="icon"
                            :color="type"
                            both
                            size="is-large"
                            v-if="icon && hasIcon">
                        </b-icon>
                        <span v-html="message"></span>
                    </section>
                    <footer class="modal-card-foot">
                        <a class="button is-light" @click="cancel" v-if="canCancel">{{ cancelText }}</a>
                        <a class="button" :class="type" @click="confirm">{{ confirmText }}</a>
                    </footer>
                </div>

            </transition>

        </div>

        </transition>
</template>

<script>
    import Icon from '../icon'

    export default {
        components: {
            [Icon.name]: Icon
        },
        props: {
            title: String,
            message: String,
            hasIcon: Boolean,
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
        computed: {
            icon() {
                switch (this.type) {
                    case 'is-info':
                        return 'info'
                    case 'is-success':
                        return 'check_circle'
                    case 'is-warning':
                        return 'warning'
                    case 'is-danger':
                        return 'error'
                    default:
                        return null
                }
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
                if (!this.canCancel) return

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
