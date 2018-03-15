<template>
    <transition :name="transitionName">
        <div v-show="isActive && visible" class="tab-item">
            <slot/>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'BTabItem',
        props: {
            label: String,
            icon: String,
            iconPack: String,
            disabled: Boolean,
            visible: {
                type: Boolean,
                default: true
            }
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
        },
        beforeDestroy() {
            const index = this.$parent.tabItems.indexOf(this)
            if (index >= 0) {
                this.$parent.tabItems.splice(index, 1)
            }
        }
    }
</script>
