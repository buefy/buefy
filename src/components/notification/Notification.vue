<template>
    <transition :name="animation">
        <article
            v-show="isActive"
            class="notification"
            :class="[type, position]">
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
                        both
                        size="is-large"
                        aria-hidden/>
                </div>
                <div class="media-content">
                    <template v-if="$slots.default">
                        <slot />
                    </template>
                    <template v-else>
                        <p class="text" v-html="message" />
                    </template>
                </div>
            </div>
        </article>
    </transition>
</template>

<script>
import MessageMixin from '../../utils/MessageMixin.js'

export default {
    name: 'BNotification',
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
