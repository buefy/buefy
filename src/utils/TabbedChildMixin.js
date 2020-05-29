export default {
    props: {
        label: String,
        icon: String,
        iconPack: String,
        visible: {
            type: Boolean,
            default: true
        },
        value: {
            type: String,
            default() { return this._uid.toString() }
        }
    },
    inject: {$tabbed: {name: '$tabbed', default: false}},
    data() {
        return {
            transitionName: null,
            elementClass: 'item'
        }
    },
    computed: {
        parent() {
            return this.$tabbed
        },
        index() {
            let index = 0

            const deepSearch = (children) => {
                for (let child of children) {
                    if (child.tag === this.$vnode.tag) {
                        if (this.$vnode === child) {
                            return true
                        }
                        index += 1
                    } else if (child.tag) {
                        const sub = child.componentInstance
                            ? (child.componentInstance.$scopedSlots.default
                                ? child.componentInstance.$scopedSlots.default()
                                : child.componentInstance.$children)
                            : child.children
                        if (Array.isArray(sub) && sub.length > 0) {
                            if (deepSearch(sub.map((e) => e.$vnode))) { return true }
                        }
                    }
                }
                return false
            }

            deepSearch(this.parent.$scopedSlots.default())

            return index
        },
        isActive() {
            return this.parent.activeItem === this
        }
    },
    methods: {
        /**
         * Activate element, alter animation name based on the index.
         */
        activate(oldIndex) {
            this.transitionName = this.index < oldIndex
                ? this.parent.vertical ? 'slide-down' : 'slide-next'
                : this.parent.vertical ? 'slide-up' : 'slide-prev'
        },

        /**
         * Deactivate element, alter animation name based on the index.
         */
        deactivate(newIndex) {
            this.transitionName = newIndex < this.index
                ? this.parent.vertical ? 'slide-down' : 'slide-next'
                : this.parent.vertical ? 'slide-up' : 'slide-prev'
        }
    },
    created() {
        if (this.parent) { this.parent._registerItem(this) }
    },
    beforeDestroy() {
        if (this.parent) { this.parent._unregisterItem(this) }
    },
    render(createElement) {
        // if destroy apply v-if
        if (this.parent.destroyOnHide) {
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
        if (this.parent.animated) {
            return createElement('transition', {
                props: {
                    'name': this.transitionName
                },
                on: {
                    'before-enter': () => { this.parent.isTransitioning = true },
                    'after-enter': () => { this.parent.isTransitioning = false }
                }
            }, [vnode])
        }
        return vnode
    }
}
