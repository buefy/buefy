<script>
import TabbedChildMixin from '../../utils/TabbedChildMixin.js'

export default {
    name: 'BStepItem',
    mixins: [TabbedChildMixin],
    props: {
        step: String | Number,
        type: String | Object,
        clickable: {
            type: Boolean,
            default: undefined
        }
    },
    data() {
        return {
            elementClass: 'step-item'
        }
    },
    created() {
        if (!this.parent) {
            this.$destroy()
            throw new Error('You should wrap bStepItem in a bSteps')
        }
    }
}
</script>
