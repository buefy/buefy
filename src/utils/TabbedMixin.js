import Icon from '../components/icon/Icon'
import SlotComponent from '../utils/SlotComponent'
import ProviderParentMixin from './ProviderParentMixin'

export default (cmp) => ({
    mixins: [ProviderParentMixin(cmp)],
    components: {
        [Icon.name]: Icon,
        [SlotComponent.name]: SlotComponent
    },
    props: {
        value: {
            type: [String, Number],
            default: undefined
        },
        type: [String, Object],
        size: String,
        animated: {
            type: Boolean,
            default: true
        },
        vertical: {
            type: Boolean,
            default: false
        },
        position: String,
        destroyOnHide: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            activeId: this.value, // Internal state
            defaultSlots: [],
            contentHeight: 0,
            isTransitioning: false
        }
    },
    mounted() {
        // if (this.childItems.length < 1) {
        //     this.$destroy()
        //     throw new Error(this.$options.name + ' must have at least 1 item inside')
        // }

        if (typeof this.value === 'number') {
            // Backward compatibility: converts the index value to an id
            const value = Math.max(0, Math.min(this.value, this.items.length - 1))
            this.activeId = this.items[value].value
        } else {
            this.activeId = this.value
        }
    },
    computed: {
        activeItem() {
            return this.activeId === undefined ? this.items[0]
                : (this.activeId === null ? null
                    : this.childItems.find((i) => i.value === this.activeId))
        },
        items() {
            return this.sortedItems
        }
    },
    watch: {
        /**
         * When v-model is changed set the new active tab.
         */
        value(value) {
            if (typeof value === 'number') {
                // Backward compatibility: converts the index value to an id
                value = Math.max(0, Math.min(value, this.items.length - 1))
                this.activeId = this.items[value].value
            } else {
                this.activeId = value
            }
        },
        /**
         * Sync internal state with external state
         */
        activeId(val, oldValue) {
            const oldTab = oldValue !== undefined && oldValue !== null
                ? this.childItems.find((i) => i.value === oldValue) : null

            if (oldTab && this.activeItem) {
                oldTab.deactivate(this.activeItem.index)
                this.activeItem.activate(oldTab.index)
            }

            val = this.activeItem
                ? (typeof this.value === 'number' ? this.items.indexOf(this.activeItem) : this.activeItem.value)
                : undefined

            if (val !== this.value) {
                this.$emit('input', val)
            }
        }
    },
    methods: {
        /**
        * Child click listener, emit input event and change active child.
        */
        childClick(child) {
            this.activeId = child.value
        }
    }
})