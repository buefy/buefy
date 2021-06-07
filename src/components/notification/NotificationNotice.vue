<template>
    <b-notification
        v-if="$slots.default != null"
        ref="notification"
        :position="position"
        :model-value="isActive"
        v-bind="$attrs"
        :duration="duration"
        @click="click"
        @close="close"
        @mouseenter="pause"
        @mouseleave="removePause"
    >
        <slot />
    </b-notification>
    <b-notification
        v-else
        ref="notification"
        :position="position"
        :model-value="isActive"
        v-bind="$attrs"
        :duration="duration"
        @click="click"
        @close="close"
        @mouseenter="pause"
        @mouseleave="removePause"
    />
</template>

<script>
import config from '../../utils/config'
import { removeElement } from '../../utils/helpers'
import NoticeMixinSubset from './NoticeMixinSubset'
import Notification from './Notification'

export default {
    name: 'BNotificationNotice',
    components: {
        [Notification.name]: Notification
    },
    mixins: [NoticeMixinSubset],
    props: {
        duration: Number
    },
    emits: ['close'],
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
                    removeElement(this.$el)
                }, 150)
            }
        }
    }
}
</script>
