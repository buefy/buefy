<template>
    <p
        class="control autocomplete"
        :class="{ 'is-expanded': expanded, 'is-loading': loading  }">

        <input
            v-model="newValue"
            class="input"
            :class="[statusType, size]"
            ref="input"
            type="text"
            :placeholder="placeholder"
            :disabled="disabled"
            :name="name"
            :required="required"
            autocomplete="off"
            @focus="$emit('focus', $event)"
            @blur="blur"
            @keyup.esc.prevent="isActive = false"
            @keyup.enter.prevent="selectOptionAndEmit(this.selected)"
            @keydown.down.prevent="keyArrows('down')"
            @keydown.up.prevent="keyArrows('up')">

        <transition name="fade">
            <span
                class="box"
                :class="{ 'is-opened-top': !isListInViewportVertically }"
                v-show="isActive && visibleData.length > 0"
                ref="dropdown">
                <ul>
                    <template v-for="option in visibleData">
                        <li class="option"
                            :class="{ 'is-selected': option === selected }"
                            @click="selectOptionAndEmit(option)">

                            <slot :option="option"></slot>

                        </li>
                    </template>
                    <li v-if="data.length > maxResults" class="option is-disabled">&hellip;</li>
                </ul>
            </span>
        </transition>
    </p>
</template>

<script>
    import { getByPath } from '../../utils/helpers'

    export default {
        name: 'bAutocomplete',
        props: {
            value: String,
            data: Array,
            field: {
                type: String,
                default: 'text'
            },
            maxResults: {
                type: [Number, String],
                default: 6
            },
            size: String,
            placeholder: String,
            name: String,
            disabled: Boolean,
            required: Boolean,
            expanded: Boolean,
            loading: Boolean
        },
        data() {
            return {
                getByPath,
                selected: null,
                isActive: false,
                isValid: true,
                newValue: this.value,
                isListInViewportHorizontally: true,
                isListInViewportVertically: true
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

                return whiteList
            },

            /**
             * Splitted data depending on maxResults.
             */
            visibleData() {
                if (this.data.length <= this.maxResults) {
                    return this.data
                } else {
                    return this.data.slice(0, this.maxResults)
                }
            }
        },
        watch: {
            /**
             * When dropdown is toggled, check the visibility to know when
             * to open upwards.
             */
            isActive(active) {
                if (active) {
                    this.calcDropdownInViewportVertical()
                } else {
                    // Timeout to wait for the animation to finish before recalculating
                    setTimeout(() => {
                        this.calcDropdownInViewportVertical()
                    }, 120)
                }
            },

            newValue(value) {
                this.$emit('input', value)
                this.$emit('change', value)

                if (value === '') {
                    this.isActive = false
                    return
                }

                this.isActive = true
            },

            /**
             * When v-model is changed:
             *   1. find and set the new selected option.
             *   2. If it's invalid, validate again.
             */
            value(value) {
                this.newValue = value
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
            }
        },
        methods: {
            /**
             * Set which option is currently selected.
             */
            selectOption(option) {
                if (option === undefined) return

                this.selected = option
            },

            /**
             * Set which option is currently selected, update v-model and close dropdown.
             */
            selectOptionAndEmit(option) {
                this.selectOption(option)
                this.$emit('select', this.selected)
                this.newValue = getByPath(this.selected, this.field)
                this.$emit('input', getByPath(this.selected, this.field))
                this.$nextTick(() => { this.isActive = false })
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
             * Arrows keys listener.
             *
             * If dropdown is active:
             *   - Set hovered option.
             * If dropdown is not active:
             *   - Set selected option (just like native <select>).
             */
            keyArrows(direction) {
                const sum = direction === 'down' ? 1 : -1
                if (this.isActive) {
                    let index = this.visibleData.indexOf(this.selected) + sum
                    index = index > this.visibleData.length - 1 ? 0 : index
                    index = index < 0 ? this.visibleData.length - 1 : index

                    this.selectOption(this.visibleData[index])
                } else {
                    this.isActive = true
                }
            },

            /**
             * Blur listener.
             * 1. Close the dropdown.
             * 2. Fire the HTML5 validation.
             */
            blur(event) {
                this.$emit('blur', event)
                this.isActive = false
                this.html5Validation()
            },

            /**
             * HTML5 validation, set isValid property.
             * If validation fail, send 'is-danger' type,
             * and error message to parent if it's a Field.
             */
            html5Validation() {
                if (this.$refs.input === undefined) return

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
            }
        },
        created() {
            if (window !== undefined) {
                document.addEventListener('click', this.clickedOutside)
                window.addEventListener('resize', this.calcDropdownInViewportVertical)
            }
        },
        beforeDestroy() {
            if (window !== undefined) {
                document.removeEventListener('click', this.clickedOutside)
                window.removeEventListener('resize', this.calcDropdownInViewportVertical)
            }
        }
    }
</script>
