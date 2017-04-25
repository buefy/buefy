export default {
    name: 'bTableColumn',
    props: {
        label: String,
        width: [Number, String],
        field: String,
        numeric: Boolean,
        sortable: Boolean,
        customSort: Function,
        format: {
            type: Function,
            default: value => value
        },
        component: String
    },
    data() {
        return {
            column: {}
        }
    },
    created() {
        this.column = {
            label: this.label,
            width: this.width,
            field: this.field,
            isNumeric: this.numeric,
            isSortable: this.sortable,
            customSort: this.customSort,
            format: this.format,
            component: this.component
        }

        if (!this.$parent.isTableComponent) {
            this.$destroy()
            throw new Error('You should wrap Table Column on a Table')
        }
        this.$parent.columns.push(this.column)
    },
    render(h) {
        return
    }
}
