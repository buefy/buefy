<template>
    <transition :name="animation">
        <div
            class="loading-overlay is-active"
            :class="{ 'is-full-page': displayInFullPage }"
            v-show="isActive"
            v-if="isActive"
        >
            <div class="loading-background" @click="cancel" />
            <slot>
                <div class="loading-icon" />
            </slot>
        </div>
    </transition>
</template>

<script>
import { removeElement } from '../../utils/helpers'
import { HTMLElement } from '../../utils/ssr'

export default {
    name: 'BLoading',
    props: {
        modelValue: Boolean,
        programmatic: Boolean,
        container: [Object, Function, HTMLElement],
        isFullPage: {
            type: Boolean,
            default: true
        },
        animation: {
            type: String,
            default: 'fade'
        },
        canCancel: {
            type: Boolean,
            default: false
        },
        onCancel: {
            type: Function,
            default: () => {}
        }
    },
    emits: ['close', 'update:is-full-page', 'update:modelValue'],
    data() {
        return {
            isActive: this.modelValue || false,
            displayInFullPage: this.isFullPage
        }
    },
    watch: {
        modelValue(value) {
            this.isActive = value
        },
        isFullPage(value) {
            this.displayInFullPage = value
        }
    },
    methods: {
        /**
        * Close the Modal if canCancel.
        */
        cancel() {
            if (!this.canCancel || !this.isActive) return

            this.close()
        },
        /**
        * Emit events, and destroy modal if it's programmatic.
        */
        close() {
            this.onCancel.apply(null, arguments)
            this.$emit('close')
            this.$emit('update:modelValue', false)

            // Timeout for the animation complete before destroying
            if (this.programmatic) {
                this.isActive = false
                // TODO: should the following happen outside this component;
                // i.e., in index.js?
                setTimeout(() => {
                    removeElement(this.$el)
                }, 150)
            }
        },
        /**
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
            if (key === 'Escape' || key === 'Esc') this.cancel()
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress)
        }
    },
    mounted() {
        // Insert the Loading component in body tag
        // only if it's programmatic
        // (moved from beforeMount because $el is not bound during beforeMount)
        // TODO: should this happen outside this component; i.e., in index.js?
        if (this.programmatic) {
            if (!this.container) {
                document.body.appendChild(this.$el)
            } else {
                this.displayInFullPage = false
                this.$emit('update:is-full-page', false)
                this.container.appendChild(this.$el)
            }
            this.isActive = true
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress)
        }
    }
}
</script>
