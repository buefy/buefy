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
                this.transitionName = index < oldIndex
                    ? 'slide-next'
                    : 'slide-prev'
                this.isActive = true
            },

            /**
             * Deactivate tab, alter animation name based on the index.
             */
            deactivate(oldIndex, index) {
                this.transitionName = index < oldIndex
                    ? 'slide-next'
                    : 'slide-prev'
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
        },
        render(createElement) {
            if (this.isActive && this.visible) {
                const vnode = createElement('div', { attrs: { 'class': 'tab-item' } }, this.$slots.default)
                if (!this.$parent.animated) {
                    return vnode
                }
                return createElement('transition', {
                    props: {
                        'name': this.transitionName
                    },
                    on: {
                        'before-enter': () => { this.$parent.isTransitioning = true },
                        'after-enter': () => { this.$parent.isTransitioning = false }
                    }
                }, [vnode])
            }
        }
    }
</script>
