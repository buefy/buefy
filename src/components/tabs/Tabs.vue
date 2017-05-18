<template>
    <div class="b-tabs">
        <div class="tabs" :class="[type, size, position, { 'is-fullwidth': expanded }]">
            <ul>
                <li v-for="(tabItem, i) in tabItems" :class="{ 'is-active': newValue === i }">
                    <a @click="changeTab(i)">
                        <b-icon
                            v-if="tabItem.icon"
                            :icon="tabItem.icon"
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
            position: String
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
            value(value) {
                this.tabItems[this.newValue].deactivate(this.newValue, value)
                this.tabItems[value].activate(this.newValue, value)

                this.$nextTick(() => {
                    const height = this.tabItems[value].$el.clientHeight
                    this.contentHeight = height
                })

                this.newValue = value
            }
        },
        methods: {
            changeTab(value) {
                this.$emit('input', value)
            }
        },
        mounted() {
            this.tabItems[this.newValue].isActive = true

            this.$nextTick(() => {
                const height = this.tabItems[this.newValue].$el.clientHeight
                this.contentHeight = height
            })
        }
    }
</script>
