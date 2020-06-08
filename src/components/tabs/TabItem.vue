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
            elementClass: 'tab-item'
        }
    },
    created() {
        if (!this.parent) {
            this.$destroy()
            throw new Error('You should wrap bTabItem in a bTabs')
        }
    }
}
</script>
