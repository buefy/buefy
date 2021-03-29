import {default as InjectedChildMixin, Sorted} from './InjectedChildMixin'

export default (parentCmp) => ({
    mixins: [InjectedChildMixin(parentCmp, Sorted)],
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
        },
        headerClass: {
            type: [String, Array, Object],
            default: null
        }
    },
    data() {
        return {
            transitionName: null,
            elementClass: 'item',
            elementRole: null
        }
    },
    computed: {
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
            attrs: {
                'class': this.elementClass,
                'role': this.elementRole,
                'id': `${this.value}-content`,
                'aria-labelledby': this.elementRole ? `${this.value}-label` : null,
                'tabindex': this.isActive ? 0 : -1
            }
        }, this.$slots.default)
        // check animated prop
        if (this.parent.animated) {
            return createElement('transition', {
                props: {
                    'name': this.parent.animation || this.transitionName
                },
                on: {
                    'before-enter': () => { this.parent.isTransitioning = true },
                    'after-enter': () => { this.parent.isTransitioning = false }
                }
            }, [vnode])
        }
        return vnode
    }
})
