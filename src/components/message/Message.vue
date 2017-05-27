<template>
    <transition name="fade">
        <div class="message" :class="type" v-if="isActive">
            <div class="message-header" v-if="title">
                <p>{{ title }}</p>
                <button type="button" class="delete" v-if="closable" @click="close"></button>
            </div>
            <div class="message-body">
                <b-icon
                    :icon="icon"
                    both
                    :class="type"
                    size="is-large"
                    v-if="icon && hasIcon">
                </b-icon>
                <p><slot></slot></p>
            </div>
        </div>
    </transition>
</template>

<script>
    import MessageMixin from '../../utils/MessageMixin.js'

    export default {
        name: 'bMessage',
        mixins: [MessageMixin]
    }
</script>
