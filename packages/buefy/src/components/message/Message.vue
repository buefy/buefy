<template>
    <transition name="fade">
        <article
            v-show="isActive"
            class="message"
            :class="[type, size]"
        >
            <header v-if="$slots.header || title" class="message-header">
                <div v-if="$slots.header">
                    <slot name="header" />
                </div>
                <p v-else-if="title">
                    {{ title }}
                </p>
                <button
                    v-if="closable"
                    type="button"
                    class="delete"
                    @click="close"
                    :aria-label="ariaCloseLabel"
                />
            </header>
            <section class="message-body" v-if="$slots.default">
                <div class="media">
                    <div v-if="computedIcon && hasIcon" class="media-left">
                        <b-icon
                            :icon="computedIcon"
                            :pack="iconPack"
                            :class="type"
                            both
                            :size="newIconSize"
                        />
                    </div>
                    <div class="media-content">
                        <slot />
                    </div>
                </div>
            </section>
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

<script lang="ts">
import { defineComponent } from 'vue'
import type { ExtractComponentProps } from '../../utils/helpers'
import MessageMixin from '../../utils/MessageMixin'
import BIcon from '../icon/Icon.vue'
import BProgress from '../progress/Progress.vue'

const Message = defineComponent({
    name: 'BMessage',
    components: {
        BIcon,
        BProgress
    },
    mixins: [MessageMixin],
    props: {
        ariaCloseLabel: String
    }
})

export type MessageProps = ExtractComponentProps<typeof Message>

export default Message
</script>
