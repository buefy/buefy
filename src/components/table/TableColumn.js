export default {
    name: 'bTableColumn',

    props: {
        label: String,
        width: [Number, String],
        field: String,
        sortable: Boolean,
        numeric: Boolean
    },

    data() {
        return {
            column: {}
        }
    },

    mounted() {
        this.$parent.columns.push(this.column)
    },

    created() {
        this.column = {
            label: this.label,
            width: this.width,
            field: this.field,
            isSortable: this.sortable,
            isNumeric: this.numeric
        }
    },

    render(h) {
        return
    }
}
