<template>
    <div class="b-tabs" :class="mainClasses">
        <nav class="tabs" :class="navClasses">
            <ul>
                <li
                    v-for="(tabItem, index) in tabItems"
                    :key="index"
                    v-show="tabItem.visible"
                    :class="{ 'is-active': activeTab === index, 'is-disabled': tabItem.disabled }">

                    <b-slot-component
                        v-if="tabItem.$slots.header"
                        :component="tabItem"
                        name="header"
                        tag="a"
                        @click.native="tabClick(index)"
                    />
                    <a v-else @click="tabClick(index)">
                        <b-icon
                            v-if="tabItem.icon"
                            :icon="tabItem.icon"
                            :pack="tabItem.iconPack"
                            :size="size"/>
                        <span>{{ tabItem.label }}</span>
                    </a>
                </li>
            </ul>
        </nav>
        <section class="tab-content" :class="{'is-transitioning': isTransitioning}">
            <slot/>
        </section>
    </div>
</template>

<script>
import Icon from '../icon/Icon'
import SlotComponent from '../../utils/SlotComponent'

export default {
    name: 'BTabs',
    components: {
        [Icon.name]: Icon,
        [SlotComponent.name]: SlotComponent
    },
    props: {
        value: Number,
        expanded: Boolean,
        type: String,
        size: String,
        position: String,
        animated: {
            type: Boolean,
            default: true
        },
        destroyOnHide: {
            type: Boolean,
            default: false
        },
        vertical: Boolean,
        multiline: Boolean
    },
    data() {
        return {
            activeTab: this.value || 0,
            defaultSlots: [],
            contentHeight: 0,
            isTransitioning: false,
            _isTabs: true // Used internally by TabItem
        }
    },
    computed: {
        mainClasses() {
            return {
                'is-fullwidth': this.expanded,
                'is-vertical': this.vertical,
                'is-multiline': this.multiline,
                [this.position]: this.position && this.vertical
            }
        },
        navClasses() {
            return [
                this.type,
                this.size,
                {
                    [this.position]: this.position && !this.vertical,
                    'is-fullwidth': this.expanded,
                    'is-toggle-rounded is-toggle': this.type === 'is-toggle-rounded'
                }
            ]
        },
        tabItems() {
            return this.defaultSlots
                .filter((vnode) =>
                    vnode.componentInstance &&
                    vnode.componentInstance.$data &&
                    vnode.componentInstance.$data._isTabItem)
                .map((vnode) => vnode.componentInstance)
        }
    },
    watch: {
        /**
        * When v-model is changed set the new active tab.
        */
        value(value) {
            this.changeTab(value)
        },

        /**
        * When tab-items are updated, set active one.
        */
        tabItems() {
            if (this.activeTab < this.tabItems.length) {
                this.tabItems[this.activeTab].isActive = true
            }
        }
    },
    methods: {
        refreshSlots() {
            this.defaultSlots = this.$slots.default || []
        },
        /**
        * Change the active tab and emit change event.
        */
        changeTab(newIndex) {
            if (this.activeTab === newIndex || this.tabItems[newIndex] === undefined) return

            if (this.activeTab < this.tabItems.length) {
                this.tabItems[this.activeTab].deactivate(this.activeTab, newIndex)
            }
            this.tabItems[newIndex].activate(this.activeTab, newIndex)
            this.activeTab = newIndex
            this.$emit('change', newIndex)
        },

        /**
        * Tab click listener, emit input event and change active tab.
        */
        tabClick(value) {
            if (this.activeTab === value) return
            this.$emit('input', value)
            this.changeTab(value)
        }
    },
    mounted() {
        if (this.activeTab < this.tabItems.length) {
            this.tabItems[this.activeTab].isActive = true
        }
        this.refreshSlots()
    }
}
</script>
