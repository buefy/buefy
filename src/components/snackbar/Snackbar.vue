<template>
    <transition
        :enter-active-class="transition.enter"
        :leave-active-class="transition.leave">
        <div
            v-show="isActive"
            class="snackbar"
            :class="[type,position]"
            :role="actionText ? 'alertdialog' : 'alert'">
            <div class="text" v-html="message"/>
            <div
                v-if="actionText"
                class="action"
                @click="action"
                :class="type">
                <button class="button">{{ actionText }}</button>
            </div>
        </div>
    </transition>
</template>

<script>
import config from '../../utils/config'
import NoticeMixin from '../../utils/NoticeMixin.js'

export default {
    name: 'BSnackbar',
    mixins: [NoticeMixin],
    props: {
        actionText: {
            type: String,
            default: 'OK'
        },
        onAction: {
            type: Function,
            default: () => {}
        },
        indefinite: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            newDuration: this.duration || config.defaultSnackbarDuration
        }
    },
    methods: {
        /**
        * Click listener.
        * Call action prop before closing (from Mixin).
        */
        action() {
            this.onAction()
            this.close()
        }
    }
}
</script>
