<template>
    <div class="card">
        <header class="card-header" :class="{'is-collapsible' : collapsible}" @click="toggle">
            <p class="card-header-title" v-if="header" v-html="header"></p>
            <slot v-else name="header"></slot>
            <a class="card-header-icon">
                <span class="icon">
                    <b-icon v-if="collapsible" 
                            both 
                            :icon="isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'">
                    </b-icon>
                </span>
            </a>
        </header>
        <transition :name="animation">
            <div v-if="isOpen">
                <div class="card-content" v-if="content" v-html="content"></div>
                <slot v-else></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    import Icon from '../icon'

    export default {
        name: 'bCard',
        components: {
            [Icon.name]: Icon
        },
        props: {
            collapsible: {
                type: Boolean,
                default: false
            },
            open: {
                type: Boolean,
                default: true
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
             * Toggle the Card and emit events if collapsible.
             */
            toggle() {
                if (!this.collapsible) return

                this.isOpen = !this.isOpen

                this.$emit('update:open', this.isOpen)
                this.$emit(this.isOpen ? 'open' : 'close')
            }
        }
    }
</script>
