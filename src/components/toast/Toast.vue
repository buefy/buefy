<template>
    <transition
        mode="out-in"
        appear
        :appear-active-class="transitionEnter"
        :enter-active-class="transitionEnter"
        :leave-active-class="transitionLeave">
        <div class="toast animated" v-show="isShow" :class="type">
            <div v-html="message"></div>
        </div>
    </transition>
</template>

<script>
    import NotifyMixin from '../../utils/NotifyMixin.js'

    export default {
        mixins: [NotifyMixin],
        props: {
            position: {
                type: String,
                default: 'top'
            },
            duration: {
                type: Number,
                default: 4000
            }
        },
        beforeMount() {
            let parent
            parent = document.querySelector(`.toasts.${this.position}`)
            const container = document.querySelector(this.container) !== null ? document.querySelector(this.container) : document.body
            if (!parent) {
                parent = document.createElement('div')
                parent.classList.add('toasts', this.position)
                container.appendChild(parent)
            }
            parent.appendChild(this.$el)
            if (this.container) {
                parent.style.position = 'absolute'
            }
        }
    }
</script>
