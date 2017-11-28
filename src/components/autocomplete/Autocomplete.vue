<template>
    <div class="autocomplete control" :class="{size, 'is-expanded': expanded}">
        <b-input
            v-model="newValue"
            ref="input"
            :size="size"
            :loading="loading"
            :icon="icon"
            :icon-pack="iconPack"
            :maxlength="maxlength"
            autocomplete="off"
            v-bind="$attrs"
            @focus="focused"
            @blur="$emit('blur', $event)"
            @keyup.native.esc.prevent="isActive = false"
            @keydown.native.tab="tabPressed"
            @keydown.native.enter.prevent="enterPressed"
            @keydown.native.up.prevent="keyArrows('up')"
            @keydown.native.down.prevent="keyArrows('down')">
        </b-input>

        <transition name="fade">
            <div class="dropdown-menu"
                :class="{ 'is-opened-top': !isListInViewportVertically }"
                v-show="isActive && (visibleData.length > 0 || hasEmptySlot)"
                ref="dropdown">
                <div class="dropdown-content">
                    <a v-for="(option, index) in visibleData"
                        :key="index"
                        class="dropdown-item"
                        :class="{ 'is-hovered': option === hovered }"
                        @click="setSelected(option)">

                        <slot v-if="hasDefaultSlot" :option="option" :index="index"></slot>
                        <span v-else v-html="getValue(option, true)"></span>
                    </a>
                    <div v-if="data.length > maxResults"
                        class="dropdown-item is-disabled">
                        &hellip;
                    </div>
                    <div v-else-if="visibleData.length === 0"
                        class="dropdown-item is-disabled">
                        <slot name="empty"></slot>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { getValueByPath, escapeRegExpChars } from '../../utils/helpers'
    import FormElementMixin from '../../utils/FormElementMixin'
    import Input from '../input'

    export default {
        name: 'bAutocomplete',
        inheritAttrs: false,
        mixins: [FormElementMixin],
        components: {
            [Input.name]: Input
        },
        props: {
            value: [Number, String],
            data: {
                type: Array,
                default: () => []
            },
            field: {
                type: String,
                default: 'value'
            },
            maxResults: {
                type: [Number, String],
                default: 6
            },
            keepFirst: Boolean
        },
        data() {
            return {
                selected: null,
                hovered: null,
                isActive: false,
                newValue: this.value,
                isListInViewportVertically: true,
                _isAutocomplete: true,
                _elementRef: 'input'
            }
        },
        computed: {
            /**
             * White-listed items to not close when clicked.
             * Add input, dropdown and all children.
             */
            whiteList() {
                const whiteList = []
                whiteList.push(this.$refs.input)
                whiteList.push(this.$refs.dropdown)
                // Add all chidren from dropdown
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
                return this.data.length <= this.maxResults
                    ? this.data
                    : this.data.slice(0, this.maxResults)
            },

            /**
             * Check if exists default slot
             */
            hasDefaultSlot() {
                return !!this.$scopedSlots.default
            },

            /**
             * Check if exists "empty" slot
             */
            hasEmptySlot() {
                return !!this.$slots.empty
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
                    this.$nextTick(() => this.setHovered(null))
                    // Timeout to wait for the animation to finish before recalculating
                    setTimeout(() => {
                        this.calcDropdownInViewportVertical()
                    }, 100)
                }
            },

            /**
             * When updating input's value
             *   1. Emit changes
             *   2. If value isn't the same as selected, set null
             *   3. Select first option if "keep-first"
             *   4. Close dropdown if value is clear or else open it
             */
            newValue(value) {
                this.$emit('input', value)

                // Check if selected is invalid
                if (this.getValue(this.selected) !== value) this.setSelected(null, false)

                // Keep first option always pre-selected
                if (this.keepFirst) {
                    this.$nextTick(() => {
                        if (this.visibleData.length) {
                            // If has visible data, keep updating the hovered
                            if (this.newValue !== '' && this.hovered !== this.visibleData[0]) {
                                this.setHovered(this.visibleData[0])
                            }
                        } else {
                            this.setHovered(null)
                        }
                    })
                }

                // Close dropdown if input is clear or else open it
                this.isActive = !!value
            },

            /**
             * When v-model is changed:
             *   1. Update internal value.
             *   2. If it's invalid, validate again.
             */
            value(value) {
                this.newValue = value
                !this.isValid && this.$refs.input.checkHtml5Validity()
            }
        },
        methods: {
            /**
             * Set which option is currently hovered.
             */
            setHovered(option) {
                if (option === undefined) return

                this.hovered = option
            },

            /**
             * Set which option is currently selected, update v-model,
             * update input value and close dropdown.
             */
            setSelected(option, closeDropdown = true) {
                if (option === undefined) return

                this.selected = option
                this.$emit('select', this.selected)
                if (this.selected !== null) {
                    this.newValue = this.getValue(this.selected)
                }
                closeDropdown && this.$nextTick(() => { this.isActive = false })
            },

            /**
             * Enter key listener.
             * Select the hovered option.
             */
            enterPressed() {
                if (this.hovered === null) return
                this.setSelected(this.hovered)
            },

            /**
             * Tab key listener.
             * Select hovered option if it exists, close dropdown, then allow
             * native handling to move to next tabbable element.
             */
            tabPressed() {
                if (this.hovered === null) {
                    this.isActive = false
                    return
                }
                this.setSelected(this.hovered)
            },

            /**
             * Close dropdown if clicked outside.
             */
            clickedOutside(event) {
                if (this.whiteList.indexOf(event.target) < 0) this.isActive = false
            },

            /**
             * Return display text for the input.
             * If object, get value from path, or else just the value.
             * If hightlight, find the text with regex and make bold.
             */
            getValue(option, isHighlight = false) {
                if (!option) return

                const value = typeof option === 'object'
                    ? getValueByPath(option, this.field)
                    : option

                const escapedValue = escapeRegExpChars(this.newValue)
                const regex = new RegExp(`(${escapedValue})`, 'gi')

                return isHighlight
                    ? value.replace(regex, '<b>$1</b>')
                    : value
            },

            /**
             * Calculate if the dropdown is vertically visible when activated,
             * otherwise it is openened upwards.
             */
            calcDropdownInViewportVertical() {
                this.$nextTick(() => {
                    /**
                     * this.$refs.dropdown may be undefined
                     * when Autocomplete is conditional rendered
                     */
                    if (this.$refs.dropdown === undefined) return

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
             * If dropdown is active, set hovered option, or else just open.
             */
            keyArrows(direction) {
                const sum = direction === 'down' ? 1 : -1
                if (this.isActive) {
                    let index = this.visibleData.indexOf(this.hovered) + sum
                    index = index > this.visibleData.length - 1 ? 0 : index
                    index = index < 0 ? this.visibleData.length - 1 : index

                    this.setHovered(this.visibleData[index])
                } else {
                    this.isActive = true
                }
            },

            /**
             * Focus listener.
             * If value is the same as selected, select all text.
             */
            focused(event) {
                if (this.getValue(this.selected) === this.newValue) this.focus()
                this.$emit('focus', event)
            }
        },
        created() {
            if (typeof window !== 'undefined') {
                document.addEventListener('click', this.clickedOutside)
                window.addEventListener('resize', this.calcDropdownInViewportVertical)
            }
        },
        beforeDestroy() {
            if (typeof window !== 'undefined') {
                document.removeEventListener('click', this.clickedOutside)
                window.removeEventListener('resize', this.calcDropdownInViewportVertical)
            }
        }
    }
</script>
