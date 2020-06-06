export default {
    props: {
        label: String,
        icon: String,
        iconPack: String,
        visible: {
            type: Boolean,
            default: true
        },
        value: [String, Number]
    },
    data() {
        return {
            isActive: false,
            transitionName: null,
            elementClass: 'item'
        }
    },
    methods: {
        /**
         * Activate element, alter animation name based on the index.
         */
        activate(oldIndex, index) {
            this.transitionName = index < oldIndex
                ? this.$parent.vertical ? 'slide-down' : 'slide-next'
                : this.$parent.vertical ? 'slide-up' : 'slide-prev'
            this.isActive = true
        },

        /**
         * Deactivate element, alter animation name based on the index.
         */
        deactivate(oldIndex, index) {
            this.transitionName = index < oldIndex
                ? this.$parent.vertical ? 'slide-down' : 'slide-next'
                : this.$parent.vertical ? 'slide-up' : 'slide-prev'
            this.isActive = false
        }
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
            attrs: { 'class': this.elementClass }
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
