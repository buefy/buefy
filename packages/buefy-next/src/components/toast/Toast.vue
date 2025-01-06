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

<script lang="ts">
import { defineComponent } from 'vue'

import config from '../../utils/config'
import type { ExtractComponentProps } from '../../utils/helpers'
import NoticeMixin from '../../utils/NoticeMixin'

const Toast = defineComponent({
    name: 'BToast',
    mixins: [NoticeMixin],
    data() {
        return {
            newDuration: this.duration || config.defaultToastDuration
        }
    }
})

export type ToastProps = ExtractComponentProps<typeof Toast>

export default Toast
</script>
