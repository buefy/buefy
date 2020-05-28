export default {
    props: {
        id: {
            type: String,
            default() { return this._uid.toString() }
        },
        label: String,
        icon: String,
        iconPack: String,
        visible: {
            type: Boolean,
            default: true
        },
        value: [String, Number]
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
            return this.$tabbed ? this.$tabbed : false
        },
        index() {
            // this.$parent refers to the direct parent component
            // while this.parent refers to the Tabs component
            let el = this.$parent
            let child = this

            // This needs improvement to be able to work with different levels of nesting
            while (el && el !== this.parent && el.$children.filter((comp) => {
                return comp.tag === child.$vnode.tag
            }).length < 1) {
                child = el
                el = el.$parent
            }
            let children = el.$scopedSlots.default ? el.$scopedSlots.default() : el.$children

            return children.filter((comp) => {
                return comp.tag === child.$vnode.tag
            }).indexOf(child.$vnode) || 0
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
