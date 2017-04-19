import Vue from 'vue'

export default {
    props: {
        value: [String, Number],
        size: String,
        placeholder: String,
        name: String,
        disabled: Boolean,
        required: Boolean,
        searchable: Boolean,
        expanded: Boolean
    },
    data() {
        return {
            options: [],
            selected: null,
            hovered: null,
            isActive: false,
            inputValue: null,
            isListInViewportHorizontally: true,
            isListInViewportVertically: true,
            isMouseOverDropdown: false,
            isSelectComponent: true // Used internally by Option
        }
    },
    computed: {
        /**
         * Type prop from parent if it's a Field.
         */
        statusType() {
            if (this.$parent.isFieldComponent) {
                return this.$parent.newType
            }
        },

        /**
         * Options that will be rendered.
         *
         * Activate the dropdown when filtered, this is to prevent
         * dropdown to not appear when user focused the input
         * by using tab key and not cliking on it.
         *
         * Filter the original options if:
         *   - Something is typed on input; or
         *   - Something is selected; and
         *   - Selected option is not the same of input value
         */
        filteredOptions() {
            if (!this.inputValue || this.selected !== null && this.selected.label === this.inputValue) {
                return this.options
            }

            this.isActive = true
            return this.options.filter((option) => {
                return option.label
                    .toString()
                    .toLowerCase()
                    .indexOf(this.inputValue.toLowerCase()) >= 0
            })
        },

        /**
         * White-listed items to not close when clicked,
         * adds all the refs from input, dropdown, trigger and all children.
         */
        whiteList() {
            const whiteList = []
            whiteList.push(this.$refs.input)
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
    watch: {
        /**
         * When dropdown is activated or deactivated checks the visibility
         * to know when to open upwards.
         * Also sets the previously selected option if deactivating.
         */
        isActive(active) {
            this.calcListInViewportHorizontal()
            this.calcListInViewportVertical()
            if (active) {
                if (this.selected !== null) {
                    Vue.nextTick(() => {
                        // Set scroll position to selected item
                        if (this.$refs[this.selected.uid] !== undefined) {
                            this.$refs.dropdown.scrollTop = this.$refs[this.selected.uid][0].offsetTop
                        }
                    })
                }
                if (this.searchable) {
                    this.$refs.input.select()
                }
            } else {
                if (this.selected !== null && !this.isMouseOverDropdown) {
                    this.inputValue = this.selected.label
                }
            }
        },

        /**
         * When v-model is changed, sets the new selected option.
         */
        value(value) {
            if (value === null || value === '') {
                this.selectOption(null)
                this.inputValue = null
                return
            }

            this.options.forEach((option) => {
                if (option.value === value) {
                    this.selectOption(option)
                    return
                }
            })
        },

        /**
         * When selected:
         *   1. Change the input value.
         *   2. Emit input event to update the user v-model.
         *   3. Close the dropdown.
         */
        selected(option) {
            if (!option) return

            this.$emit('input', option.value)
            this.$emit('change', option.value)
            this.inputValue = option.label
            this.isMouseOverDropdown = false
            this.isActive = false
        }
    },
    methods: {
        /**
         * Sets which option is currently selected.
         */
        selectOption(option, index) {
            if (option === undefined) return

            this.selected = option
            this.hoverOption(option)
        },

        /**
         * Sets which option is currently hovered.
         * Also emulates native <select> arrow selecting
         */
        hoverOption(option, index) {
            if (option === undefined || option === this.hovered) return

            if (index !== undefined) {
                const dropdown = this.$refs.dropdown
                const element = this.$refs[option.uid][0]
                const visMin = dropdown.scrollTop
                const visMax = dropdown.scrollTop + dropdown.clientHeight - element.clientHeight

                if (element.offsetTop < visMin) {
                    dropdown.scrollTop = element.offsetTop
                } else if (element.offsetTop >= visMax) {
                    dropdown.scrollTop = element.offsetTop - dropdown.clientHeight + element.clientHeight
                }
            }
            this.hovered = option
        },

        /**
         * Closes dropdown if clicked outside.
         */
        clickedOutside(event) {
            if (this.whiteList.indexOf(event.target) < 0) {
                this.isActive = false
            }
        },

        /**
         * Calculates if the dropdown dropdown is vertically visible when activated,
         * otherwise it is openened upwards.
         */
        calcListInViewportVertical() {
            Vue.nextTick(() => {
                const rect = this.$refs.dropdown.getBoundingClientRect()

                this.isListInViewportVertically = (
                    rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight ||
                        document.documentElement.clientHeight)
                )
            })
        },

        /**
         * Calculates if the dropdown dropdown is horizontally visible when activated,
         * otherwise it is opened left sided.
         */
        calcListInViewportHorizontal() {
            Vue.nextTick(() => {
                const rect = this.$refs.dropdown.getBoundingClientRect()

                this.isListInViewportHorizontally = (
                    rect.left >= 0 &&
                    rect.right <= (window.innerWidth ||
                        document.documentElement.clientWidth)
                )
            })
        },

        /**
         * Verify if next item is a subheader (another group chunk).
         */
        isSubheader(option, previousOption, i) {
            if (!option.group) return
            // If it's first and has group property already show as subheader
            if (i === 0) return true

            if (previousOption === undefined) return
            return option.group !== previousOption.group
        },

        /**
         * Arrows keys listener, set which option is currently hovered if the dropdown is active,
         * or sets selected option if dropdown is not active (just like native <select>).
         */
        keyArrows(direction) {
            const sum = direction === 'down' ? 1 : -1
            if (!this.isActive) {
                const index = this.options.indexOf(this.hovered) + sum
                this.selectOption(this.options[index], index)
            } else {
                const index = this.filteredOptions.indexOf(this.hovered) + sum
                this.hoverOption(this.filteredOptions[index], index)
            }
        },

        /**
         * Enter key listener, select the hovered option and close the dropdown.
         */
        keyEnter() {
            this.selectOption(this.hovered)
            this.isActive = false
        },

        keyEsc() {
            this.isActive = false
            this.isMouseOverDropdown = false
        },

        /**
         * Blur listener (lost focus), close the dropdown.
         */
        blur(event) {
            this.isActive = false
            this.$emit('blur', event)
        }
    },
    created() {
        document.addEventListener('click', this.clickedOutside)
        // document.addEventListener('scroll', this.clickedOutside)
        window.addEventListener('resize', this.calcListInViewportHorizontal)
        window.addEventListener('resize', this.calcListInViewportVertical)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.clickedOutside)
        // document.removeEventListener('scroll', this.clickedOutside)
        window.removeEventListener('resize', this.calcListInViewportHorizontal)
        window.removeEventListener('resize', this.calcListInViewportVertical)
    }
}
