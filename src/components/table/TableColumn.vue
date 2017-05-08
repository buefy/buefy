<template>
    <td :class="{ 'has-text-right': numeric }" :data-label="label">
        <slot></slot>
    </td>
</template>

<script>
    export default {
        name: 'bTableColumn',
        props: {
            field: String,
            label: String,
            width: [Number, String],
            numeric: Boolean,
            sortable: Boolean,
            customSort: Function
        },
        created() {
            if (!this.$parent.isTableComponent) {
                this.$destroy()
                throw new Error('You should wrap bTableColumn on a bTable')
            }

            this.column = {
                field: this.field,
                label: this.label,
                width: this.width,
                isNumeric: this.numeric,
                isSortable: this.sortable,
                customSort: this.customSort
            }

            // Since we're using scoped prop the columns gonna be multiplied,
            // this finds when to stop based on the label prop.
            const repeated = this.$parent.columns.some((column) => {
                return column.label === this.label
            })
            !repeated && this.$parent.columns.push(this.column)
        }
    }
</script>
