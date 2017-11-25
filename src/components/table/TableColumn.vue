<template>
    <td v-if="visible"
        :class="{ 'has-text-right': numeric && !centered, 'has-text-centered': centered }"
        :data-label="label">
        <span><slot></slot></span>
    </td>
</template>

<script>
    export default {
        name: 'bTableColumn',
        props: {
            label: String,
            customKey: [String, Number],
            field: String,
            meta: {},
            width: [Number, String],
            numeric: Boolean,
            centered: Boolean,
            sortable: Boolean,
            visible: {
                type: Boolean,
                default: true
            },
            customSort: Function
        },
        data() {
            return {
                newKey: this.customKey || this.label
            }
        },
        created() {
            if (!this.$parent.$data._isTable) {
                this.$destroy()
                throw new Error('You should wrap bTableColumn on a bTable')
            }

            // Since we're using scoped prop the columns gonna be multiplied,
            // this finds when to stop based on the newKey property.
            const repeated = this.$parent.columns.some((column) => column.newKey === this.newKey)
            !repeated && this.$parent.columns.push(this)
        }
    }
</script>
