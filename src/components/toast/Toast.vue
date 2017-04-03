<template>
    <transition
        mode="out-in"
        appear
        :appear-active-class="transition.enter"
        :enter-active-class="transition.enter"
        :leave-active-class="transition.leave">

        <div class="toast" v-show="isActive" :class="type">
            <div v-html="message"></div>
        </div>

    </transition>
</template>

<script>
    import NoticeMixin from '../../utils/NoticeMixin.js'

    export default {
        mixins: [NoticeMixin],
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
                this.parent.classList.add('toasts', this.position)
                this.parent.appendChild(this.$el)
            }
        },
        beforeMount() {
            let parent
            parent = document.querySelector('.toasts')

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
