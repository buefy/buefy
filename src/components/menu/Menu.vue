<template>
    <aside class="menu">
        <slot></slot>
    </aside>
</template>

<script>
export default {
    name: 'bMenu',
    model: {
        event: 'change'
    },
    props: {
        autoClose: {
            type: Boolean,
            default: true
        },
        router: {
            type: Boolean,
            default: false
        },
        value: {
            default: null
        }
    },
    data() {
        return {
            activeItem: null
        }
    },
    methods: {
        /**
         * Collapse all dropdowns except given dropdown.
         */
        collapse(except) {
            const dropdowns = []
            // Find all root dropdowns excluding the except one.
            this.$children.forEach((menuList) => {
                menuList.$children.forEach((item) => {
                    if (item.$options.name === 'bMenuDropdown' && item._uid !== except) {
                        dropdowns.push(item)
                    }
                })
            })
            dropdowns.forEach((dropdown) => {
                dropdown.collapse()
            })
        },

        /**
         * Handle select menu item action.
         * 1. Change current active item uid.
         * 2. Emit change (and v-model) event.
         * 3. Collapse other dropdowns.
         */
        selectItem(item) {
            this.activeItem = item._uid
            this.$emit('change', item.value)
            if (this.autoClose) {
                this.collapse(item.rootDropdown)
            }
        }
    }
}
</script>
