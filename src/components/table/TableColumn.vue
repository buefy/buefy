<template>
    <td v-if="visible"
        :class="{ 'has-text-right': numeric }"
        :data-label="label">
        <span><slot></slot></span>
    </td>
</template>

<script>
    export default {
        name: 'bTableColumn',
        props: {
            label: {
                type: String,
                required: true
            },
            field: String,
            width: [Number, String],
            numeric: Boolean,
            sortable: Boolean,
            visible: {
                type: Boolean,
                default: true
            },
            customSort: Function
        },
        created() {
            if (!this.$parent.$data._isTable) {
                this.$destroy()
                throw new Error('You should wrap bTableColumn on a bTable')
            }

            // Since we're using scoped prop the columns gonna be multiplied,
            // this finds when to stop based on the label prop.
            const repeated = this.$parent.columns.some((column) => {
                return column.label === this.label
            })
            !repeated && this.$parent.columns.push(this.$props)
        }
    }
</script>
