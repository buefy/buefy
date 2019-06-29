<template>
    <b-notification
        v-bind="$options.propsData"
        @close="close" />
</template>

<script>
import config from '../../utils/config'
import NoticeMixin from '../../utils/NoticeMixin.js'

export default {
    name: 'BNotificationNotice',
    mixins: [NoticeMixin],
    props: {
        indefinite: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            newDuration: this.duration || config.defaultNotificationDuration
        }
    }
}
</script>
