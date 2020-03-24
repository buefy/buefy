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
            transitionName: null,
            _isTabItem: true // Used internally by Tab
        }
    },
    methods: {
        /**
        * Activate tab, alter animation name based on the index.
        */
        activate(oldIndex, index) {
            this.transitionName = index < oldIndex
                ? this.$parent.vertical ? 'slide-down' : 'slide-next'
                : this.$parent.vertical ? 'slide-up' : 'slide-prev'
            this.isActive = true
        },

        /**
        * Deactivate tab, alter animation name based on the index.
        */
        deactivate(oldIndex, index) {
            this.transitionName = index < oldIndex
                ? this.$parent.vertical ? 'slide-down' : 'slide-next'
                : this.$parent.vertical ? 'slide-up' : 'slide-prev'
            this.isActive = false
        }
    },
    created() {
        if (!this.$parent.$data._isTabs) {
            this.$destroy()
            throw new Error('You should wrap bTabItem on a bTabs')
        }
        this.$parent.refreshSlots()
    },
    beforeDestroy() {
        this.$parent.refreshSlots()
    },
    render(createElement) {
        // if destroy apply v-if
        if (this.$parent.destroyOnHide) {
            if (!this.isActive || !this.visible) {
                return
            }
        }
        const vnode = createElement('div', {
            directives: [{
                name: 'show',
                value: this.isActive && this.visible
            }],
            class: 'tab-item'
        }, this.$slots.default)
        // check animated prop
        if (this.$parent.animated) {
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
        return vnode
    }
}
</script>
