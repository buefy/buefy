export default {
    computed: {
        /**
         * Find root Menu component.
         */
        menu() {
            let parent = this.$parent
            while (parent && parent.$options.name !== 'bMenu') {
                parent = parent.$parent
            }
            return parent
        },

        /**
         * Find first level dropdown of this component.
         */
        rootDropdown() {
            let dropdown = this.$options.name === 'bMenuDropdown' ? this._uid : null
            let parent = this.$parent
            while (parent && parent.$options.name !== 'bMenu') {
                if (parent.$options.name === 'bMenuDropdown') {
                    dropdown = parent._uid
                }
                parent = parent.$parent
            }
            return dropdown
        }
    }
}
