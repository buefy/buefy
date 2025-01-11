<template>
    <b-notification
        v-if="$slots.default != null"
        ref="notification"
        :position="position"
        :model-value="isActive"
        :type="type"
        :message="message"
        :duration="duration"
        v-bind="$attrs"
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
        :type="type"
        :message="message"
        :duration="duration"
        v-bind="$attrs"
        @click="click"
        @close="close"
        @mouseenter="pause"
        @mouseleave="removePause"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import config from '../../utils/config'
import { removeElement } from '../../utils/helpers'
import type { ExtractComponentProps } from '../../utils/helpers'
import NoticeMixin from '../../utils/NoticeMixin'
import BNotification from './Notification.vue'

type NotificationInstance = InstanceType<typeof BNotification>

const NotificationNotice = defineComponent({
    name: 'BNotificationNotice',
    components: { BNotification },
    mixins: [NoticeMixin],
    data() {
        return {
            newDuration: this.duration || config.defaultNotificationDuration
        }
    },
    emits: {
        close: () => true
    },
    methods: {
        close() {
            if (!this.isPaused) {
                clearTimeout(this.timer);
                (this.$refs.notification as NotificationInstance).isActive = false
                this.$emit('close')

                // Timeout for the animation complete before destroying
                setTimeout(() => {
                    removeElement(this.$el)
                }, 150)
            }
        }
    }
})

export type NotificationNoticeProps = ExtractComponentProps<typeof NotificationNotice>

export default NotificationNotice
</script>
