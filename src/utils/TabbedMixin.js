import Icon from '../components/icon/Icon'
import SlotComponent from '../utils/SlotComponent'
import ProviderParentMixin, { Sorted } from './ProviderParentMixin'
import { bound } from './helpers'

export default (cmp) => ({
    mixins: [ProviderParentMixin(cmp, Sorted)],
    components: {
        [Icon.name]: Icon,
        [SlotComponent.name]: SlotComponent
    },
    props: {
        modelValue: {
            type: [String, Number],
            default: undefined
        },
        size: String,
        animated: {
            type: Boolean,
            default: true
        },
        animation: String,
        animateInitially: Boolean,
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
    emits: ['update:modelValue'],
    data() {
        return {
            activeId: this.modelValue, // Internal state
            defaultSlots: [],
            contentHeight: 0,
            isTransitioning: false
        }
    },
    mounted() {
        if (typeof this.modelValue === 'number') {
            // Backward compatibility: converts the index value to an id
            const value = bound(this.modelValue, 0, this.items.length - 1)
            this.activeId = this.items[value].value
        } else {
            this.activeId = this.modelValue
        }
    },
    computed: {
        activeItem() {
            return this.activeId === undefined
                ? this.items[0]
                : (this.activeId === null
                    ? null
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
        modelValue(value) {
            if (typeof value === 'number') {
                // Backward compatibility: converts the index value to an id
                value = bound(value, 0, this.items.length - 1)
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
                ? this.childItems.find((i) => i.value === oldValue)
                : null

            if (oldTab && this.activeItem) {
                oldTab.deactivate(this.activeItem.index)
                this.activeItem.activate(oldTab.index)
            }

            val = this.activeItem
                ? (typeof this.modelValue === 'number' ? this.items.indexOf(this.activeItem) : this.activeItem.value)
                : undefined

            if (val !== this.modelValue) {
                this.$emit('update:modelValue', val)
            }
        }
    },
    methods: {
        /**
        * Child click listener, emit input event and change active child.
        */
        childClick(child) {
            this.activeId = child.value
        },

        getNextItemIdx(fromIdx, skipDisabled = false) {
            let nextItemIdx = null
            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i]
                if (
                    fromIdx < item.index &&
                    (
                        item.visible &&
                        (
                            !skipDisabled ||
                            (
                                skipDisabled &&
                                !item.disabled
                            )
                        )
                    )
                ) {
                    nextItemIdx = item.index
                    break
                }
            }
            return nextItemIdx
        },
        getPrevItemIdx(fromIdx, skipDisabled = false) {
            let prevItemIdx = null
            for (let i = this.items.length - 1; i >= 0; i--) {
                const item = this.items[i]
                if (
                    item.index < fromIdx &&
                    (
                        item.visible &&
                        (
                            !skipDisabled ||
                            (
                                skipDisabled &&
                                !item.disabled
                            )
                        )
                    )
                ) {
                    prevItemIdx = item.index
                    break
                }
            }
            return prevItemIdx
        }
    }
})
