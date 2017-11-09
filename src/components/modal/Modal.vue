<template>
    <transition :name="animation">
        <div class="modal is-active" v-if="isActive">
            <div class="modal-background" @click="cancel('outside')"></div>
            <div class="animation-content"
                :class="{ 'modal-content': !hasModalCard }"
                :style="{ maxWidth: newWidth }">
                <component v-if="component"
                    v-bind="props"
                    :is="component"
                    @close="close">
                </component>
                <div v-else-if="content" v-html="content"></div>
                <slot v-else></slot>
            </div>
            <button
                v-if="showX"
                class="modal-close is-large"
                @click="cancel('x')">
            </button>
        </div>
    </transition>
</template>

<script>
    import ModalMixin from '../../utils/ModalMixin'

    export default {
        name: 'bModal',
        mixins: [ModalMixin]
    }
</script>
