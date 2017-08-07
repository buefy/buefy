<template>
    <transition name="fade">
        <article v-if="isActive" class="notification" :class="type">
            <button v-if="closable" class="delete" @click="close" type="button"></button>
            <div class="media">
                <div v-if="icon && hasIcon" class="media-left">
                    <b-icon :icon="icon"
                        both
                        size="is-large">
                    </b-icon>
                </div>
                <div class="media-content">
                    <slot></slot>
                </div>
            </div>
        </article>
    </transition>
</template>

<script>
    import MessageMixin from '../../utils/MessageMixin.js'

    export default {
        name: 'bNotification',
        mixins: [MessageMixin]
    }
</script>
