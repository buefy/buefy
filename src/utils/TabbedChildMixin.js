import { h as createElement } from 'vue'

import InjectedChildMixin, { Sorted } from './InjectedChildMixin'
import { makeUniqueId } from './make-unique-id'

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
            default() { return makeUniqueId() }
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
    render() {
        // if destroy apply v-if
        if (this.parent.destroyOnHide) {
            if (!this.isActive || !this.visible) {
                return
            }
        }
        const vnode = createElement('div', {
            // simulates v-show
            style: {
                display: this.isActive && this.visible ? '' : 'none'
            },
            class: this.elementClass,
            role: this.elementRole,
            id: `${this.value}-content`,
            'aria-labelledby': this.elementRole ? `${this.value}-label` : null,
            tabindex: this.isActive ? 0 : -1
        }, this.$slots.default())
        // check animated prop
        if (this.parent.animated) {
            return createElement('transition', {
                name: this.parent.animation || this.transitionName,
                appear: this.parent.animateInitially === true || undefined,
                onBeforeEnter: () => { this.parent.isTransitioning = true },
                onAfterEnter: () => { this.parent.isTransitioning = false }
            }, [vnode])
        }
        return vnode
    }
})
