<template>
    <transition
        :enter-active-class="transition.enter"
        :leave-active-class="transition.leave">
        <div
            v-show="isActive"
            class="toast"
            :class="[type, position]">
            <div v-html="message"/>
        </div>
    </transition>
</template>

<script>
    import config from '../../utils/config'
    import NoticeMixin from '../../utils/NoticeMixin.js'

    export default {
        name: 'BToast',
        mixins: [NoticeMixin],
        data() {
            return {
                newDuration: this.duration || config.defaultToastDuration
            }
        }
    }
</script>
