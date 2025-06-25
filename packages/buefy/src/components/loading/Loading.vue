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

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { removeElement } from '../../utils/helpers'
import type { ExtractComponentProps } from '../../utils/helpers'
import { HTMLElement } from '../../utils/ssr'

const Loading = defineComponent({
    name: 'BLoading',
    props: {
        modelValue: Boolean,
        programmatic: Boolean,
        container: [Object, Function, HTMLElement] as PropType<HTMLElement>,
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            type: Function as PropType<(...args: any[]) => void>,
            default: () => {}
        }
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        close: () => true,
        'update:is-full-page': (_flag: boolean) => true,
        'update:modelValue': (_flag: boolean) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
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
        /*
        * Close the Modal if canCancel.
        */
        cancel() {
            if (!this.canCancel || !this.isActive) return

            this.close()
        },
        /*
        * Emit events, and destroy modal if it's programmatic.
        */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        close(...args: any[]) {
            this.onCancel.apply(null, args)
            this.$emit('close')
            this.$emit('update:modelValue', false)

            // Timeout for the animation complete before destroying
            if (this.programmatic) {
                this.isActive = false
                // TODO: should the following happen outside this component;
                // i.e., in index.ts?
                setTimeout(() => {
                    removeElement(this.$el)
                }, 150)
            }
        },
        /*
        * Keypress event that is bound to the document.
        */
        keyPress({ key }: KeyboardEvent) {
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
})

export type LoadingProps = ExtractComponentProps<typeof Loading>

export default Loading
</script>
