<template>
    <div class="collapse">
        <div class="collapse-trigger" @click="toggle">
            <slot name="trigger" :open="isOpen" />
        </div>
        <transition :name="animation">
            <div
                :id="ariaId"
                :aria-expanded="isOpen"
                class="collapse-content"
                v-show="isOpen">
                <slot/>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'BCollapse',
        props: {
            open: {
                type: Boolean,
                default: true
            },
            animation: {
                type: String,
                default: 'fade'
            },
            ariaId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                isOpen: this.open
            }
        },
        watch: {
            open(value) {
                this.isOpen = value
            }
        },
        methods: {
            /**
             * Toggle and emit events
             */
            toggle() {
                this.isOpen = !this.isOpen
                this.$emit('update:open', this.isOpen)
                this.$emit(this.isOpen ? 'open' : 'close')
            }
        }
    }
</script>
