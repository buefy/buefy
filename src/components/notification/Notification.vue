<template>
    <transition name="fade">
        <article
            v-if="isActive"
            class="notification"
            :class="type">
            <b-button
                v-if="closable"
                no-default-class
                class="delete"
                @click="close"
            />
            <div class="media">
                <div v-if="icon && hasIcon" class="media-left">
                    <b-icon
                        :icon="icon"
                        both
                        size="is-large"/>
                </div>
                <div class="media-content">
                    <slot/>
                </div>
            </div>
        </article>
    </transition>
</template>

<script>
    import MessageMixin from '../../utils/MessageMixin.js'

    export default {
        name: 'BNotification',
        mixins: [MessageMixin]
    }
</script>
