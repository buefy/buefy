<script>
import { toCssWidth } from '../../utils/helpers'

export default {
    name: 'BTableColumn',
    inject: {
        $table: { name: '$table', default: false }
    },
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
        customSearch: Function,
        sticky: Boolean,
        headerSelectable: Boolean,
        headerClass: String,
        cellClass: String,
        thAttrs: {
            type: Function,
            default: () => ({})
        },
        tdAttrs: {
            type: Function,
            default: () => ({})
        }
    },
    data() {
        return {
            newKey: this.customKey || this.label,
            _isTableColumn: true
        }
    },
    computed: {
        thClasses() {
            const attrs = this.thAttrs(this)
            const classes = [this.headerClass, {
                'is-sortable': this.sortable,
                'is-sticky': this.sticky,
                'is-unselectable': this.isHeaderUnSelectable
            }]
            if (attrs && attrs.class) {
                classes.push(attrs.class)
            }
            return classes
        },
        thStyle() {
            const attrs = this.thAttrs(this)
            const style = [this.style]
            if (attrs && attrs.style) {
                style.push(attrs.style)
            }
            return style
        },
        rootClasses() {
            return [this.cellClass, {
                'has-text-right': this.numeric && !this.centered,
                'has-text-centered': this.centered,
                'is-sticky': this.sticky
            }]
        },
        style() {
            return {
                width: toCssWidth(this.width)
            }
        },
        hasDefaultSlot() {
            return !!this.$scopedSlots.default
        },
        /**
         * Return if column header is un-selectable
         */
        isHeaderUnSelectable() {
            return !this.headerSelectable && this.sortable
        }
    },
    methods: {
        getRootClasses(row) {
            const attrs = this.tdAttrs(row, this)
            const classes = [this.rootClasses]
            if (attrs && attrs.class) {
                classes.push(attrs.class)
            }
            return classes
        },
        getRootStyle(row) {
            const attrs = this.tdAttrs(row, this)
            const style = []
            if (attrs && attrs.style) {
                style.push(attrs.style)
            }
            return style
        }
    },
    created() {
        if (!this.$table) {
            this.$destroy()
            throw new Error('You should wrap bTableColumn on a bTable')
        }
        this.$table.refreshSlots()
    },
    render(createElement) {
        // renderless
        return null
    }
}
</script>
