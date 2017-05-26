<template>
    <span class="dropdown control"
        :class="{ 'is-disabled': disabled }">
        <a
            role="button"
            ref="trigger"
            class="trigger"
            @click="isActive = !isActive">
            <slot name="trigger"></slot>
        </a>

        <transition-group name="fade">
            <div
                key="bg"
                class="background is-hidden-desktop"
                v-show="isActive">
            </div>
            <span
                key="dropdown"
                class="box"
                :class="['is-dropdown', {
                    'is-opened-top': !isListInViewportVertically,
                    'is-opened-left': !isListInViewportHorizontally || preferLeft && isListInViewportHorizontally,
                    'is-narrow': narrowed
                }]"
                v-show="isActive"
                ref="dropdown">
                <ul>
                    <slot></slot>
                </ul>
            </span>
        </transition-group>
    </span>
</template>

<script>
    export default {
        name: 'bDropdown',
        props: {
            value: [String, Number, Object, Boolean],
            narrowed: Boolean,
            disabled: Boolean,
            preferLeft: Boolean
        },
        data() {
            return {
                selected: this.value || '',
                isActive: false,
                isListInViewportHorizontally: true,
                isListInViewportVertically: true,
                isMouseOverDropdown: false,
                isDropdownComponent: true // Used internally by DropdownOption
            }
        },
        watch: {
            /**
             * When v-model is changed set the new selected option.
             */
            value(value = '') {
                this.selectOption(value)
            },

            /**
             * When dropdown is toggled, check the visibility to know when
             * to open upwards or left sided.
             */
            isActive(active) {
                if (active) {
                    this.calcDropdownInViewportHorizontal()
                    this.calcDropdownInViewportVertical()
                } else {
                    // Timeout to wait for the animation to finish before recalculating
                    setTimeout(() => {
                        this.calcDropdownInViewportHorizontal()
                        this.calcDropdownInViewportVertical()
                    }, 100)
                }
            }
        },
        computed: {
            /**
             * White-listed items to not close when clicked.
             * Add input, dropdown, trigger and all children.
             */
            whiteList() {
                const whiteList = []
                whiteList.push(this.$refs.dropdown)
                whiteList.push(this.$refs.trigger)
                // Adds all chidren from dropdown
                if (this.$refs.dropdown !== undefined) {
                    const children = this.$refs.dropdown.querySelectorAll('*')
                    for (const child of children) {
                        whiteList.push(child)
                    }
                }
                // Adds all children from trigger
                if (this.$refs.trigger !== undefined) {
                    const children = this.$refs.trigger.querySelectorAll('*')
                    for (const child of children) {
                        whiteList.push(child)
                    }
                }

                return whiteList
            }
        },
        methods: {
            /**
             * Click listener.
             *   1. Set new selected option.
             *   1. Emit input event to update the user v-model.
             *   2. Force-close the dropdown.
             */
            selectOption(value = '', isClickable) {
                if (!isClickable) return

                this.selected = value
                this.$emit('input', value)
                this.$emit('change', value)
                this.isActive = false
            },

            /**
             * Close dropdown if clicked outside.
             */
            clickedOutside(event) {
                if (this.whiteList.indexOf(event.target) < 0) {
                    this.isActive = false
                }
            },

            /**
             * Calculate if the dropdown is vertically visible when activated,
             * otherwise it is openened upwards.
             */
            calcDropdownInViewportVertical() {
                this.$nextTick(() => {
                    const rect = this.$refs.dropdown.getBoundingClientRect()

                    this.isListInViewportVertically = (
                        rect.top >= 0 &&
                        rect.bottom <= (window.innerHeight ||
                            document.documentElement.clientHeight)
                    )
                })
            },

            /**
             * Calculate if the dropdown is horizontally visible when activated,
             * otherwise it is opened left sided.
             */
            calcDropdownInViewportHorizontal() {
                this.$nextTick(() => {
                    const rect = this.$refs.dropdown.getBoundingClientRect()

                    this.isListInViewportHorizontally = (
                        rect.left >= 0 &&
                        rect.right <= (window.innerWidth ||
                            document.documentElement.clientWidth)
                    )
                })
            }
        },
        created() {
            if (typeof window !== 'undefined') {
                document.addEventListener('click', this.clickedOutside)
                window.addEventListener('resize', this.calcDropdownInViewportHorizontal)
                window.addEventListener('resize', this.calcDropdownInViewportVertical)
            }
        },
        beforeDestroy() {
            if (typeof window !== 'undefined') {
                document.removeEventListener('click', this.clickedOutside)
                window.removeEventListener('resize', this.calcDropdownInViewportHorizontal)
                window.removeEventListener('resize', this.calcDropdownInViewportVertical)
            }
        }
    }
</script>
