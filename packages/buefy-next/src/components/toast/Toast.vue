<template>
    <transition
        :enter-active-class="transition.enter"
        :leave-active-class="transition.leave"
    >
        <div
            @mouseenter="pause"
            @mouseleave="removePause"
            v-show="isActive"
            class="toast"
            :class="[type, position]"
            :aria-hidden="!isActive"
            role="alert"
        >
            <template v-if="$slots.default">
                <slot />
            </template>
            <template v-else>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div v-html="message" />
            </template>
        </div>
    </transition>
</template>

<script>
import config from '../../utils/config'
import NoticeMixin from '../../utils/NoticeMixin'

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
