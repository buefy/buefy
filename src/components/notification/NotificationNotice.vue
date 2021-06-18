<template>
    <b-notification
        v-bind="$options.propsData"
        ref="notification"
        @close="close">
        <slot />
    </b-notification>
</template>

<script>
import config from '../../utils/config'
import NoticeMixin from '../../utils/NoticeMixin.js'

export default {
    name: 'BNotificationNotice',
    mixins: [NoticeMixin],
    data() {
        return {
            newDuration: this.duration || config.defaultNotificationDuration
        }
    },
    methods: {
        timeoutCallback() {
            return this.$refs.notification.close()
        }
    }
}
</script>
