<template>
    <transition name="fade">
        <article
            v-if="isActive"
            class="message"
            :class="[type, size]">
            <header v-if="title" class="message-header">
                <p>{{ title }}</p>
                <button
                    v-if="closable"
                    type="button"
                    class="delete"
                    @click="close"
                />
            </header>
            <section class="message-body">
                <div class="media">
                    <div v-if="icon && hasIcon" class="media-left">
                        <b-icon
                            :icon="icon"
                            :class="type"
                            both
                            :size="newIconSize"/>
                    </div>
                    <div class="media-content">
                        <slot/>
                    </div>
                </div>
            </section>
        </article>
    </transition>
</template>

<script>
    import MessageMixin from '../../utils/MessageMixin.js'

    export default {
        name: 'BMessage',
        mixins: [MessageMixin],
        props: {
            autoClose: {
                type: Boolean,
                default: false
            },
            duration: {
                type: Number,
                default: 5000
            }
        },
        data() {
            return {
                newIconSize: this.iconSize || this.size || 'is-large'
            }
        },
        watch: {
            isActive(value) {
                if (value) {
                    this.setAutoClose()
                } else {
                    if (this.timer) {
                        clearTimeout(this.timer)
                    }
                }
            }
        },
        methods: {
            setAutoClose() {
                if (this.autoClose) {
                    this.timer = setTimeout(() => {
                        if (this.isActive) {
                            this.close()
                        }
                    }, this.duration)
                }
            }
        },
        mounted() {
            this.setAutoClose()
        }
    }
</script>
