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
        expanded: Boolean,
        loading: Boolean
    },
    data() {
        return {
            options: [],
            selected: null,
            hovered: null,
            maxWidth: 'auto',
            isActive: false,
            isValid: true,
            isReadonly: !this.searchable, // Separated property to validate with HTML5
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
         * Options that is rendered.
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
         * White-listed items to not close when clicked.
         * Add input, dropdown, trigger and all children.
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
         * When dropdown is toggled, check the visibility to know when
         * to open upwards or left sided.
         *
         * - Activating: set dropdown scroll to the selected option and select all (focus) of input.
         * - Deactivating: set the previously selected option.
         */
        isActive(active) {
            this.calcDropdownInViewportHorizontal()
            this.calcDropdownInViewportVertical()
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
         * When v-model is changed:
         *   1. find and set the new selected option.
         *   2. If it's invalid, validate again.
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
            !this.isValid && this.html5Validation()
        },

        /**
         * When selected:
         *   1. Change the input value.
         *   2. Emit input event to update the user v-model.
         *   3. Force-close the dropdown.
         *   4. If it's invalid, validate again.
         */
        selected(option) {
            if (!option) return

            this.$emit('input', option.value)
            this.$emit('change', option.value)
            this.inputValue = option.label
            this.close(true)
            !this.isValid && this.html5Validation()
        }
    },
    methods: {
        /**
         * Set which option is currently selected.
         * Add the option to the currently hovered as well to not lose
         * the scroll posiiton when using arrow keys.
         */
        selectOption(option, index) {
            if (option === undefined) return

            this.selected = option
            this.hoverOption(option)
        },

        /**
         * Set which option is currently hovered.
         * Emulate native <select> arrow selecting; if hovered option is:
         *   1. Between visible area of dropdown:
         *     - Do nothing.
         *
         *   2. Lesser than minimum part:
         *     - Set dropdown scroll to hovered option and keeping it in the top.
         *
         *   3. Greater than or equal maximum part:
         *     - Set dropdown scroll to hovered option but keeping it in the bottom.
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
         * Close the dropdown.
         * If force, also change isMouseOverDropdown.
         */
        close(force) {
            this.isActive = false
            if (force) this.isMouseOverDropdown = false
        },

        /**
         * Close dropdown if clicked outside.
         */
        clickedOutside(event) {
            if (this.whiteList.indexOf(event.target) < 0) {
                this.close()
            }
        },

        /**
         * Calculate if the dropdown is vertically visible when activated,
         * otherwise it is openened upwards.
         */
        calcDropdownInViewportVertical() {
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
         * Calculate if the dropdown is horizontally visible when activated,
         * otherwise it is opened left sided.
         */
        calcDropdownInViewportHorizontal() {
            // If it's a Select, don't calculate horizontal visibility
            if (!this.isDropdown) return

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
         * Calculate the max-width of the input based on the option
         * with most length.
         */
        calcMaxWidth() {
            // If Select is expanded or it's a Dropdown, don't calculate
            if (this.expanded || this.isDropdown) return

            Vue.nextTick(() => {
                let options = this.options
                options = [...options].sort((a, b) => {
                    return b.label.length - a.label.length
                })

                if (options.length > 0) {
                    const maxLabelLength = options.length > 0
                        ? options[0].label.length
                        : 0
                    const placeholderLength = this.placeholder
                        ? this.placeholder.length
                        : 0
                    // Check if placeholder have more length than the option
                    const maxLenght = Math.max(maxLabelLength, placeholderLength)

                    // Length - 35% (because not all letters are as big as an M)
                    // + 2.5em of padding right + 0.625em of padding left
                    this.maxWidth = maxLenght * 0.65 + 2.5 + 0.625 + 'em'
                }
            })
        },

        /**
         * Verify if next item is a subheader (another group chunk).
         */
        isSubheader(option, previousOption, i) {
            // If it's a Dropdown, don't verify
            if (this.isDropdown) return

            if (!option.group) return
            // If it's first and has group property already show as subheader
            if (i === 0) return true

            if (previousOption === undefined) return
            return option.group !== previousOption.group
        },

        /**
         * Arrows keys listener.
         *
         * If dropdown is active:
         *   - Set hovered option.
         * If dropdown is not active:
         *   - Set selected option (just like native <select>).
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
         * Enter key listener.
         * Select the hovered option and close the dropdown.
         */
        keyEnter() {
            this.selectOption(this.hovered)
            this.close()
        },

        /**
         * Esc key listener.
         * Force-close the dropdown.
         */
        keyEsc() {
            this.close(true)
        },

        /**
         * Blur listener.
         *   1. Close the dropdown.
         *   2. Fire the HTML5 validation.
         */
        blur(event) {
            this.$emit('blur', event)
            this.close()
            this.html5Validation()
        },

        /**
         * HTML5 validation, set isValid property.
         * If validation fail, send 'is-danger' type,
         * and error message to parent if it's a Field.
         */
        html5Validation() {
            if (this.$refs.input === undefined) return

            // Disabling readonly temporarily otherwise the HTML5 validation won't work
            this.isReadonly = false
            Vue.nextTick(() => {
                let type = null
                let message = null
                let isValid = true
                if (!this.$refs.input.checkValidity()) {
                    type = 'is-danger'
                    message = this.$refs.input.validationMessage
                    isValid = false
                }
                this.isValid = isValid
                if (this.$parent.isFieldComponent) {
                    // Set type only if user haven't defined
                    if (!this.$parent.type) {
                        this.$parent.newType = type
                    }
                    // Set message only if user haven't defined
                    if (!this.$parent.message) {
                        this.$parent.newMessage = message
                    }
                }

                // Back to what readonly was
                this.isReadonly = !this.searchable
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
    mounted() {
        this.calcMaxWidth()
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('click', this.clickedOutside)
            window.removeEventListener('resize', this.calcDropdownInViewportHorizontal)
            window.removeEventListener('resize', this.calcDropdownInViewportVertical)
        }
    }
}
