<template>
    <div class="autocomplete control" :class="{'is-expanded': expanded}">
        <b-input
            v-model="newValue"
            ref="input"
            :size="size"
            :loading="loading"
            :rounded="rounded"
            :icon="icon"
            :icon-pack="iconPack"
            :maxlength="maxlength"
            :autocomplete="newAutocomplete"
            v-bind="$attrs"
            @input="onInput"
            @focus="focused"
            @blur="onBlur"
            @keyup.native.esc.prevent="isActive = false"
            @keydown.native.tab="tabPressed"
            @keydown.native.enter.prevent="enterPressed"
            @keydown.native.up.prevent="keyArrows('up')"
            @keydown.native.down.prevent="keyArrows('down')"
        />

        <transition name="fade">
            <div
                class="dropdown-menu"
                :class="{ 'is-opened-top': !isListInViewportVertically }"
                v-show="isActive && (data.length > 0 || hasEmptySlot || hasHeaderSlot)"
                ref="dropdown">
                <div class="dropdown-content" v-show="isActive">
                    <div
                        v-if="hasHeaderSlot"
                        class="dropdown-item">
                        <slot name="header"/>
                    </div>
                    <a
                        v-for="(option, index) in data"
                        :key="index"
                        class="dropdown-item"
                        :class="{ 'is-hovered': option === hovered }"
                        @click="setSelected(option)">

                        <slot
                            v-if="hasDefaultSlot"
                            :option="option"
                            :index="index"
                        />
                        <span v-else>
                            {{ getValue(option, true) }}
                        </span>
                    </a>
                    <div
                        v-if="data.length === 0 && hasEmptySlot"
                        class="dropdown-item is-disabled">
                        <slot name="empty"/>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { getValueByPath } from '../../utils/helpers'
    import FormElementMixin from '../../utils/FormElementMixin'
    import Input from '../input/Input'

    export default {
        name: 'BAutocomplete',
        components: {
            [Input.name]: Input
        },
        mixins: [FormElementMixin],
        inheritAttrs: false,
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
            keepFirst: Boolean,
            clearOnSelect: Boolean,
            openOnFocus: Boolean
        },
        data() {
            return {
                selected: null,
                hovered: null,
                isActive: false,
                newValue: this.value,
                newAutocomplete: this.autocomplete || 'off',
                isListInViewportVertically: true,
                hasFocus: false,
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
                whiteList.push(this.$refs.input.$el.querySelector('input'))
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
            },

            /**
             * Check if exists "header" slot
             */
            hasHeaderSlot() {
                return !!this.$slots.header
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
             *   3. Close dropdown if value is clear or else open it
             */
            newValue(value) {
                this.$emit('input', value)
                // Check if selected is invalid
                const currentValue = this.getValue(this.selected)
                if (currentValue && currentValue !== value) {
                    this.setSelected(null, false)
                }
                // Close dropdown if input is clear or else open it
                if (this.hasFocus && (!this.openOnFocus || value)) {
                    this.isActive = !!value
                }
            },

            /**
             * When v-model is changed:
             *   1. Update internal value.
             *   2. If it's invalid, validate again.
             */
            value(value) {
                this.newValue = value
                !this.isValid && this.$refs.input.checkHtml5Validity()
            },

            /**
             * Select first option if "keep-first
             */
            data(value) {
                // Keep first option always pre-selected
                if (this.keepFirst) {
                    this.selectFirstOption(value)
                }
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
                    this.newValue = this.clearOnSelect ? '' : this.getValue(this.selected)
                }
                closeDropdown && this.$nextTick(() => { this.isActive = false })
            },

            /**
             * Select first option
             */
            selectFirstOption(options) {
                this.$nextTick(() => {
                    if (options.length) {
                        // If has visible data or open on focus, keep updating the hovered
                        if (this.openOnFocus || (this.newValue !== '' && this.hovered !== options[0])) {
                            this.setHovered(options[0])
                        }
                    } else {
                        this.setHovered(null)
                    }
                })
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
             */
            getValue(option) {
                if (!option) return

                return typeof option === 'object'
                    ? getValueByPath(option, this.field)
                    : option
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
                    let index = this.data.indexOf(this.hovered) + sum
                    index = index > this.data.length - 1 ? this.data.length : index
                    index = index < 0 ? 0 : index

                    this.setHovered(this.data[index])

                    const list = this.$refs.dropdown.querySelector('.dropdown-content')
                    const element = list.querySelectorAll('a.dropdown-item:not(.is-disabled)')[index]

                    if (!element) return

                    const visMin = list.scrollTop
                    const visMax = list.scrollTop + list.clientHeight - element.clientHeight

                    if (element.offsetTop < visMin) {
                        list.scrollTop = element.offsetTop
                    } else if (element.offsetTop >= visMax) {
                        list.scrollTop = (
                            element.offsetTop -
                            list.clientHeight +
                            element.clientHeight
                        )
                    }
                } else {
                    this.isActive = true
                }
            },

            /**
             * Focus listener.
             * If value is the same as selected, select all text.
             */
            focused(event) {
                if (this.getValue(this.selected) === this.newValue) {
                    this.$el.querySelector('input').select()
                }
                if (this.openOnFocus) {
                    this.isActive = true
                    if (this.keepFirst) {
                        this.selectFirstOption(this.data)
                    }
                }
                this.hasFocus = true
                this.$emit('focus', event)
            },

            /**
             * Blur listener.
            */
            onBlur(event) {
                this.hasFocus = false
                this.$emit('blur', event)
            },
            onInput(event) {
                const currentValue = this.getValue(this.selected)
                if (currentValue && currentValue === this.newValue) return
                this.$emit('typing', this.newValue)
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
