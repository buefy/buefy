import {defineComponent} from 'vue-demi'
import {default as InjectedChildMixin, Sorted} from './InjectedChildMixin'
import TabbedChildMixinRender from './TabbedChildMixinRender'
import {getSlot} from '../utils/helpers'
import {h as createElement} from 'vue-demi'

export default (parentCmp) => defineComponent({
    mixins: [InjectedChildMixin(parentCmp, Sorted), TabbedChildMixinRender],
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
            default() { return Math.random().toString() }
        },
        headerClass: {
            type: [String, Array, Object],
            default: null
        }
    },
    data() {
        return {
            transitionName: null,
            elementClass: 'item'
        }
    },
    computed: {
        isActive() {
            return this.parent.activeItem === this
        },
        show() {
            return this.isActive && this.visible
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
    }
})
