<template>
    <td
        v-if="visible"
        :class="rootClasses"
        :data-label="label">
        <slot/>
    </td>
</template>

<script>
import { repeated, addColumn, removeColumn, cancelBeforeDestroy } from './provide'

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
        customSort: Function,
        internal: Boolean // Used internally by Table
    },
    data() {
        return {
            newKey: this.customKey || this.label
        }
    },
    inject: {
        repeated,
        addColumn,
        removeColumn,
        cancelBeforeDestroy
    },
    computed: {
        rootClasses() {
            return {
                'has-text-right': this.numeric && !this.centered,
                'has-text-centered': this.centered
            }
        }
    },
    methods: {
        addRefToTable() {
            if (!this.repeated && !this.addColumn && !this.removeColumn) {
                this.$destroy()
                throw new Error('You should wrap bTableColumn on a bTable')
            }

            if (this.internal) return

            !this.repeated(this.newKey) && this.addColumn(this)
        }
    },
    beforeMount() {
        this.addRefToTable()
    },
    beforeUpdate() {
        this.addRefToTable()
    },
    beforeDestroy() {
        if (this.sortable && this.cancelBeforeDestroy) return
        this.removeColumn(this.newKey)
    }
}
</script>
