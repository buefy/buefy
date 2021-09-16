<template>
    <b-notification
        v-bind="$options.propsData"
        ref="notification"
        @click="click"
        @close="close"
        @mouseenter.native="pause"
        @mouseleave.native="removePause">
        <slot />
    </b-notification>
</template>

<script>
import config from '../../utils/config'
import NoticeMixin from '../../utils/NoticeMixin.js'
import { removeElement } from '../../utils/helpers'

export default {
    name: 'BNotificationNotice',
    mixins: [NoticeMixin],
    data() {
        return {
            newDuration: this.duration || config.defaultNotificationDuration
        }
    },
    methods: {
        close() {
            if (!this.isPaused) {
                clearTimeout(this.timer)
                this.$refs.notification.isActive = false
                this.$emit('close')

                // Timeout for the animation complete before destroying
                setTimeout(() => {
                    this.$destroy()
                    removeElement(this.$el)
                }, 150)
            }
        }
    }
}
</script>
