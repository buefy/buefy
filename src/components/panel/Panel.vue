<template>
    <nav class="panel">
        <div
            class="panel-heading"
            :class="{'is-collapsible' : collapsible}"
            @click="toggle">
            <span v-if="header" v-html="header"/>
            <slot v-else name="header"/>
            <b-icon
                class="is-pulled-right"
                v-if="collapsible"
                both
                :icon="isOpen ? 'menu-up' : 'menu-down'"/>
        </div>
        <transition :name="animation">
            <div
                class="panel-content"
                :class="{'panel-block' : !hasCustomTemplate}"
                v-show="isOpen">
                <div v-if="content" v-html="content"/>
                <slot v-else/>
            </div>
        </transition>
    </nav>
</template>

<script>
    export default {
        name: 'BPanel',
        props: {
            collapsible: {
                type: Boolean,
                default: false
            },
            open: {
                type: Boolean,
                default: true
            },
            hasCustomTemplate: {
                type: Boolean,
                default: false
            },
            header: String,
            content: String,
            animation: {
                type: String,
                default: 'fade'
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
             * Toggle the Panel and emit events if collapsible.
             */
            toggle() {
                if (!this.collapsible) return

                this.isOpen = !this.isOpen
                this.$emit('update:open', this.isOpen)

                if (this.isOpen) {
                    this.$emit('open')
                } else {
                    this.$emit('close')
                }
            }
        }
    }
</script>
