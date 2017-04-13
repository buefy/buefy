<template>
    <p class="control has-icon has-icon-right">
        <slot></slot>
        <span class="select">
            <input
                v-model="inputValue"
                class="input"
                :class="[statusType, size]"
                ref="input"
                type="text"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="!searchable"
                autocomplete="off"
                @click="isActive = !isActive"
                @focus="$emit('focus', $event)"
                @blur="inputBlur($event)"
                @keyup.enter.prevent="inputEnter"
                @keyup.esc.prevent="isActive = false"
                @keydown.down.prevent="inputArrows('down')"
                @keydown.up.prevent="inputArrows('up')">

            <transition
                appear
                appear-active-class="fadeIn"
                enter-active-class="fadeIn"
                leave-active-class="fadeOut">

                <span
                    class="box"
                    :class="{ 'is-opened-top': !isListInViewport }"
                    v-show="isActive"
                    ref="list">
                    <ul>
                        <template v-for="(option, i) in searchOptions">
                            <li class="subheader" v-if="isSubheader(option, searchOptions[i - 1], i)">
                                {{ option.group }}
                            </li>
                            <li class="option"
                                :class="{
                                    'is-selected': option === selected,
                                    'is-hovered': option === hovered,
                                    'has-subheader': option.group
                                }"
                                @click="selectOption(option)"
                                @mouseenter="hoverOption(option)">
                                {{ option.label }}
                            </li>
                        </template>
                    </ul>
                </span>

            </transition>
        </span>
    </p>
</template>

<script>
    import Vue from 'vue'
    import Icon from '../icon'

    export default {
        name: 'bSelect',
        components: {
            [Icon.name]: Icon
        },
        props: {
            value: [String, Number],
            size: String,
            placeholder: String,
            disabled: Boolean,
            searchable: Boolean
        },
        data() {
            return {
                options: [],
                selected: null,
                hovered: null,
                isActive: false,
                inputValue: null,
                isListInViewport: true,
                isSelectComponent: true // Used internally by Option
            }
        },
        computed: {
            statusType() {
                if (this.$parent.isFieldComponent) {
                    return this.$parent.newType
                }
            },
            searchOptions() {
                if (!this.inputValue || this.selected !== null &&
                    this.selected.label === this.inputValue) {
                    return this.options
                }

                this.isActive = true
                return this.options.filter((option) => {
                    return option.label
                        .toString()
                        .toLowerCase()
                        .indexOf(this.inputValue.toLowerCase()) >= 0
                })
            }
        },
        watch: {
            isActive() {
                if (!this.isActive) {
                    // Wait for the animation to finish before recalculating
                    setTimeout(() => {
                        this.calcListInViewport()
                    }, 150)
                } else {
                    this.calcListInViewport()
                    if (this.searchable) {
                        this.$refs.input.select()
                    }
                }
            },
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
            selected(option) {
                if (!option) return

                this.$emit('input', option.value)
                this.$emit('change', option.value)
                this.inputValue = option.label
            }
        },
        methods: {
            selectOption(option, index) {
                if (option === undefined) return

                this.selected = option
                this.hoverOption(option)
            },
            hoverOption(option, index) {
                if (option === undefined || option === this.hovered) return

                // if (index !== undefined) {
                //     if (index < 6) {
                //         // First six keep on top
                //         this.$refs.list.scrollTop = 0
                //     } else if (index >= this.searchOptions.length - 6) {
                //         // Last six keep on bottom (the others are too buggy to make work)
                //         this.$refs.list.scrollTop = this.$refs.list.scrollHeight
                //     }
                // }
                this.hovered = option
            },
            clickedOutside(event) {
                // Close if clicked outside
                if (event.target !== this.$refs.input &&
                    event.target !== this.$refs.list) {
                    this.isActive = false
                }
            },
            calcListInViewport() {
                Vue.nextTick(() => {
                    const rect = this.$refs.list.getBoundingClientRect()

                    this.isListInViewport = (
                        rect.top >= 0 &&
                        rect.left >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                    )
                })
            },

            isSubheader(option, previousOption, i) {
                if (!option.group) return
                // If it's first and has group property already show group
                if (i === 0) return true

                if (previousOption === undefined) return
                return option.group !== previousOption.group
            },

            inputArrows(direction) {
                const sum = direction === 'down' ? 1 : -1
                if (!this.isActive) {
                    const index = this.options.indexOf(this.hovered) + sum
                    this.selectOption(this.options[index], index)
                } else {
                    const index = this.searchOptions.indexOf(this.hovered) + sum
                    this.hoverOption(this.searchOptions[index], index)
                }
            },
            inputEnter() {
                this.selectOption(this.hovered)
                this.isActive = false
            },
            inputBlur(event) {
                if (this.selected !== null) {
                    this.inputValue = this.selected.label
                }
                this.$emit('blur', event)
            }
        },
        created() {
            document.addEventListener('click', this.clickedOutside)
        },
        beforeDestroy() {
            document.removeEventListener('click', this.clickedOutside)
        }
    }
</script>
