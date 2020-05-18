import Icon from '../components/icon/Icon'
import SlotComponent from '../utils/SlotComponent'

export default {
    components: {
        [Icon.name]: Icon,
        [SlotComponent.name]: SlotComponent
    },
    props: {
        value: Number,
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
            activeChild: 0,
            defaultSlots: [],
            contentHeight: 0,
            isTransitioning: false
        }
    },
    watch: {
        /**
         * When v-model is changed set the new active child.
         */
        value(value) {
            const index = this.getIndexByValue(value, value)
            this.changeTab(index)
        },

        /**
         * When child-items are updated, set active one.
         */
        childItems() {
            if (this.activeChild < this.childItems.length) {
                let previous = this.activeChild
                this.childItems.map((child, idx) => {
                    if (child.isActive) {
                        previous = idx
                        if (previous < this.childItems.length) {
                            this.childItems[previous].isActive = false
                        }
                    }
                })
                this.childItems[this.activeChild].isActive = true
            } else if (this.activeChild > 0) {
                this.changeActive(this.activeChild - 1)
            }
        }
    },
    methods: {
        /**
         * Change the active child and emit change event.
         */
        changeActive(newIndex) {
            if (this.activeChild === newIndex) return

            if (newIndex > this.childItems.length) throw new Error('The index you trying to set is bigger than the childs length')

            if (this.activeChild < this.childItems.length) {
                this.childItems[this.activeChild].deactivate(this.activeChild, newIndex)
            }
            this.childItems[newIndex].activate(this.activeChild, newIndex)
            this.activeChild = newIndex
            this.$emit('change', this.getValueByIndex(newIndex))
        },

        /**
        * Child click listener, emit input event and change active child.
        */
        childClick(index) {
            if (this.activeChild === index) return
            this.$emit('input', this.getValueByIndex(index))
            this.changeActive(index)
        },

        refreshSlots() {
            this.defaultSlots = this.$slots.default || []
        },

        getIndexByValue(value) {
            let index = this.childItems.map((t) =>
                t.$options.propsData ? t.$options.propsData.value : undefined
            ).indexOf(value)
            return index >= 0 ? index : value
        },

        getValueByIndex(index) {
            const propsData = this.childItems[index].$options.propsData
            return propsData && propsData.value ? propsData.value : index
        }
    },
    mounted() {
        this.activeTab = this.getIndexByValue(this.value || 0)
        if (this.activeChild < this.childItems.length) {
            this.childItems[this.activeChild].isActive = true
        }
        this.refreshSlots()
    }
}
