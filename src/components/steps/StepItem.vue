<script>
import TabbedChildMixin from '../../utils/TabbedChildMixin.js'

export default {
    name: 'BStepItem',
    mixins: [TabbedChildMixin],
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
            elementClass: 'step-item',
            _isStepItem: true // Used internally by Step
        }
    },
    created() {
        if (!this.$parent.$data._isSteps) {
            this.$destroy()
            throw new Error('You should wrap bStepItem on a bSteps')
        }
        this.$parent.refreshSlots()
    }
}
</script>
