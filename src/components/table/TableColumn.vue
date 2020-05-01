<template>
    <td
        v-if="visible"
        :class="rootClasses"
        :data-label="label">
        <slot/>
    </td>
</template>

<script>
export default {
    name: 'BTableColumn',
    props: {
        label: String,
        customKey: [String, Number],
        field: String,
        meta: [String, Number, Boolean, Function, Object, Array],
        width: [Number, String],
        numeric: Boolean,
        centered: Boolean,
        searchable: Boolean,
        sortable: Boolean,
        visible: {
            type: Boolean,
            default: true
        },
        subheading: [String, Number],
        customSort: Function,
        sticky: Boolean,
        headerSelectable: {
            type: Boolean,
            default: true
        },
        headerClass: String,
        cellClass: String,
        internal: Boolean // Used internally by Table
    },
    data() {
        return {
            newKey: this.customKey || this.label,
            _isTableColumn: true
        }
    },
    computed: {
        rootClasses() {
            return [this.cellClass, {
                'has-text-right': this.numeric && !this.centered,
                'has-text-centered': this.centered,
                'is-sticky': this.sticky
            }]
        }
    },
    beforeMount() {
        if (!this.$parent.$data._isTable) {
            this.$destroy()
            throw new Error('You should wrap bTableColumn on a bTable')
        }

        if (this.internal) return

        // Since we're using scoped prop the columns gonna be multiplied,
        // this finds when to stop based on the newKey property.
        const repeated = this.$parent.newColumns.some(
            (column) => column.newKey === this.newKey)
        !repeated && this.$parent.newColumns.push(this)
    },
    beforeDestroy() {
        if (!this.$parent.visibleData.length) return
        if (this.$parent.newColumns.length !== 1) return
        if (this.$parent.newColumns.length) {
            const index = this.$parent.newColumns.map(
                (column) => column.newKey).indexOf(this.newKey)
            if (index >= 0) {
                this.$parent.newColumns.splice(index, 1)
            }
        }
    }
}
</script>
