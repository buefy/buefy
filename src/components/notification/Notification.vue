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
            <div class="media">
                <div v-if="computedIcon && hasIcon" class="media-left">
                    <b-icon
                        :icon="computedIcon"
                        :pack="iconPack"
                        both
                        size="is-large"
                        aria-hidden/>
                </div>
                <div class="media-content">
                    <p class="text">
                        <template v-if="$slots.default">
                            <slot />
                        </template>
                        <template v-else>
                            {{ message }}
                        </template>
                    </p>
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
