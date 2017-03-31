<template>
    <transition
        mode="out-in"
        appear
        :appear-active-class="transitionEnter"
        :enter-active-class="transitionEnter"
        :leave-active-class="transitionLeave">
        <div class="notification animated" v-show="isShow">
            <button class="delete" @click="handleClose"></button>
            <b-icon
                :icon="icon"
                both
                size="is-large"
                :class="type"
                v-if="icon">
            </b-icon>
            <div class="content">
                <div class="title is-5" v-if="title">{{ title }}</div>
                <div v-html="message"></div>
            </div>
        </div>
    </transition>
</template>

<script>
    import NotifyMixin from '../../utils/NotifyMixin.js'
    import Icon from '../icon'

    export default {
        mixins: [NotifyMixin],
        components: {
            [Icon.name]: Icon
        },
        props: {
            title: String
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
        beforeMount() {
            let parent
            parent = document.querySelector(`.notifies.${this.position}`)
            const container = document.querySelector(this.container) !== null ? document.querySelector(this.container) : document.body
            if (!parent) {
                parent = document.createElement('div')
                parent.classList.add('notifies', this.position)
                container.appendChild(parent)
            }
            parent.appendChild(this.$el)
            if (this.container) {
                parent.style.position = 'absolute'
            }
        }
    }
</script>
