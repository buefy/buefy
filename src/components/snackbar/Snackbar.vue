<template>
    <transition
        :enter-active-class="transition.enter"
        :leave-active-class="transition.leave">

        <div class="snackbar" v-show="isActive">
            <div class="text">{{ message }}</div>
            <div class="action" @click="action" v-if="actionText" :class="type">
                <button class="button is-dark">{{ actionText }}</button>
            </div>
        </div>

    </transition>
</template>

<script>
    import NoticeMixin from '../../utils/NoticeMixin.js'

    export default {
        mixins: [NoticeMixin],
        props: {
            actionText: {
                type: String,
                default: 'OK'
            },
            onAction: {
                type: Function,
                default: () => {}
            }
        },
        methods: {
            /**
             * Add component to the DOM with it's classes,
             * called from the Mixin.
             */
            insertEl() {
                this.parent.className = ''
                this.parent.classList.add('notices', this.position)
                this.parent.appendChild(this.$el)
            },

            /**
             * Click listener.
             * Call action prop before closing (from Mixin).
             */
            action() {
                this.onAction()
                this.close()
            }
        }
    }
</script>
