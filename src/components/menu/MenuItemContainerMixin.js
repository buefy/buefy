export default {
    provide() {
        return {
            BMenuItemContainer: this
        }
    },
    data() {
        return {
            menuItems: []
        }
    },
    methods: {
        appendMenuItem(item) {
            this.menuItems.push(item)
        },
        removeMenuItem(item) {
            const index = this.menuItems.indexOf(item)
            if (index !== -1) {
                this.menuItems.splice(index, 1)
            }
        }
    }
}
