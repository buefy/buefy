<template>
    <b-notification
        v-bind="$options.propsData"
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
    }
}
</script>
