<template>
    <transition :name="transitionName">
        <div v-show="isActive" class="tab-item" :class="{ 'is-animated': transitionName !== null }">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'bTabItem',
        props: {
            label: String,
            icon: String,
            iconPack: String
        },
        data() {
            return {
                isActive: false,
                transitionName: null
            }
        },
        methods: {
            /**
             * Activate tab, alter animation name based on the index.
             */
            activate(oldIndex, index) {
                if (!this.$parent.animated) {
                    this.transitionName = null
                } else {
                    this.transitionName = index < oldIndex
                        ? 'slide-next'
                        : 'slide-prev'
                }
                this.isActive = true
            },

            /**
             * Deactivate tab, alter animation name based on the index.
             */
            deactivate(oldIndex, index) {
                if (!this.$parent.animated) {
                    this.transitionName = null
                } else {
                    this.transitionName = index < oldIndex
                        ? 'slide-next'
                        : 'slide-prev'
                }
                this.isActive = false
            }
        },
        created() {
            if (!this.$parent.$data._isTabs) {
                this.$destroy()
                throw new Error('You should wrap bTabItem on a bTabs')
            }

            this.$parent.tabItems.push(this)
        }
    }
</script>
