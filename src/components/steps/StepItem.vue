<script>
import TabbedChildMixin from '../../utils/TabbedChildMixin.js'

export default {
    name: 'BStepItem',
    mixins: [TabbedChildMixin('step')],
    props: {
        step: [String, Number],
        type: [String, Object],
        clickable: {
            type: Boolean,
            default: undefined
        }
    },
    data() {
        return {
            elementClass: 'step-item'
        }
    }
}
</script>
