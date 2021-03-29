<script>
import TabbedChildMixin from '../../utils/TabbedChildMixin.js'

export default {
    name: 'BTabItem',
    mixins: [TabbedChildMixin('tab')],
    props: {
        disabled: Boolean
    },
    data() {
        return {
            elementClass: 'tab-item',
            elementRole: 'tabpanel'
        }
    }
}
</script>
