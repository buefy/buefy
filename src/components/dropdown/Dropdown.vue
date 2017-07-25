<template>
    <div class="dropdown"
        :class="[position, {
            'is-disabled': disabled,
            'is-hoverable': hoverable,
            'is-active': isActive
        }]">
        <a role="button"
            ref="trigger"
            class="dropdown-trigger"
            @click="toggle">
            <slot name="trigger"></slot>
        </a>

        <transition name="fade">
            <div v-show="isActive" class="background"></div>
        </transition>
        <transition name="fade">
            <div v-show="isActive || hoverable"
                ref="dropdownMenu"
                class="dropdown-menu">
                <div class="dropdown-content">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'bDropdown',
        props: {
            value: {
                type: [String, Number, Boolean, Object, Array, Symbol, Function],
                default: null
            },
            disabled: Boolean,
            hoverable: Boolean,
            position: {
                type: String,
                validator(value) {
                    return [
                        'is-top-right',
                        'is-top-left',
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
            },

            /**
             * Emit event when isActive value is changed
             */
            isActive(value) {
                this.$emit('active-change', value)
            }
        },
        computed: {
            /**
             * White-listed items to not close when clicked.
             * Add input, dropdown, trigger and all children.
             */
            whiteList() {
                const whiteList = []
                whiteList.push(this.$refs.dropdownMenu)
                whiteList.push(this.$refs.trigger)
                // Adds all chidren from dropdown
                if (this.$refs.dropdownMenu !== undefined) {
                    const children = this.$refs.dropdownMenu.querySelectorAll('*')
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
            selectOption(value) {
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
            },

            /**
             * Toggle dropdown if it's not disabled.
             */
            toggle() {
                if (this.disabled || this.hoverable) return

                this.isActive = !this.isActive
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
