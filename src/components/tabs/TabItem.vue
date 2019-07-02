<template>
    <span>
        <nav
            v-if="hasMobileAccordion"
            class="tabs"
            :class="navClasses">
            <ul class="accordion-header">
                <li
                    :class="{ 'is-active': isActive, 'disabled': disabled }">
                    <a @click="activateMe">
                        <template v-if="tabItem.$slots.header">
                            <b-slot-component
                                :component="tabItem"
                                name="header"
                                tag="span" />
                        </template>
                        <template v-else>
                            <b-icon
                                v-if="tabItem.icon"
                                :icon="tabItem.icon"
                                :pack="tabItem.iconPack"
                                :size="size"/>
                            <span>{{ tabItem.label }}</span>
                        </template>
                    </a>
                </li>
            </ul>
        </nav>
        <transition
            :name="transitionName"
            @before-enter="beforeEnter"
            @after-enter="afterEnter"
            @enter="enter"
            @leave="leave">
            <div
                v-show="isActive && visible"
                class="tab-item"
                :class="{'is-active': isActive}">
                <div class="tab-item-inner">
                    <slot/>
                </div>
            </div>
        </transition>
    </span>
</template>

<script>
    import Icon from '../icon/Icon'
    import SlotComponent from '../../utils/SlotComponent'

    export default {
        name: 'BTabItem',
        components: {
            [Icon.name]: Icon,
            [SlotComponent.name]: SlotComponent
        },
        props: {
            label: String,
            icon: String,
            iconPack: String,
            disabled: Boolean,
            visible: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                isActive: false,
                transitionName: null
            }
        },
        computed: {
            hasMobileAccordion() {
                return this.$parent.hasMobileAccordion
            },
            /**
             * so we can style the accordion header the same
             * as the tabbed nav
             */
            navClasses() {
                return this.$parent.navClasses
            },
            index() {
                return this.$parent.tabItems.indexOf(this) || 0
            },
            isAccordionAnimated() {
                return this.$parent.animatedAccordion
            },
            tabItem() {
                return this.$parent.tabItems[this.index]
            }
        },
        methods: {
            /**
             * Activate tab, alter animation name based on the index.
             */
            activate(oldIndex, index) {
                if (!this.$parent.animated) {
                    this.transitionName = null
                } else {
                    this.transitionName = index < oldIndex
                        ? 'slide-next'
                        : 'slide-prev'
                }
                this.isActive = true
            },

            /**
             * Deactivate tab, alter animation name based on the index.
             */
            deactivate(oldIndex, index) {
                if (!this.$parent.animated) {
                    this.transitionName = null
                } else {
                    this.transitionName = index < oldIndex
                        ? 'slide-next'
                        : 'slide-prev'
                }
                this.isActive = false
            },

            /**
             * Activate this tab, used in hasMobileAccordion mode
             */
            activateMe() {
                this.$parent.tabClick(this.index)
            },

            /**
             * Expand / collapse transition
             */
            beforeEnter() {
                this.$parent.isTransitioning = true
            },
            afterEnter(element) {
                // eslint-disable-next-line no-param-reassign
                element.style.height = `auto`
                this.$parent.isTransitioning = false
            },
            enter(element) {
                const { width } = getComputedStyle(element)
                /* eslint-disable no-param-reassign */
                element.style.width = width
                element.style.position = `absolute`
                element.style.visibility = `hidden`
                element.style.height = `auto`
                /* eslint-enable */
                const { height } = getComputedStyle(element)
                /* eslint-disable no-param-reassign */
                element.style.width = null
                element.style.position = null
                element.style.visibility = null
                element.style.height = 0
                /* eslint-enable */
                // Force repaint to make sure the
                // animation is triggered correctly.
                // eslint-disable-next-line no-unused-expressions
                getComputedStyle(element).height
                setTimeout(() => {
                    // eslint-disable-next-line no-param-reassign
                    element.style.height = height
                })
            },
            leave(element) {
                const { height } = getComputedStyle(element)
                // eslint-disable-next-line no-param-reassign
                element.style.height = height
                // Force repaint to make sure the
                // animation is triggered correctly.
                // eslint-disable-next-line no-unused-expressions
                getComputedStyle(element).height
                setTimeout(() => {
                    // eslint-disable-next-line no-param-reassign
                    element.style.height = 0
                })
            }
        },
        created() {
            if (!this.$parent.$data._isTabs) {
                this.$destroy()
                throw new Error('You should wrap bTabItem on a bTabs')
            }
            this.$parent.tabItems.push(this)
        },
        beforeDestroy() {
            if (this.index >= 0) {
                this.$parent.tabItems.splice(this.index, 1)
            }
        }
    }
</script>
