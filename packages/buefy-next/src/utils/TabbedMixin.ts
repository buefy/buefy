import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import BIcon from '../components/icon/Icon.vue'
import BSlotComponent from '../utils/SlotComponent'
import ProviderParentMixin, { Sorted } from './ProviderParentMixin'
import type { TabbedChild } from './TabbedTypes'
import { bound } from './helpers'

export default <Child extends TabbedChild>(cmp: string) => defineComponent({
    components: {
        BIcon,
        BSlotComponent
    },
    mixins: [ProviderParentMixin<typeof Sorted, Child>(cmp, Sorted)],
    props: {
        modelValue: {
            type: [String, Number, null] as PropType<string | number | null | undefined>,
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
    emits: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        'update:modelValue': (_value: string | number | null | undefined) => true
    },
    data() {
        return {
            activeId: this.modelValue, // Internal state
            defaultSlots: [],
            contentHeight: 0,
            isTransitioning: false
        }
    },
    computed: {
        activeItem() {
            // the `childItems` data field has the type `UnwrapRefSimple<Child[]>`.
            // while `UnwrapRefSimple<T>` has the same structure as `T`, it is
            // not implicitly assignable to `T` when `T` is given as a type
            // parameter.
            const childItems: Child[] = this.childItems as Child[]
            return this.activeId === undefined
                ? this.items[0]
                : (this.activeId === null
                    ? null
                    : childItems.find((i) => i.uniqueValue === this.activeId))
        },
        items() {
            return this.sortedItems
        }
    },
    watch: {
        /*
         * When v-model is changed set the new active tab.
         */
        modelValue(value) {
            if (typeof value === 'number') {
                // Backward compatibility: converts the index value to an id
                value = bound(value, 0, this.items.length - 1)
                this.activeId = this.items[value].uniqueValue
            } else {
                this.activeId = value
            }
        },
        /*
         * Sync internal state with external state
         */
        activeId(val, oldValue) {
            const oldTab = oldValue !== undefined && oldValue !== null
                ? this.childItems.find((i) => i.uniqueValue === oldValue)
                : null

            if (oldTab && this.activeItem) {
                oldTab.deactivate(this.activeItem.index)
                this.activeItem.activate(oldTab.index)
            }

            val = this.activeItem
                ? (typeof this.modelValue === 'number' ? this.items.indexOf(this.activeItem) : this.activeItem.uniqueValue)
                : undefined

            if (val !== this.modelValue) {
                this.$emit('update:modelValue', val)
            }
        }
    },
    methods: {
        /*
        * Child click listener, emit input event and change active child.
        */
        childClick(child: TabbedChild) {
            this.activeId = child.uniqueValue
        },

        getNextItemIdx(fromIdx: number, skipDisabled = false) {
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
        getPrevItemIdx(fromIdx: number, skipDisabled = false) {
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
    },
    mounted() {
        if (typeof this.modelValue === 'number') {
            // Backward compatibility: converts the index value to an id
            const value = bound(this.modelValue, 0, this.items.length - 1)
            this.activeId = this.items[value].uniqueValue
        } else {
            this.activeId = this.modelValue
        }
    }
})
