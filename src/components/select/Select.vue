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
                @click="isActive = !isActive"
                @focus="$emit('focus', $event)">

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
                        <li class="option"
                            :class="{ 'is-selected': option === selected }"
                            v-for="option in options"
                            @click="select(option)">
                            {{ option.label }}
                        </li>
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
            }
        },
        watch: {
            isActive(value) {
                this.isInViewport()
            },
            value(value) {
                this.options.forEach((option) => {
                    if (option.value === value) {
                        this.selected = option
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
            select(option) {
                this.selected = option
            },
            search() {
                // ...
            },
            clickedOutside(event) {
                // Close if clicked outside
                if (event.target !== this.$refs.input &&
                    event.target !== this.$refs.list) {
                    this.isActive = false
                }
            },
            isInViewport() {
                Vue.nextTick(() => {
                    const rect = this.$refs.list.getBoundingClientRect()

                    console.log(
                        rect.top >= 0 &&
                        rect.left >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                    )

                    this.isListInViewport = (
                        rect.top >= 0 &&
                        rect.left >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                    )
                })
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
