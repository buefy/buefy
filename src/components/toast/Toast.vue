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
                default: 2500
            }
        },
        methods: {
            hasChild(parent) {
                return parent !== null && parent.childElementCount > 0
            },
            insertEl() {
                this.parent.className = ''
                this.parent.classList.add('notices', 'is-toast', this.position)
                this.parent.appendChild(this.$el)
            }
        }
    }
</script>
