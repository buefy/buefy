<template>
    <transition :name="animation">
        <article
            v-show="isActive"
            class="notification"
            :class="[type, position]"
            @click="click"
        >
            <button
                v-if="closable"
                class="delete"
                type="button"
                @click="close"
                :aria-label="ariaCloseLabel"
            />
            <div class="media" v-if="$slots.default || message">
                <div v-if="computedIcon && hasIcon" class="media-left">
                    <b-icon
                        :icon="computedIcon"
                        :pack="iconPack"
                        :size="newIconSize"
                        both
                        aria-hidden
                    />
                </div>
                <div class="media-content">
                    <template v-if="$slots.default">
                        <slot />
                    </template>
                    <template v-else>
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <p class="text" v-html="message" />
                    </template>
                </div>
            </div>
            <b-progress
                v-if="progressBar"
                class="auto-close-progress"
                :value="remainingTime - 1"
                :max="duration / 1000 - 1"
                :type="type"
                :rounded="false"
            />
        </article>
    </transition>
</template>

<script>
import Progress from '../progress/Progress.vue'
import MessageMixin from '../../utils/MessageMixin'

export default {
    name: 'BNotification',
    components: {
        // directly registers Progress
        // in case Notification is programmatically opened
        [Progress.name]: Progress
    },
    mixins: [MessageMixin],
    props: {
        position: String,
        ariaCloseLabel: String,
        animation: {
            type: String,
            default: 'fade'
        }
    }
}
</script>
