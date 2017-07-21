<template>
    <nav class="panel">
        <p class="panel-heading"
            :class="{'is-collapsible' : collapsible}"
            @click="toggle">
            <span v-if="header" v-html="header"></span>
            <slot v-else name="header"></slot>
            <b-icon class="is-pulled-right" 
                    v-if="collapsible" 
                    both 
                    :icon="isOpen ? 'arrow_drop_up' : 'arrow_drop_down'">
            </b-icon>
        </p>
        <transition :name="animation">
            <div class="panel-content" 
                 :class="{'panel-block' : !hasCustomTemplate}" 
                 v-if="isOpen">
                <div v-if="content" v-html="content"></div>
                <slot v-else></slot>
            </div>
        </transition>
    </nav>
</template>

<script>
    export default {
        name: 'bPanel',
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
