<template>
    <div class="autocomplete control" :class="{size, 'is-expanded': expanded}">
        <b-input v-model="newValue"
            ref="input"
            :size="size"
            :loading="loading"
            :icon="icon"
            :icon-pack="iconPack"
            :name="name"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :maxlength="maxlength"
            :minlength="minlength"
            :required="required"
            :min="min"
            :max="max"
            :step="step"
            :pattern="pattern"
            autocomplete="off"
            @change="$emit('change', newValue)"
            @focus="focused"
            @blur="blur"
            @keyup.native.esc.prevent="isActive = false"
            @keydown.native.enter.prevent="enterPressed"
            @keydown.native.up.prevent="keyArrows('up')"
            @keydown.native.down.prevent="keyArrows('down')">
        </b-input>

        <transition name="fade">
            <span class="box"
                :class="{ 'is-opened-top': !isListInViewportVertically }"
                v-show="isActive && visibleData.length > 0"
                ref="dropdown">
                <ul>
                    <li v-for="(option, index) in visibleData"
                        :key="index"
                        class="option"
                        :class="{ 'is-hovered': option === hovered }"
                        @click="setSelected(option)">

                        <slot v-if="hasCustomTemplate" :option="option" :index="index"></slot>
                        <span v-else v-html="getValue(option, true)"></span>
                    </li>
                    <li v-if="data.length > maxResults" class="option is-disabled">&hellip;</li>
                </ul>
            </span>
        </transition>
    </div>
</template>

<script>
    import { getValueByPath } from '../../utils/helpers'
    import FormElementMixin from '../../utils/FormElementMixin'
    import Input from '../input'

    export default {
        name: 'bAutocomplete',
        mixins: [FormElementMixin],
        components: {
            [Input.name]: Input
        },
        props: {
            value: String,
            data: Array,
            field: {
                type: String,
                default: 'value'
            },
            maxResults: {
                type: [Number, String],
                default: 6
            },
            keepFirst: Boolean,
            hasCustomTemplate: Boolean
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
                if (this.keepFirst && this.visibleData.length) {
                    this.$nextTick(() => {
                        if (this.hovered !== this.visibleData[0]) {
                            this.setHovered(this.visibleData[0])
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

                const regex = new RegExp(`(${this.newValue})`, 'gi')

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
             * If value is the same as selected, select all from input.
             */
            focused(event) {
                this.$emit('focus', event)
                if (this.getValue(this.selected) === this.newValue) this.$refs.input.focus()
            },

            /**
             * Blur listener.
             * Emit events and fire the HTML5 validation.
             */
            blur(event) {
                this.$emit('blur', event)
                this.$refs.input.checkHtml5Validity()
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
