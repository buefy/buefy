import Vue from 'vue'

export default {
    props: {
        value: [String, Number, Object],
        size: String,
        placeholder: String,
        expanded: Boolean,
        loading: Boolean,

        // Native options to use in HTML5 validation
        name: String,
        disabled: Boolean,
        readonly: Boolean,
        required: Boolean
    },
    data() {
        return {
            options: [],
            selected: this.value || '',
            isActive: false,
            isValid: true,
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
         * When v-model is changed:
         *   1. find and set the new selected option.
         *   2. If it's invalid, validate again.
         */
        value(value) {
            this.selected = value || ''
            !this.isValid && this.html5Validation()
        },

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
        },

        /**
         * When selected:
         *   1. Emit input event to update the user v-model.
         *   2. Force-close the dropdown.
         *   3. If it's invalid, validate again.
         */
        selected(value) {
            this.$emit('input', value)
            this.$emit('change', value)
            this.close(true)
            !this.isValid && this.html5Validation()
        }
    },
    methods: {
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
         * Blur listener.
         *   1. Close the dropdown.
         *   2. Fire the HTML5 validation.
         */
        blur(event) {
            this.$emit('blur', event)
            this.html5Validation()
        },

        /**
         * HTML5 validation, set isValid property.
         * If validation fail, send 'is-danger' type,
         * and error message to parent if it's a Field.
         */
        html5Validation() {
            if (this.$refs.select === undefined) return

            let type = null
            let message = null
            let isValid = true
            if (!this.$refs.select.checkValidity()) {
                type = 'is-danger'
                message = this.$refs.select.validationMessage
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
