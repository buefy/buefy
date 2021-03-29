<template>
    <div class="autocomplete control" :class="{ 'is-expanded': expanded }">
        <b-input
            v-model="newValue"
            ref="input"
            type="text"
            :size="size"
            :loading="loading"
            :rounded="rounded"
            :icon="icon"
            :icon-right="newIconRight"
            :icon-right-clickable="newIconRightClickable"
            :icon-pack="iconPack"
            :maxlength="maxlength"
            :autocomplete="newAutocomplete"
            :use-html5-validation="false"
            v-bind="$attrs"
            @input="onInput"
            @focus="focused"
            @blur="onBlur"
            @keyup.native.esc.prevent="isActive = false"
            @keydown.native="keydown"
            @keydown.native.up.prevent="keyArrows('up')"
            @keydown.native.down.prevent="keyArrows('down')"
            @icon-right-click="rightIconClick"
            @icon-click="(event) => $emit('icon-click', event)"
        />

        <transition name="fade">
            <div
                class="dropdown-menu"
                :class="{ 'is-opened-top': isOpenedTop && !appendToBody }"
                :style="style"
                v-show="isActive && (!isEmpty || hasEmptySlot || hasHeaderSlot)"
                ref="dropdown"
            >
                <div
                    class="dropdown-content"
                    v-show="isActive"
                    :style="contentStyle">
                    <div v-if="hasHeaderSlot" class="dropdown-item">
                        <slot name="header" />
                    </div>
                    <template v-for="(element, groupindex) in computedData">
                        <div
                            v-if="element.group"
                            :key="groupindex + 'group'"
                            class="dropdown-item">
                            <slot
                                v-if="hasGroupSlot"
                                name="group"
                                :group="element.group"
                                :index="groupindex" />
                            <span class="has-text-weight-bold" v-else>
                                {{ element.group }}
                            </span>
                        </div>
                        <a
                            v-for="(option, index) in element.items"
                            :key="groupindex + ':' + index"
                            class="dropdown-item"
                            :class="{ 'is-hovered': option === hovered }"
                            @click="setSelected(option, undefined, $event)"
                        >
                            <slot
                                v-if="hasDefaultSlot"
                                :option="option"
                                :index="index" />
                            <span v-else>
                                {{ getValue(option, true) }}
                            </span>
                        </a>
                    </template>
                    <div
                        v-if="isEmpty && hasEmptySlot"
                        class="dropdown-item is-disabled">
                        <slot name="empty" />
                    </div>
                    <div v-if="hasFooterSlot" class="dropdown-item">
                        <slot name="footer" />
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import {
    getValueByPath,
    removeElement,
    createAbsoluteElement,
    isCustomElement,
    toCssWidth
} from '../../utils/helpers'
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
        openOnFocus: Boolean,
        customFormatter: Function,
        checkInfiniteScroll: Boolean,
        keepOpen: Boolean,
        clearable: Boolean,
        maxHeight: [String, Number],
        dropdownPosition: {
            type: String,
            default: 'auto'
        },
        groupField: String,
        groupOptions: String,
        iconRight: String,
        iconRightClickable: Boolean,
        appendToBody: Boolean,
        confirmKeys: {
            type: Array,
            default: () => ['Tab', 'Enter']
        }
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
            style: {},
            _isAutocomplete: true,
            _elementRef: 'input',
            _bodyEl: undefined // Used to append to body
        }
    },
    computed: {
        computedData() {
            if (this.groupField) {
                if (this.groupOptions) {
                    const newData = []
                    this.data.forEach((option) => {
                        const group = getValueByPath(option, this.groupField)
                        const items = getValueByPath(option, this.groupOptions)
                        newData.push({ group, items })
                    })
                    return newData
                } else {
                    const tmp = {}
                    this.data.forEach((option) => {
                        const group = getValueByPath(option, this.groupField)
                        if (!tmp[group]) tmp[group] = []
                        tmp[group].push(option)
                    })
                    const newData = []
                    Object.keys(tmp).forEach((group) => {
                        newData.push({ group, items: tmp[group] })
                    })
                    return newData
                }
            }
            return [{ items: this.data }]
        },
        isEmpty() {
            if (!this.computedData) return true
            return !this.computedData.some((element) => element.items && element.items.length)
        },
        /**
         * White-listed items to not close when clicked.
         * Add input, dropdown and all children.
         */
        whiteList() {
            const whiteList = []
            whiteList.push(this.$refs.input.$el.querySelector('input'))
            whiteList.push(this.$refs.dropdown)
            // Add all children from dropdown
            if (this.$refs.dropdown !== undefined) {
                const children = this.$refs.dropdown.querySelectorAll('*')
                for (const child of children) {
                    whiteList.push(child)
                }
            }
            if (this.$parent.$data._isTaginput) {
                // Add taginput container
                whiteList.push(this.$parent.$el)
                // Add .tag and .delete
                const tagInputChildren = this.$parent.$el.querySelectorAll('*')
                for (const tagInputChild of tagInputChildren) {
                    whiteList.push(tagInputChild)
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
         * Check if exists group slot
         */
        hasGroupSlot() {
            return !!this.$scopedSlots.group
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
        },

        /**
         * Check if exists "footer" slot
         */
        hasFooterSlot() {
            return !!this.$slots.footer
        },

        /**
         * Apply dropdownPosition property
         */
        isOpenedTop() {
            return (
                this.dropdownPosition === 'top' ||
                    (this.dropdownPosition === 'auto' && !this.isListInViewportVertically)
            )
        },

        newIconRight() {
            if (this.clearable && this.newValue) {
                return 'close-circle'
            }
            return this.iconRight
        },

        newIconRightClickable() {
            if (this.clearable) {
                return true
            }
            return this.iconRightClickable
        },

        contentStyle() {
            return {
                maxHeight: toCssWidth(this.maxHeight)
            }
        }
    },
    watch: {
        /**
         * When dropdown is toggled, check the visibility to know when
         * to open upwards.
         */
        isActive(active) {
            if (this.dropdownPosition === 'auto') {
                if (active) {
                    this.calcDropdownInViewportVertical()
                } else {
                    // Timeout to wait for the animation to finish before recalculating
                    setTimeout(() => {
                        this.calcDropdownInViewportVertical()
                    }, 100)
                }
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
        },

        /**
         * Select first option if "keep-first
         */
        data() {
            // Keep first option always pre-selected
            if (this.keepFirst) {
                this.$nextTick(() => {
                    if (this.isActive) {
                        this.selectFirstOption(this.computedData)
                    }
                })
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
        setSelected(option, closeDropdown = true, event = undefined) {
            if (option === undefined) return

            this.selected = option
            this.$emit('select', this.selected, event)
            if (this.selected !== null) {
                this.newValue = this.clearOnSelect ? '' : this.getValue(this.selected)
                this.setHovered(null)
            }
            closeDropdown && this.$nextTick(() => {
                this.isActive = false
            })
            this.checkValidity()
        },

        /**
         * Select first option
         */
        selectFirstOption(element) {
            this.$nextTick(() => {
                if (element.length) {
                    // If has visible data or open on focus, keep updating the hovered
                    const option = element[0].items[0]
                    if (this.openOnFocus || (this.newValue !== '' && this.hovered !== option)) {
                        this.setHovered(option)
                    }
                } else {
                    this.setHovered(null)
                }
            })
        },

        keydown(event) {
            const { key } = event // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
            // prevent emit submit event
            if (key === 'Enter') event.preventDefault()
            // Close dropdown on Tab & no hovered
            this.isActive = key !== 'Tab'
            if (this.hovered === null) return
            if (this.confirmKeys.indexOf(key) >= 0) {
                // If adding by comma, don't add the comma to the input
                if (key === ',') event.preventDefault()

                // Close dropdown on select by Tab
                const closeDropdown = !this.keepOpen || key === 'Tab'
                this.setSelected(this.hovered, closeDropdown, event)
            }
        },

        /**
         * Close dropdown if clicked outside.
         */
        clickedOutside(event) {
            const target = isCustomElement(this) ? event.composedPath()[0] : event.target
            if (!this.hasFocus && this.whiteList.indexOf(target) < 0) {
                if (this.keepFirst && this.hovered) {
                    this.setSelected(this.hovered, true)
                } else {
                    this.isActive = false
                }
            }
        },

        /**
         * Return display text for the input.
         * If object, get value from path, or else just the value.
         */
        getValue(option) {
            if (option === null) return

            if (typeof this.customFormatter !== 'undefined') {
                return this.customFormatter(option)
            }
            return typeof option === 'object' ? getValueByPath(option, this.field) : option
        },

        /**
         * Check if the scroll list inside the dropdown
         * reached it's end.
         */
        checkIfReachedTheEndOfScroll(list) {
            if (list.clientHeight !== list.scrollHeight &&
                list.scrollTop + list.clientHeight >= list.scrollHeight
            ) {
                this.$emit('infinite-scroll')
            }
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

                this.isListInViewportVertically = rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                if (this.appendToBody) {
                    this.updateAppendToBody()
                }
            })
        },

        /**
         * Arrows keys listener.
         * If dropdown is active, set hovered option, or else just open.
         */
        keyArrows(direction) {
            const sum = direction === 'down' ? 1 : -1
            if (this.isActive) {
                const data = this.computedData.map(
                    (d) => d.items).reduce((a, b) => ([...a, ...b]), [])
                let index = data.indexOf(this.hovered) + sum
                index = index > data.length - 1 ? data.length - 1 : index
                index = index < 0 ? 0 : index

                this.setHovered(data[index])

                const list = this.$refs.dropdown.querySelector('.dropdown-content')
                const element = list.querySelectorAll('a.dropdown-item:not(.is-disabled)')[index]

                if (!element) return

                const visMin = list.scrollTop
                const visMax = list.scrollTop + list.clientHeight - element.clientHeight

                if (element.offsetTop < visMin) {
                    list.scrollTop = element.offsetTop
                } else if (element.offsetTop >= visMax) {
                    list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight
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
                    this.selectFirstOption(this.computedData)
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
            this.checkValidity()
        },
        rightIconClick(event) {
            if (this.clearable) {
                this.newValue = ''
                this.setSelected(null, false)
                if (this.openOnFocus) {
                    this.$refs.input.$el.focus()
                }
            } else {
                this.$emit('icon-right-click', event)
            }
        },
        checkValidity() {
            if (this.useHtml5Validation) {
                this.$nextTick(() => {
                    this.checkHtml5Validity()
                })
            }
        },
        updateAppendToBody() {
            const dropdownMenu = this.$refs.dropdown
            const trigger = this.$refs.input.$el
            if (dropdownMenu && trigger) {
                // update wrapper dropdown
                const root = this.$data._bodyEl
                root.classList.forEach((item) => root.classList.remove(item))
                root.classList.add('autocomplete')
                root.classList.add('control')
                if (this.expandend) {
                    root.classList.add('is-expandend')
                }
                const rect = trigger.getBoundingClientRect()
                let top = rect.top + window.scrollY
                let left = rect.left + window.scrollX
                if (!this.isOpenedTop) {
                    top += trigger.clientHeight
                } else {
                    top -= dropdownMenu.clientHeight
                }
                this.style = {
                    position: 'absolute',
                    top: `${top}px`,
                    left: `${left}px`,
                    width: `${trigger.clientWidth}px`,
                    maxWidth: `${trigger.clientWidth}px`,
                    zIndex: '99'
                }
            }
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('click', this.clickedOutside)
            if (this.dropdownPosition === 'auto') { window.addEventListener('resize', this.calcDropdownInViewportVertical) }
        }
    },
    mounted() {
        if (this.checkInfiniteScroll &&
            this.$refs.dropdown && this.$refs.dropdown.querySelector('.dropdown-content')
        ) {
            const list = this.$refs.dropdown.querySelector('.dropdown-content')
            list.addEventListener('scroll', () => this.checkIfReachedTheEndOfScroll(list))
        }
        if (this.appendToBody) {
            this.$data._bodyEl = createAbsoluteElement(this.$refs.dropdown)
            this.updateAppendToBody()
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('click', this.clickedOutside)
            if (this.dropdownPosition === 'auto') { window.removeEventListener('resize', this.calcDropdownInViewportVertical) }
        }
        if (this.checkInfiniteScroll &&
            this.$refs.dropdown && this.$refs.dropdown.querySelector('.dropdown-content')
        ) {
            const list = this.$refs.dropdown.querySelector('.dropdown-content')
            list.removeEventListener('scroll', this.checkIfReachedTheEndOfScroll)
        }
        if (this.appendToBody) {
            removeElement(this.$data._bodyEl)
        }
    }
}
</script>
