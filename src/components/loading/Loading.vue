<template>
    <transition :name="animation">
        <div class="modal is-active" v-if="isActive">
            <div class="loader-icon"></div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'bLoading',
        props: {
            active: Boolean,
            programmatic: Boolean,
            animation: {
                type: String,
                default: 'fade'
            }
        },
        data() {
            return {
                isActive: this.active || false
            }
        },
        watch: {
            active(value) {
                this.isActive = value
            },
            isActive() {
                const action = this.isActive ? 'add' : 'remove'
                document.body.classList[action]('is-loading')
            }
        },
        methods: {
            /**
             * Emit events, and destroy modal if it's programmatic.
             */
            close() {
                this.$emit('close')
                this.$emit('update:active', false)

                if (this.programmatic) {
                    this.isActive = false
                    setTimeout(() => {
                        this.$destroy()
                        this.$el.remove()
                    }, 150)
                }
            }
        },
        beforeMount() {
            // Insert the Loading component in body tag
            // only if it's programmatic
            this.programmatic && document.body.appendChild(this.$el)
        },
        mounted() {
            if (this.programmatic) this.isActive = true
            else if (this.isActive) {
                document.body.classList['add']('is-loading')
            }
        },
        beforeDestroy() {
            document.body.classList['remove']('is-loading')
        }
    }
</script>
