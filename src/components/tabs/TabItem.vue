<script>
import TabbedChildMixin from '../../utils/TabbedChildMixin.js'

export default {
    name: 'BTabItem',
    mixins: [TabbedChildMixin],
    props: {
        disabled: Boolean
    },
    data() {
        return {
            elementClass: 'tab-item',
            _isTabItem: true // Used internally by Tab
        }
    },
    created() {
        if (!this.$parent.$data._isTabs) {
            this.$destroy()
            throw new Error('You should wrap bTabItem on a bTabs')
        }
        this.$parent.refreshSlots()
    }
}
</script>
