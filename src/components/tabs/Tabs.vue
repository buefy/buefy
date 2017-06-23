<template>
    <div class="b-tabs">
        <nav class="tabs" :class="[type, size, position, { 'is-fullwidth': expanded }]">
            <ul>
                <li v-for="(tabItem, index) in tabItems"
                    :key="index"
                    :class="{ 'is-active': newValue === index }">
                    <a @click="tabClick(index)">
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
        </nav>
        <section class="tab-content">
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
                _isTabs: true // Used internally by TabItem
            }
        },
        watch: {
            /**
             * When v-model is changed set the new active tab.
             */
            value(value) {
                this.changeTab(this.newValue, value)
                this.newValue = value
            },

            /**
             * When tab-items are updated, set active one.
             */
            tabItems() {
                if (this.tabItems.length) {
                    this.tabItems[this.newValue].isActive = true
                }
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
            }
        },
        mounted() {
            if (this.tabItems.length) {
                this.tabItems[this.newValue].isActive = true
            }
        }
    }
</script>
