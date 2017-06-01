<template>
    <span class="dropdown control"
        :class="{ 'is-disabled': disabled }">
        <a role="button"
            ref="trigger"
            class="trigger"
            @click="isActive = !isActive">
            <slot name="trigger"></slot>
        </a>

        <transition-group name="fade">
            <div v-if="isActive"
                key="bg"
                class="background is-hidden-desktop">
            </div>
            <span v-show="isActive"
                key="dropdown"
                ref="dropdown"
                class="box"
                :class="['is-dropdown', position, { 'is-narrow': narrowed }]">
                <ul>
                    <slot></slot>
                </ul>
            </span>
        </transition-group>
    </span>
</template>

<script>
    export default {
        name: 'bDropdown',
        props: {
            value: {
                type: [String, Number, Object, Boolean, Array],
                default: null
            },
            narrowed: Boolean,
            disabled: Boolean,
            position: {
                type: String,
                default: 'is-bottom-right',
                validator(value) {
                    return [
                        'is-top-right',
                        'is-top-left',
                        'is-bottom-right',
                        'is-bottom-left'
                    ].indexOf(value) > -1
                }
            }
        },
        data() {
            return {
                selected: this.value,
                isActive: false,
                _isDropdown: true // Used internally by DropdownOption
            }
        },
        watch: {
            /**
             * When v-model is changed set the new selected option.
             */
            value(value) {
                this.selectOption(value)
            }
        },
        computed: {
            /**
             * White-listed items to not close when clicked.
             * Add input, dropdown, trigger and all children.
             */
            whiteList() {
                const whiteList = []
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
        methods: {
            /**
             * Click listener from DropdownOption.
             *   1. Set new selected option.
             *   2. Emit input event to update the user v-model.
             *   3. Close the dropdown.
             */
            selectOption(value, isClickable) {
                if (!isClickable) return

                this.selected = value
                this.$emit('input', value)
                this.$emit('change', value)
                this.isActive = false
            },

            /**
             * Close dropdown if clicked outside.
             */
            clickedOutside(event) {
                if (this.whiteList.indexOf(event.target) < 0) this.isActive = false
            }
        },
        created() {
            if (typeof window !== 'undefined') {
                document.addEventListener('click', this.clickedOutside)
            }
        },
        beforeDestroy() {
            if (typeof window !== 'undefined') {
                document.removeEventListener('click', this.clickedOutside)
            }
        }
    }
</script>
