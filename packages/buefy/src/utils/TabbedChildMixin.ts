import { defineComponent, h as createElement, Transition, vShow, withDirectives } from 'vue'
import type { PropType } from 'vue'

import type { VueClassAttribute } from './config'
import InjectedChildMixin, { Sorted } from './InjectedChildMixin'
import type { TabbedParent } from './TabbedTypes'

export type TransitionName = 'slide-next' | 'slide-prev' | 'slide-up' | 'slide-down'

export default <Parent extends TabbedParent = TabbedParent>(parentCmp: string) => defineComponent({
    mixins: [InjectedChildMixin<typeof Sorted, Parent>(parentCmp, Sorted)],
    props: {
        label: String,
        icon: String,
        iconPack: String,
        visible: {
            type: Boolean,
            default: true
        },
        headerClass: {
            type: [String, Array, Object] as PropType<VueClassAttribute>,
            default: null
        }
    },
    data() {
        return {
            transitionName: null as TransitionName | null,
            elementClass: 'item' as string,
            elementRole: null as string | null
        }
    },
    computed: {
        isActive(): boolean {
            return this.parent.activeItem === this
        }
    },
    methods: {
        /*
         * Activate element, alter animation name based on the index.
         */
        activate(oldIndex: number) {
            this.transitionName = this.index < oldIndex
                ? this.parent.vertical ? 'slide-down' : 'slide-next'
                : this.parent.vertical ? 'slide-up' : 'slide-prev'
        },

        /*
         * Deactivate element, alter animation name based on the index.
         */
        deactivate(newIndex: number) {
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
        const vnode = withDirectives(
            createElement(
                'div',
                {
                    // NOTE: possible regression of #3272
                    // https://github.com/buefy/buefy/issues/3272
                    class: this.elementClass,
                    role: this.elementRole,
                    id: `${this.uniqueValue}-content`,
                    'aria-labelledby': this.elementRole
                        ? `${this.uniqueValue}-label`
                        : null,
                    tabindex: this.isActive ? 0 : -1
                },
                this.$slots
            ),
            [[vShow, this.isActive && this.visible]]
        )
        // check animated prop
        if (this.parent.animated) {
            return createElement(
                Transition,
                {
                    name: (this.parent.animation || this.transitionName) ?? undefined,
                    appear: this.parent.animateInitially === true || undefined,
                    onBeforeEnter: () => { this.parent.isTransitioning = true },
                    onAfterEnter: () => { this.parent.isTransitioning = false }
                },
                { default: () => vnode }
            )
        }
        return vnode
    }
})
