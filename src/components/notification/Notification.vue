<template>
    <transition name="fade">
        <div class="notification" :class="type" v-if="isActive">
            <button class="delete" v-if="closable" @click="close" type="button"></button>
            <b-icon
                :icon="icon"
                both
                size="is-large"
                v-if="icon && hasIcon">
            </b-icon>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
    import MessageMixin from '../../utils/MessageMixin.js'

    export default {
        name: 'bNotification',
        mixins: [MessageMixin]
    }
</script>
