<template>
    <transition
        :enter-active-class="transition.enter"
        :leave-active-class="transition.leave">

        <div class="toast" v-show="isActive" :class="type">
            <div v-html="message"></div>
        </div>
    </transition>
</template>

<script>
    import config from '../../utils/config'
    import NoticeMixin from '../../utils/NoticeMixin.js'

    export default {
        mixins: [NoticeMixin],
        methods: {
            /**
             * Add component to the DOM with it's classes,
             * called from the Mixin.
             */
            insertEl() {
                this.parent.className = ''
                this.parent.classList.add('notices', 'is-toast', this.position)
                this.parent.appendChild(this.$el)
            }
        },
        props: {
            duration: {
                type: Number,
                default: config.defaultToastDuration
            }
        }
    }
</script>
