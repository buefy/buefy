<template>
    <div class="b-tabs">
        <div class="tabs" :class="[type, size, position, { 'is-fullwidth': expanded }]">
            <ul>
                <li v-for="(tabItem, i) in tabItems" :class="{ 'is-active': newValue === i }">
                    <a @click="tabClick(i)">
                        <b-icon
                            v-if="tabItem.icon"
                            :icon="tabItem.icon"
                            :pack="tabItem.iconPack"
                            :size="size">
                        </b-icon>
                        <span>{{ tabItem.label }}</span>
                    </a>
                </li>
            </ul>
        </div>
        <section class="tab-content" :style="{ height: contentHeight + 'px' }">
            <slot></slot>
        </section>
    </div>
</template>

<script>
    import Icon from '../icon'

    export default {
        name: 'bTabs',
        components: {
            [Icon.name]: Icon
        },
        props: {
            value: [String, Number],
            expanded: Boolean,
            type: String,
            size: String,
            position: String,
            animated: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                newValue: this.value || 0,
                tabItems: [],
                contentHeight: 0,
                isTabsComponent: true // Used internally by TabItem
            }
        },
        watch: {
            /**
             * When v-model is changed set the new active tab.
             */
            value(value) {
                this.changeTab(this.newValue, value)
                this.newValue = value
                this.calcHeight()
            }
        },
        methods: {
            /**
             * Change the active tab.
             */
            changeTab(oldIndex, newIndex) {
                if (oldIndex === newIndex) return

                this.tabItems[oldIndex].deactivate(oldIndex, newIndex)
                this.tabItems[newIndex].activate(oldIndex, newIndex)
            },

            /**
             * Tab click listener, emit events and set new active tab.
             */
            tabClick(value) {
                this.$emit('input', value)
                this.$emit('change', value)
                this.changeTab(this.newValue, value)
                this.newValue = value
                this.calcHeight()
            },

            /**
             * Calculate the height of container based on the tab height.
             */
            calcHeight() {
                this.$nextTick(() => {
                    const height = this.tabItems[this.newValue].$el.clientHeight
                    this.contentHeight = height
                })
            }
        },
        created() {
            if (typeof window !== 'undefined') {
                window.addEventListener('resize', this.calcHeight)
            }
        },
        mounted() {
            this.tabItems[this.newValue].isActive = true
            this.calcHeight()
        },
        beforeDestroy() {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', this.calcHeight)
            }
        }
    }
</script>
