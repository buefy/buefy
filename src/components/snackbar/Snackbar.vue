<template>
    <transition
        mode="out-in"
        appear
        :appear-active-class="transition.enter"
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
        data() {
            return {
                parent: null
            }
        },
        methods: {
            hasChild(parent) {
                return parent !== null && parent.childElementCount > 0
            },
            insertEl() {
                this.parent.className = ''
                this.parent.classList.add('notices', this.position)
                this.parent.appendChild(this.$el)
            },
            action() {
                this.onAction()
                this.close()
            }
        },
        beforeMount() {
            let parent
            parent = document.querySelector('.notices')

            const container = document.querySelector(this.container) !== null ? document.querySelector(this.container) : document.body
            if (!parent) {
                parent = document.createElement('div')
            }
            this.parent = parent
            if (this.container) {
                parent.style.position = 'absolute'
            }
            container.appendChild(parent)
        }
    }
</script>
